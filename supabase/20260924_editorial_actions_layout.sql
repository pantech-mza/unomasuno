ALTER TABLE public.content_entries
ADD COLUMN IF NOT EXISTS actions jsonb NOT NULL DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS layout_variant text;

COMMENT ON COLUMN public.content_entries.actions IS
'Array JSON de acciones: [{"label":"Ver publicación","url":"https://..."}]';

COMMENT ON COLUMN public.content_entries.layout_variant IS
'text-left, image-left, intro, person-left, person-right';
