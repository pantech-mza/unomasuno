ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS gallery_images jsonb NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.projects.gallery_images IS
'Array ordenado de URLs que pertenecen SOLO a la galería del proyecto. No incluye croquis ni assets globales.';
