import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Gender, Member, MemberAuditLog, MemberStatus, Prisma } from '@prisma/client';
import type {
  CreateMemberDto,
  ListMembersQueryDto,
  ListMembersResponseDto,
  MemberDto,
  MemberTimelineDto,
  UpdateMemberDto,
} from './dto/members.dto';
import { PrismaService } from '../../common/prisma/prisma.service';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ListMembersQueryDto): Promise<ListMembersResponseDto> {
    const page = this.toPositiveInt(query.page, DEFAULT_PAGE);
    const pageSize = Math.min(this.toPositiveInt(query.pageSize, DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);
    const where = this.buildListWhere(query);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.member.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.member.count({ where }),
    ]);

    return {
      data: items.map((item) => this.toMemberDto(item)),
      total,
      page,
      pageSize,
    };
  }

  async getById(id: string): Promise<MemberDto> {
    const member = await this.prisma.member.findUnique({
      where: { id: this.parseId(id, 'member id') },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return this.toMemberDto(member);
  }

  async create(input: CreateMemberDto): Promise<MemberDto> {
    const firstName = this.requireName(input.firstName, 'firstName');
    const lastName = this.requireName(input.lastName, 'lastName');
    const email = this.normalizeEmail(input.email);
    const phone = this.normalizeText(input.phone);

    await this.assertNoDuplicateContact({ email, phone });

    const member = await this.prisma.$transaction(async (tx) => {
      const memberNumber = await this.nextMemberNumber(tx);
      const data: Prisma.MemberCreateInput = {
        memberNumber,
        firstName,
        lastName,
        email,
        phone,
        goalNotes: this.normalizeText(input.goalNotes),
        medicalNotes: this.normalizeText(input.medicalNotes),
        internalNotes: this.normalizeText(input.internalNotes),
        status: this.parseMemberStatus(input.status ?? MemberStatus.draft),
      };

      const gender = this.toGender(input.gender);
      if (gender !== undefined) {
        data.gender = gender;
      }

      const dateOfBirth = this.toDate(input.dateOfBirth, 'dateOfBirth');
      if (dateOfBirth !== undefined) {
        data.dateOfBirth = dateOfBirth;
      }

      const joinedAt = this.toDate(input.joinedAt, 'joinedAt');
      if (joinedAt !== undefined) {
        data.joinedAt = joinedAt;
      }

      return tx.member.create({ data });
    });

    return this.toMemberDto(member);
  }

  async update(id: string, input: UpdateMemberDto): Promise<MemberDto> {
    const memberId = this.parseId(id, 'member id');

    await this.ensureMemberExists(memberId);

    const email = this.normalizeEmail(input.email);
    const phone = this.normalizeText(input.phone);

    await this.assertNoDuplicateContact({ email, phone, excludeMemberId: memberId });

    const data: Prisma.MemberUpdateInput = {};

    if (input.firstName !== undefined) {
      data.firstName = this.requireName(input.firstName, 'firstName');
    }
    if (input.lastName !== undefined) {
      data.lastName = this.requireName(input.lastName, 'lastName');
    }
    if (input.email !== undefined) {
      data.email = email;
    }
    if (input.phone !== undefined) {
      data.phone = phone;
    }
    if (input.gender !== undefined) {
      data.gender = this.parseGender(input.gender);
    }
    if (input.dateOfBirth !== undefined) {
      data.dateOfBirth = this.toDate(input.dateOfBirth, 'dateOfBirth') ?? null;
    }
    if (input.joinedAt !== undefined) {
      data.joinedAt = this.toDate(input.joinedAt, 'joinedAt') ?? null;
    }
    if (input.goalNotes !== undefined) {
      data.goalNotes = this.normalizeText(input.goalNotes);
    }
    if (input.medicalNotes !== undefined) {
      data.medicalNotes = this.normalizeText(input.medicalNotes);
    }
    if (input.internalNotes !== undefined) {
      data.internalNotes = this.normalizeText(input.internalNotes);
    }
    if (input.status !== undefined) {
      data.status = this.parseMemberStatus(input.status);
    }

    if (!Object.keys(data).length) {
      throw new BadRequestException('No fields provided for update');
    }

    const updated = await this.prisma.member.update({
      where: { id: memberId },
      data,
    });

    return this.toMemberDto(updated);
  }

  async archive(id: string): Promise<MemberDto> {
    const memberId = this.parseId(id, 'member id');

    await this.ensureMemberExists(memberId);

    const archived = await this.prisma.member.update({
      where: { id: memberId },
      data: {
        status: MemberStatus.archived,
        archivedAt: new Date(),
      },
    });

    return this.toMemberDto(archived);
  }

  async getTimeline(id: string): Promise<MemberTimelineDto[]> {
    const memberId = this.parseId(id, 'member id');

    await this.ensureMemberExists(memberId);

    const rows = await this.prisma.memberAuditLog.findMany({
      where: { memberId },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    return rows.map((row) => this.toTimelineDto(row));
  }

  private buildListWhere(query: ListMembersQueryDto): Prisma.MemberWhereInput {
    const where: Prisma.MemberWhereInput = {};

    if (query.status) {
      where.status = this.parseMemberStatus(query.status);
    }

    const search = this.normalizeText(query.search);
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { memberNumber: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  private async assertNoDuplicateContact(input: {
    email?: string | null;
    phone?: string | null;
    excludeMemberId?: bigint;
  }): Promise<void> {
    const conditions: Prisma.MemberWhereInput[] = [];

    if (input.email) {
      conditions.push({ email: { equals: input.email, mode: 'insensitive' } });
    }
    if (input.phone) {
      conditions.push({ phone: input.phone });
    }

    if (!conditions.length) {
      return;
    }

    const where: Prisma.MemberWhereInput = { OR: conditions };

    if (input.excludeMemberId) {
      where.id = { not: input.excludeMemberId };
    }

    const existing = await this.prisma.member.findFirst({ where });

    if (existing) {
      throw new ConflictException('Member already exists with the same phone or email');
    }
  }

  private async nextMemberNumber(tx: Prisma.TransactionClient): Promise<string> {
    const now = new Date();
    const year = now.getUTCFullYear();

    const [prefixSetting, numberSetting] = await Promise.all([
      tx.setting.findUnique({ where: { key: 'member.number_prefix' } }),
      tx.setting.findUnique({ where: { key: 'member.next_number' } }),
    ]);

    const prefix = this.readStringSetting(prefixSetting?.value) ?? 'GYM';
    const nextNumber = this.readNumberSetting(numberSetting?.value) ?? 1;

    const memberNumber = `${prefix}-${year}-${String(nextNumber).padStart(4, '0')}`;

    await tx.setting.upsert({
      where: { key: 'member.next_number' },
      update: {
        value: nextNumber + 1,
        groupName: 'member',
        description: 'Next generated member number sequence',
      },
      create: {
        key: 'member.next_number',
        value: nextNumber + 1,
        groupName: 'member',
        description: 'Next generated member number sequence',
      },
    });

    if (!prefixSetting) {
      await tx.setting.create({
        data: {
          key: 'member.number_prefix',
          value: prefix,
          groupName: 'member',
          description: 'Prefix used for generated member numbers',
        },
      });
    }

    return memberNumber;
  }

  private async ensureMemberExists(id: bigint): Promise<void> {
    const found = await this.prisma.member.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!found) {
      throw new NotFoundException('Member not found');
    }
  }

  private parseId(value: string, label: string): bigint {
    try {
      return BigInt(value);
    } catch {
      throw new BadRequestException(`Invalid ${label}`);
    }
  }

  private toPositiveInt(value: number | undefined, fallback: number): number {
    if (value === undefined || Number.isNaN(value)) {
      return fallback;
    }
    if (!Number.isInteger(value) || value <= 0) {
      throw new BadRequestException('Pagination values must be positive integers');
    }
    return value;
  }

  private requireName(value: string, fieldName: string): string {
    const normalized = this.normalizeText(value);
    if (!normalized) {
      throw new BadRequestException(`${fieldName} is required`);
    }
    return normalized;
  }

  private normalizeText(value: string | null | undefined): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length ? normalized : null;
  }

  private normalizeEmail(value: string | null | undefined): string | null {
    const normalized = this.normalizeText(value);
    return normalized ? normalized.toLowerCase() : null;
  }

  private toDate(value: string | null | undefined, fieldName: string): Date | undefined {
    const normalized = this.normalizeText(value);
    if (!normalized) {
      return undefined;
    }

    const parsed = new Date(normalized);
    if (Number.isNaN(parsed.getTime())) {
      throw new BadRequestException(`Invalid ${fieldName}`);
    }

    return parsed;
  }

  private toGender(value: string | null | undefined): Gender | null | undefined {
    if (value === undefined) {
      return undefined;
    }

    if (value === null) {
      return null;
    }

    if (value === 'male' || value === 'female' || value === 'other') {
      return value;
    }

    throw new BadRequestException('Invalid gender value');
  }

  private parseGender(value: string | null): Gender | null {
    const parsed = this.toGender(value);
    if (parsed === undefined) {
      throw new BadRequestException('Invalid gender value');
    }
    return parsed;
  }

  private parseMemberStatus(value: string): MemberStatus {
    if (
      value === 'draft' ||
      value === 'active' ||
      value === 'inactive' ||
      value === 'blocked' ||
      value === 'archived'
    ) {
      return value;
    }

    throw new BadRequestException('Invalid member status');
  }

  private readStringSetting(value: Prisma.JsonValue | undefined): string | null {
    if (typeof value === 'string') {
      const normalized = value.trim();
      return normalized.length ? normalized : null;
    }
    return null;
  }

  private readNumberSetting(value: Prisma.JsonValue | undefined): number | null {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return Math.trunc(value);
    }

    if (typeof value === 'string') {
      const parsed = Number.parseInt(value, 10);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return null;
  }

  private toMemberDto(member: Member): MemberDto {
    return {
      id: member.id.toString(),
      memberNumber: member.memberNumber,
      firstName: member.firstName,
      lastName: member.lastName,
      phone: member.phone,
      email: member.email,
      gender: member.gender,
      dateOfBirth: member.dateOfBirth?.toISOString() ?? null,
      joinedAt: member.joinedAt?.toISOString() ?? null,
      status: member.status,
      goalNotes: member.goalNotes,
      medicalNotes: member.medicalNotes,
      internalNotes: member.internalNotes,
      archivedAt: member.archivedAt?.toISOString() ?? null,
      createdAt: member.createdAt.toISOString(),
      updatedAt: member.updatedAt.toISOString(),
    };
  }

  private toTimelineDto(entry: MemberAuditLog): MemberTimelineDto {
    return {
      id: entry.id.toString(),
      action: entry.action,
      notes: entry.notes,
      performedByUserId: entry.performedByUserId?.toString() ?? null,
      createdAt: entry.createdAt.toISOString(),
    };
  }
}
