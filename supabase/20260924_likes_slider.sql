-- Likes existentes + slider selectivo

ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS likes_count integer NOT NULL DEFAULT 0;

-- featured ya existe en el schema original.
-- featured = true => aparece en el slider del home.
-- featured = false => aparece en la grilla, pero NO en el slider.

CREATE OR REPLACE FUNCTION public.like_project(project_slug text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.projects
  SET
    likes_count = COALESCE(likes_count, 0) + 1,
    updated_at = now()
  WHERE slug = project_slug
    AND published = true
  RETURNING likes_count INTO new_count;

  IF new_count IS NULL THEN
    RAISE EXCEPTION 'Project not found';
  END IF;

  RETURN new_count;
END;
$$;

REVOKE ALL ON FUNCTION public.like_project(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.like_project(text) TO anon, authenticated;
