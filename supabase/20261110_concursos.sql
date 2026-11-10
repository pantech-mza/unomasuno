-- UNO MÁS UNO - sección Concursos
-- Ejecutar una sola vez en Supabase > SQL Editor. Es idempotente (se puede volver a correr).

create extension if not exists "pgcrypto";

-- Concursos ------------------------------------------------------------------
create table if not exists public.competitions (
  id uuid primary key default gen_random_uuid(),
  title text not null,                 -- nombre corto (obligatorio), ej. "SVP"
  slug text unique not null,
  full_name text,                      -- opcional
  organizer text,                      -- opcional
  location text,                       -- opcional
  year text,                           -- opcional (texto para admitir "2024-2025")
  result text,                         -- opcional: Primer premio, Mención, etc.
  description text,                    -- opcional: memoria
  logo_url text,                       -- opcional: carpeta 00-LOGO
  cover_image text,                    -- portada para listado y detalle
  position integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Imágenes por categoría (las carpetas del Drive) -----------------------------
create table if not exists public.competition_images (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  category text not null,
  image_url text not null,
  caption text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.competition_images drop constraint if exists competition_images_category_check;
alter table public.competition_images add constraint competition_images_category_check
  check (category in ('tecnicas','axonometrias','renders','fotos','graficos','paneles','difusion'));

create index if not exists competition_images_competition_idx
  on public.competition_images (competition_id, category, position);

-- Permisos (igual que proyectos) ---------------------------------------------
alter table public.competitions enable row level security;
alter table public.competition_images enable row level security;

drop policy if exists "public read published competitions" on public.competitions;
create policy "public read published competitions" on public.competitions
  for select using (published = true);
drop policy if exists "authenticated manage competitions" on public.competitions;
create policy "authenticated manage competitions" on public.competitions
  for all to authenticated using (true) with check (true);

drop policy if exists "public read competition images" on public.competition_images;
create policy "public read competition images" on public.competition_images
  for select using (exists (select 1 from public.competitions c where c.id = competition_id and c.published = true));
drop policy if exists "authenticated manage competition images" on public.competition_images;
create policy "authenticated manage competition images" on public.competition_images
  for all to authenticated using (true) with check (true);

-- Storage ---------------------------------------------------------------------
insert into storage.buckets (id, name, public) values ('competitions', 'competitions', true)
on conflict (id) do update set public = true;

drop policy if exists "public read competitions storage" on storage.objects;
create policy "public read competitions storage" on storage.objects
  for select using (bucket_id = 'competitions');
drop policy if exists "auth upload competitions storage" on storage.objects;
create policy "auth upload competitions storage" on storage.objects
  for insert to authenticated with check (bucket_id = 'competitions');
drop policy if exists "auth update competitions storage" on storage.objects;
create policy "auth update competitions storage" on storage.objects
  for update to authenticated using (bucket_id = 'competitions') with check (bucket_id = 'competitions');
drop policy if exists "auth delete competitions storage" on storage.objects;
create policy "auth delete competitions storage" on storage.objects
  for delete to authenticated using (bucket_id = 'competitions');
