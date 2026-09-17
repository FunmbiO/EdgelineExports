export type SubmissionType = "sourcing" | "sell" | "contact";

export interface FormSubmission {
  id: string;
  type: SubmissionType;
  payload: Record<string, unknown>;
  leadId: string | null;
  ipAddress: string | null;
  createdAt: string;
}
