create table "public"."properties" (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    price numeric not null,
    location text not null,
    type text not null,
    surface numeric not null,
    rooms integer not null,
    bathrooms integer not null,
    description text,
    features text[],
    images text[],
    has_live boolean default false,
    is_live_now boolean default false,
    live_date timestamp with time zone,
    viewers integer default 0,
    remaining_seats integer,
    transaction_type text not null,
    coordinates jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    agent_id uuid references auth.users(id)
);

-- Enable Row Level Security
alter table "public"."properties" enable row level security;

-- Create policies
create policy "Properties are viewable by everyone"
    on properties for select
    using (true);

create policy "Properties are insertable by authenticated users"
    on properties for insert
    with check (auth.role() = 'authenticated');

create policy "Properties are updatable by owner"
    on properties for update
    using (agent_id = auth.uid());

create policy "Properties are deletable by owner"
    on properties for delete
    using (agent_id = auth.uid());