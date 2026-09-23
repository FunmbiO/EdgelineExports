-- Sprint 4 — "Inquire Now" on the vehicle detail page creates a lead too,
-- same as sourcing/sell/contact. leads.source and form_submissions.type
-- both reuse the lead_source enum.

alter type lead_source add value if not exists 'inquiry';
