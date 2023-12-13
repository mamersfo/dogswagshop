create table
    "public"."orders" ("id" uuid not null, "user_id" uuid not null, "number" integer not null, "line_items" jsonb, "state" jsonb, "status" text, "date" timestamp with time zone);

CREATE UNIQUE INDEX orders_order_number_key ON public.orders USING btree (number);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

alter table "public"."orders"
add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."orders"
add constraint "orders_order_number_key" UNIQUE using index "orders_order_number_key";

alter table "public"."orders"
add constraint "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users (id) not valid;

alter table "public"."orders" validate constraint "orders_user_id_fkey";