-- Permitir contenido de Nosotros en content_entries.
ALTER TABLE public.content_entries
DROP CONSTRAINT IF EXISTS content_entries_section_check;

ALTER TABLE public.content_entries
ADD CONSTRAINT content_entries_section_check
CHECK (section IN ('mentions','academia','news','nosotros'));

-- Asegura que Storage tenga un bucket público para contenido editorial.
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-content', 'site-content', true)
ON CONFLICT (id) DO UPDATE SET public = true;
