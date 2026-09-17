create table if not exists public.digital_cards (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  company_name text not null,
  slogan text,
  whatsapp text,
  instagram text,
  linkedin text,
  email text,
  phone text,
  maps_url text,
  website text,
  created_at timestamptz default now()
);

alter table public.digital_cards enable row level security;

create policy "Public cards are readable"
on public.digital_cards
for select
using (true);

insert into public.digital_cards
(slug, company_name, slogan, whatsapp, instagram, linkedin, email, phone, maps_url, website)
values
(
  'can-group',
  'CAN GROUP',
  'Conectando pessoas e negócios.',
  '5513999999999',
  'https://www.instagram.com/cangroupbr/',
  'https://www.linkedin.com/',
  'can@cangroup.com.br',
  '+55 13 99999-9999',
  'https://www.google.com/maps/search/?api=1&query=Santos%20SP',
  'https://cangroup.com.br'
)
on conflict (slug) do nothing;
