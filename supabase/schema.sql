-- Cuaderno: tablas del progreso de cada estudiante.
-- Pegá todo esto en Supabase > SQL Editor y ejecutalo una sola vez.
-- Es seguro volver a correrlo: usa "if not exists" y reemplaza políticas.

-- ---------- perfiles ----------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  settings jsonb not null default '{}'::jsonb,
  updated_at bigint not null default 0
);

-- ---------- tarjetas de repaso (una por palabra) ----------

create table if not exists public.cards (
  user_id uuid not null references auth.users (id) on delete cascade,
  course text not null,
  card_id text not null,
  ease real not null default 2.5,
  interval_days integer not null default 0,
  reps integer not null default 0,
  lapses integer not null default 0,
  due_at bigint not null default 0,
  seen boolean not null default false,
  last_at bigint not null default 0,
  updated_at bigint not null,
  primary key (user_id, course, card_id)
);

create index if not exists cards_user_updated_idx on public.cards (user_id, updated_at);

-- ---------- avance en las lecciones ----------

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  course text not null,
  lesson_id text not null,
  best_score integer not null default 0,
  last_score integer not null default 0,
  attempts integer not null default 0,
  completed boolean not null default false,
  completed_at bigint not null default 0,
  updated_at bigint not null,
  primary key (user_id, course, lesson_id)
);

create index if not exists lesson_progress_user_updated_idx on public.lesson_progress (user_id, updated_at);

-- ---------- actividad diaria (para la racha y las estadísticas) ----------

create table if not exists public.study_log (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  course text not null,
  reviews integer not null default 0,
  new_cards integer not null default 0,
  exercises integer not null default 0,
  correct integer not null default 0,
  seconds integer not null default 0,
  updated_at bigint not null,
  primary key (user_id, day, course)
);

create index if not exists study_log_user_updated_idx on public.study_log (user_id, updated_at);

-- ---------- seguridad: cada persona ve y toca solo lo suyo ----------

alter table public.profiles enable row level security;
alter table public.cards enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.study_log enable row level security;

revoke all on public.profiles, public.cards, public.lesson_progress, public.study_log from anon;

drop policy if exists "profiles: solo el dueño" on public.profiles;
create policy "profiles: solo el dueño" on public.profiles
  for all to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists "cards: solo el dueño" on public.cards;
create policy "cards: solo el dueño" on public.cards
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "lesson_progress: solo el dueño" on public.lesson_progress;
create policy "lesson_progress: solo el dueño" on public.lesson_progress
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "study_log: solo el dueño" on public.study_log;
create policy "study_log: solo el dueño" on public.study_log
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ---------- perfil automático al crear la cuenta ----------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
