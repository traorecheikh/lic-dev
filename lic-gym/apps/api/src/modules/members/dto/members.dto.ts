import type {
  CreateMemberInput,
  MemberListQuery,
  MemberResponse,
  MemberTimelineItem,
  PaginatedMembersResponse,
  UpdateMemberInput,
} from '@gym/types';

export type CreateMemberDto = CreateMemberInput;
export type UpdateMemberDto = UpdateMemberInput;
export type ListMembersQueryDto = MemberListQuery;
export type MemberDto = MemberResponse;
export type MemberTimelineDto = MemberTimelineItem;
export type ListMembersResponseDto = PaginatedMembersResponse;
