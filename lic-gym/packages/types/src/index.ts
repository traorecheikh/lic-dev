export type UserRole = 'ADMIN' | 'CASHIER' | 'COACH' | 'MEMBER';

export type AppShell = 'admin' | 'cashier' | 'coach' | 'member';

export interface AppShellRoute {
  shell: AppShell;
  path: `/${AppShell}`;
  title: string;
  description: string;
}

export type PaymentMethodCode = 'cash' | 'card' | 'transfer' | 'cheque';

export interface PaymentMethodDefinition {
  code: PaymentMethodCode;
  name: string;
}

export interface MoneyValue {
  amountMinor: number;
  currency: string;
}

export type MemberLifecycleStatus = 'draft' | 'active' | 'inactive' | 'blocked' | 'archived';
export type GenderValue = 'male' | 'female' | 'other';

export interface MemberListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: MemberLifecycleStatus;
}

export interface CreateMemberInput {
  firstName: string;
  lastName: string;
  phone?: string | null;
  email?: string | null;
  gender?: GenderValue | null;
  dateOfBirth?: string | null;
  joinedAt?: string | null;
  goalNotes?: string | null;
  medicalNotes?: string | null;
  internalNotes?: string | null;
  status?: MemberLifecycleStatus;
}

export interface UpdateMemberInput {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  email?: string | null;
  gender?: GenderValue | null;
  dateOfBirth?: string | null;
  joinedAt?: string | null;
  goalNotes?: string | null;
  medicalNotes?: string | null;
  internalNotes?: string | null;
  status?: MemberLifecycleStatus;
}

export interface MemberResponse {
  id: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  gender: GenderValue | null;
  dateOfBirth: string | null;
  joinedAt: string | null;
  status: MemberLifecycleStatus;
  goalNotes: string | null;
  medicalNotes: string | null;
  internalNotes: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MemberTimelineItem {
  id: string;
  action: string;
  notes: string | null;
  performedByUserId: string | null;
  createdAt: string;
}

export interface PaginatedMembersResponse {
  data: MemberResponse[];
  total: number;
  page: number;
  pageSize: number;
}

export interface HealthResponse {
  status: 'ok';
  service: 'api';
  timestamp: string;
}
