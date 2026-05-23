export type DocState = 'DRAFT' | 'PENDING' | 'SIGNED' | 'REJECTED';

export type RejectReasonCode = 'BUDGET_MISMATCH' | 'MISSING_MEMO' | 'FORMATTING_ERROR' | 'UNAUTHORIZED_SIGNATURE' | 'OTHER';

export interface TrackingCard {
  id: string;
  title: string;
  committee: string;
  signatory: string;
  state: DocState;
  rejectReason?: RejectReasonCode | string;
  lastUpdated: number;
}

export type BroadcastType = 'WARNING' | 'INFO' | 'SUCCESS';

export interface Broadcast {
  id: string;
  message: string;
  type: BroadcastType;
  timestamp: number;
}
