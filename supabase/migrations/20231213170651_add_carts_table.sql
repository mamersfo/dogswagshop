create table "public"."carts" (
    "user_id" uuid not null,
    "state" jsonb
);


alter table "public"."carts" enable row level security;

CREATE UNIQUE INDEX carts_pkey ON public.carts USING btree (user_id);

alter table "public"."carts" add constraint "carts_pkey" PRIMARY KEY using index "carts_pkey";

alter table "public"."carts" add constraint "carts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."carts" validate constraint "carts_user_id_fkey";

create policy "Enable all for users based on user_id"
on "public"."carts"
as permissive
for all
to public
using ((auth.uid() = user_id));




