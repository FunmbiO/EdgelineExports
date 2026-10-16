export interface SentEmail {
  id: string;
  recipientEmail: string;
  subject: string;
  message: string;
  status: "sent" | "failed";
  error: string | null;
  createdAt: string;
}
