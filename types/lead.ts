export type LeadStatus = "new" | "contacted" | "active" | "closed";
export type LeadSource = "sourcing" | "sell" | "contact";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: LeadSource;
  status: LeadStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
