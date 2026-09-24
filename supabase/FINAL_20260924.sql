-- UNO MÁS UNO - migración final consolidada e idempotente
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor',
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  location text,
  area text,
  year integer,
  description text,
  cover_image text,
  hero_image text,
  sketch_image text,
  likes_count integer not null default 0,
  position integer not null default 0,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects add column if not exists hero_image text;
alter table public.projects add column if not exists sketch_image text;
alter table public.projects add column if not exists likes_count integer not null default 0;
alter table public.projects add column if not exists featured boolean not null default false;

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  caption text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.content_entries (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  title text not null,
  subtitle text,
  body text,
  image_url text,
  link_url text,
  link_label text,
  actions jsonb not null default '[]'::jsonb,
  layout_variant text,
  position integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.content_entries add column if not exists actions jsonb not null default '[]'::jsonb;
alter table public.content_entries add column if not exists layout_variant text;
alter table public.content_entries drop constraint if exists content_entries_section_check;
alter table public.content_entries add constraint content_entries_section_check check (section in ('mentions','academia','news','nosotros'));

create table if not exists public.site_settings (
  id integer primary key default 1 check (id=1),
  phone text,
  email text,
  instagram_url text,
  facebook_url text,
  address text,
  about_title text,
  about_body text,
  updated_at timestamptz not null default now()
);
insert into public.site_settings (id, phone, email, instagram_url, address)
values (1, '+54 9 261 5162064 | +54 9 261 5925445', 'arquitectos1mas1@gmail.com', 'https://www.instagram.com/unomasuno_arquitectos', 'Mendoza, Argentina')
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.content_entries enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects" on public.projects for select using (published=true);
drop policy if exists "authenticated manage projects" on public.projects;
create policy "authenticated manage projects" on public.projects for all to authenticated using (true) with check (true);

drop policy if exists "public read project images" on public.project_images;
create policy "public read project images" on public.project_images for select using (exists(select 1 from public.projects p where p.id=project_id and p.published=true));
drop policy if exists "authenticated manage project images" on public.project_images;
create policy "authenticated manage project images" on public.project_images for all to authenticated using (true) with check (true);

drop policy if exists "public read published content" on public.content_entries;
create policy "public read published content" on public.content_entries for select using (published=true);
drop policy if exists "authenticated manage content" on public.content_entries;
create policy "authenticated manage content" on public.content_entries for all to authenticated using (true) with check (true);

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);
drop policy if exists "authenticated manage settings" on public.site_settings;
create policy "authenticated manage settings" on public.site_settings for all to authenticated using (true) with check (true);

drop policy if exists "own profile read" on public.profiles;
create policy "own profile read" on public.profiles for select to authenticated using (auth.uid()=id);

create or replace function public.like_project(project_slug text)
returns integer language plpgsql security definer set search_path=public as $$
declare new_count integer;
begin
  update public.projects set likes_count=coalesce(likes_count,0)+1,updated_at=now()
  where slug=project_slug and published=true returning likes_count into new_count;
  if new_count is null then raise exception 'Project not found'; end if;
  return new_count;
end; $$;
revoke all on function public.like_project(text) from public;
grant execute on function public.like_project(text) to anon, authenticated;

insert into storage.buckets (id,name,public) values ('projects','projects',true) on conflict (id) do update set public=true;
insert into storage.buckets (id,name,public) values ('site-content','site-content',true) on conflict (id) do update set public=true;

drop policy if exists "public read projects storage" on storage.objects;
create policy "public read projects storage" on storage.objects for select using (bucket_id='projects');
drop policy if exists "auth upload projects storage" on storage.objects;
create policy "auth upload projects storage" on storage.objects for insert to authenticated with check (bucket_id='projects');
drop policy if exists "auth update projects storage" on storage.objects;
create policy "auth update projects storage" on storage.objects for update to authenticated using (bucket_id='projects') with check (bucket_id='projects');
drop policy if exists "auth delete projects storage" on storage.objects;
create policy "auth delete projects storage" on storage.objects for delete to authenticated using (bucket_id='projects');

drop policy if exists "public read site-content storage" on storage.objects;
create policy "public read site-content storage" on storage.objects for select using (bucket_id='site-content');
drop policy if exists "auth upload site-content storage" on storage.objects;
create policy "auth upload site-content storage" on storage.objects for insert to authenticated with check (bucket_id='site-content');
drop policy if exists "auth update site-content storage" on storage.objects;
create policy "auth update site-content storage" on storage.objects for update to authenticated using (bucket_id='site-content') with check (bucket_id='site-content');
drop policy if exists "auth delete site-content storage" on storage.objects;
create policy "auth delete site-content storage" on storage.objects for delete to authenticated using (bucket_id='site-content');
