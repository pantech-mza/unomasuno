-- UNO MÁS UNO - logos administrables desde el panel
-- Ejecutar una sola vez en Supabase > SQL Editor. Es idempotente.

alter table public.site_settings add column if not exists logo_url text;
alter table public.site_settings add column if not exists footer_logo_url text;

-- El bucket 'site-content' y sus políticas ya existen (FINAL_20260924.sql).
-- Lo reaseguramos por si este proyecto de Supabase no las tiene.
insert into storage.buckets (id, name, public) values ('site-content','site-content',true)
on conflict (id) do update set public = true;
