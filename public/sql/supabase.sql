-- drop table qpv_query_plans
-- qpv_query_plansテーブル
CREATE TABLE qpv_query_plans (
    id int generated by default as identity not null,
    user_id UUID NOT NULL,
    xml text NULL,
    name text null default ''::text,
    is_filed bool NOT NULL,
    is_archive bool NOT NULL,
    filed_at TIMESTAMP NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()    
);

-- qpv_query_plansテーブルRLS設定
alter table qpv_query_plans enable row level security;
create policy "誰でも参照可能" on qpv_query_plans for select using (true);
create policy "誰でも更新" on qpv_query_plans for update using (true);
create policy "誰でも登録" on qpv_query_plans for insert with  check (true);
create policy "誰でも削除" on qpv_query_plans for delete using (true);

-- CREATE POLICY "policy_name" ON public.qpv_query_plans FOR INSERT  TO authenticated  WITH CHECK (true);

create trigger handle_target_orders_updated_at before update on qpv_query_plans
  for each row execute procedure moddatetime (updated_at);


-- qpv_linkedurl_query_plansテーブル
CREATE TABLE qpv_linkedurl_query_plans (
    id int generated by default as identity not null,
    query_plans_id int NOT NULL,
    key UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE 
);

-- qpv_linkedurl_query_plansテーブルRLS設定
alter table qpv_linkedurl_query_plans enable row level security;
create policy "誰でも参照可能" on qpv_linkedurl_query_plans for select using (true);
create policy "誰でも更新" on qpv_linkedurl_query_plans for update using (true);


-- qpv_query_plan_view_history テーブル
CREATE TABLE qpv_query_plan_view_history (
    id int generated by default as identity not null,
    query_plans_id int NOT NULL,
    user_id UUID NOT NULL,
    current_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- qpv_query_plan_view_history テーブルRLS設定
alter table qpv_query_plan_view_history enable row level security;
create policy "誰でも参照可能" on qpv_query_plan_view_history for select using (true);
create policy "誰でも更新" on qpv_query_plan_view_history for update using (true);





-- sqlplanxmlのstorage作成
insert into storage.buckets (id, name, public) values ('sqlplanxml', 'sqlplanxml', true);

create policy "sqlplanxmlは誰でも参照可能" on storage.objects for select using ( bucket_id = 'sqlplanxml' );
create policy "sqlplanxmlは誰でも追加" on storage.objects for insert with check ( bucket_id = 'sqlplanxml' );
create policy "sqlplanxmlを更新" on storage.objects for update with check ( bucket_id = 'sqlplanxml' );
create policy "sqlplanxmlを削除" on storage.objects for delete using ( bucket_id = 'sqlplanxml'  );


-- sqlplanimageのstorage作成
insert into storage.buckets (id, name, public) values ('sqlplanimage', 'sqlplanimage', true);

create policy "sqlplanimageは誰でも参照可能" on storage.objects for select using ( bucket_id = 'sqlplanimage' );
create policy "sqlplanimageは誰でも追加" on storage.objects for insert with check ( bucket_id = 'sqlplanimage' );
create policy "sqlplanimageを更新" on storage.objects for update with check ( bucket_id = 'sqlplanimage' );
create policy "sqlplanimageを削除" on storage.objects for delete using ( bucket_id = 'sqlplanimage'  );



create extension if not exists moddatetime schema extensions;

-- projects
-- drop table projects
-- delete from projects
CREATE TABLE projects (
    id int generated by default as identity not null,
    user_id UUID NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    is_archive BOOLEAN DEFAULT FALSE,
    title TEXT,
    description TEXT,
    actionplan TEXT,
    state TEXT,
    start_date DATE,
    due_date DATE,
    important INTEGER,
    review TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- profilesテーブルRLS設定
alter table profiles enable row level security;
create policy "誰でも参照可能" on projects for select using (true);
create policy "誰でも更新" on projects for update using (true);

create trigger handle_target_orders_updated_at before update on projects
  for each row execute procedure moddatetime (updated_at);

-- tasks
-- drop table tasks
-- delete from tasks
CREATE TABLE tasks (
  id int generated by default as identity not null,
  user_id UUID NOT NULL,
  project_id integer  ,
  is_public BOOLEAN DEFAULT FALSE,
  is_archive BOOLEAN DEFAULT FALSE,
  title TEXT,
  description TEXT,
  actionplan TEXT,
  detail TEXT,
  start_date DATE,
  due_date DATE,
  state TEXT,
  type TEXT,
  review TEXT,
    done_at date,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ALTER TABLE tasks ADD COLUMN done_at date; 

create trigger handle_target_orders_updated_at before update on tasks
  for each row execute procedure moddatetime (updated_at);


-- target_orders
-- drop table target_orders
-- delete from target_orders
CREATE TABLE target_orders (
  id int generated by default as identity not null,
  user_id UUID NOT NULL,
  target_name TEXT  NOT NULL,
  target_id  integer  NOT NULL,
  target_id_order TEXT  NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


create trigger handle_target_orders_updated_at before update on target_orders
  for each row execute procedure moddatetime (updated_at);


-- profilesテーブルRLS設定
alter table profiles enable row level security;
create policy "誰でも参照可能" on target_orders for select using (true);
create policy "誰でも更新" on target_orders for update using (true);

-- サインアップ時にプロフィールテーブル作成する関数
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- サインアップ時にプロフィールテーブル作成する関数を呼び出すトリガー
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- プロフィール画像のstorage作成
insert into storage.buckets (id, name, public) values ('profile', 'profile', true);

create policy "プロフィール画像は誰でも参照可能" on storage.objects for select using ( bucket_id = 'profile' );
create policy "プロフィール画像はログインユーザーが追加" on storage.objects for insert with check ( bucket_id = 'profile' AND auth.role() = 'authenticated' );
create policy "自身のプロフィール画像を更新" on storage.objects for update with check ( bucket_id = 'profile' AND auth.uid() = owner );
create policy "自身のプロフィール画像を削除" on storage.objects for delete using ( bucket_id = 'profile' AND auth.uid() = owner );

