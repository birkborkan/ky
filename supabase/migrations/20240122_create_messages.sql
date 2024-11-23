-- Create messages table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  content text not null,
  user_id text not null,
  user_name text not null,
  user_avatar text not null
);

-- Enable Row Level Security
alter table public.messages enable row level security;

-- Create policy to allow anyone to read messages
create policy "Anyone can read messages"
  on public.messages for select
  using (true);

-- Create policy to allow anyone to insert messages
create policy "Anyone can insert messages"
  on public.messages for insert
  with check (true);