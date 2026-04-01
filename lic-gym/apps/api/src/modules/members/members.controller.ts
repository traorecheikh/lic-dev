import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import type {
  CreateMemberDto,
  ListMembersQueryDto,
  ListMembersResponseDto,
  MemberDto,
  MemberTimelineDto,
  UpdateMemberDto,
} from './dto/members.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  list(@Query() query: Record<string, string | undefined>): Promise<ListMembersResponseDto> {
    return this.membersService.list(this.toListQuery(query));
  }

  @Post()
  create(@Body() body: CreateMemberDto): Promise<MemberDto> {
    return this.membersService.create(body);
  }

  @Get(':id/timeline')
  timeline(@Param('id') id: string): Promise<MemberTimelineDto[]> {
    return this.membersService.getTimeline(id);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<MemberDto> {
    return this.membersService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateMemberDto): Promise<MemberDto> {
    return this.membersService.update(id, body);
  }

  @Delete(':id')
  archive(@Param('id') id: string): Promise<MemberDto> {
    return this.membersService.archive(id);
  }

  private toListQuery(query: Record<string, string | undefined>): ListMembersQueryDto {
    const parsed: ListMembersQueryDto = {};

    const page = this.toOptionalNumber(query.page);
    if (page !== undefined) {
      parsed.page = page;
    }

    const pageSize = this.toOptionalNumber(query.pageSize);
    if (pageSize !== undefined) {
      parsed.pageSize = pageSize;
    }

    if (query.search !== undefined) {
      parsed.search = query.search;
    }

    if (query.status !== undefined) {
      parsed.status = query.status as NonNullable<ListMembersQueryDto['status']>;
    }

    return parsed;
  }

  private toOptionalNumber(value: string | undefined): number | undefined {
    if (value === undefined) {
      return undefined;
    }

    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
}
