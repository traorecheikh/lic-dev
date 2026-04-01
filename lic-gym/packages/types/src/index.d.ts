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
export interface HealthResponse {
    status: 'ok';
    service: 'api';
    timestamp: string;
}
