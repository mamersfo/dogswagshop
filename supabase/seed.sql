-- user: e.g. mamersfo@gmail.com
INSERT INTO
    auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
    ('00000000-0000-0000-0000-000000000000', '4dd5b7ec-6832-4f4c-acdf-39d6316dba5d', 'authenticated', 'authenticated', 'mamersfo@gmail.com', '$2a$10$0YICnpzcehjHbi.6aLbNOu5iWzcgnVHzCTh/eQoKhQIXWlZcRjBRi', '2023-04-22 13:10:31.463703+00', NULL, '', NULL, '', '2023-04-22 13:10:03.275387+00', '', '', NULL, '2023-04-22 13:10:31.458239+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO
    auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
    ('4dd5b7ec-6832-4f4c-acdf-39d6316dba5d', '4dd5b7ec-6832-4f4c-acdf-39d6316dba5d'::uuid, '{"sub": "4dd5b7ec-6832-4f4c-acdf-39d6316dba5d", "email": "mamersfo@gmail.com"}', 'email', '2023-04-22 13:10:31.458239+00', '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00');