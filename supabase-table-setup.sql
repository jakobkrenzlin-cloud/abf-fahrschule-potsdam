-- Tabelle für Kontaktformular-Einträge erstellen
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  license_class TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) aktivieren
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy erstellen, die allen das Einfügen erlaubt (für das Kontaktformular)
CREATE POLICY "Allow insert for everyone" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Policy erstellen, die das Lesen für alle erlaubt (für die Admin-Ansicht)
-- In einer echten Produktionsumgebung sollten Sie hier Authentifizierung verwenden
CREATE POLICY "Allow read for everyone" ON contact_submissions
  FOR SELECT
  USING (true);

-- Index für bessere Performance bei Datum-Abfragen
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);