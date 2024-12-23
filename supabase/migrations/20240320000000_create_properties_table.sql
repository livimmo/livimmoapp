-- Create properties table
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
    is_replay boolean default false,
    has_scheduled_live boolean default false,
    live_date timestamp with time zone,
    status text default 'available',
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now()),
    agent_id uuid references auth.users(id),
    coordinates jsonb,
    transaction_type text not null,
    virtual_tour jsonb,
    private_notes jsonb
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