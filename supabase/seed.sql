-- user: e.g. mamersfo@gmail.com
INSERT INTO
    auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
    ('00000000-0000-0000-0000-000000000000', '4dd5b7ec-6832-4f4c-acdf-39d6316dba5d', 'authenticated', 'authenticated', 'mamersfo@gmail.com', '$2a$10$0YICnpzcehjHbi.6aLbNOu5iWzcgnVHzCTh/eQoKhQIXWlZcRjBRi', '2023-04-22 13:10:31.463703+00', NULL, '', NULL, '', '2023-04-22 13:10:03.275387+00', '', '', NULL, '2023-04-22 13:10:31.458239+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO
    auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
    ('4dd5b7ec-6832-4f4c-acdf-39d6316dba5d', '4dd5b7ec-6832-4f4c-acdf-39d6316dba5d'::uuid, '{"sub": "4dd5b7ec-6832-4f4c-acdf-39d6316dba5d", "email": "mamersfo@gmail.com"}', 'email', '2023-04-22 13:10:31.458239+00', '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00');

INSERT INTO
    products (slug, name, price, tags, short_description)
VALUES
    ('_mQW59DjahQ', 'Baseball Tee', 1995, ARRAY['shirt', 'organic'], 'Red and white shirt'),
    ('-_gMskl-uoc', 'Sheep Costume', 2995, ARRAY['party', 'halloween'], 'Sheep clothing for your dog'),
    ('2rHw1I_IoT4', 'Varsity Jacket', 10995, ARRAY['sustainable'], 'Green varsity jacket for your doggo'),
    ('F1PDaeAyr1A', 'Yellow Sweater', 7995, ARRAY['fashion', 'party'], 'A sweater for your champion, by Champion'),
    ('jwB41-bQn_o', 'Off White Hoodie', 39900, ARRAY['streetwear', 'hipster'], 'Dogwear for the streets'),
    ('lQ8WvR54MOU', 'Dog Collar', 1995, ARRAY['walk', 'pink'], 'Who’s a good boy?'),
    ('n3c5pSoD2Fc', 'Antler Headband', 1095, ARRAY['christmas', 'party'], 'A prop for you Christmas party'),
    ('vuFec8Eyk7k', 'Banana Pyjamas', 1699, ARRAY['nightwear', 'organic'], 'Blue and yellow pyjamas'),
    ('ewfHXBcuFA0', 'Hooded Shirt', 1699, ARRAY['shirt'], 'Yellow and green shirt');

UPDATE products
SET
    long_description = 'Baseball athletes like to play fetch. Your dog likes to play fetch. I you go out with your dog and play fetch, or if you bring him along to the baseball stadium, here’s a baseball tee that your dog can wear for the occasion. The t-shirt is made from organic materials.'
WHERE
    slug = '_mQW59DjahQ';

UPDATE products
SET
    long_description = 'In case of Halloween, Christmas parties or whatever - if your best friend needs a costume, look no further. Seriously, here is a costume that will turn your favourite carnivore into the angelic figure you want it to be, occasionally. What’s wrong anyway with a dog in sheep’s clothing, right? Not much, at least not for Halloween, or the Christmas holidays we think. The sheep’s costume is made from recycled materials, and sports a tiny little present.'
WHERE
    slug = '-_gMskl-uoc';

UPDATE products
SET
    long_description = 'When it’s cold and wet outside, but you must walk your dog, you ordinarily decide put on a coat or jacket, right? Well, that’s a great idea for your dog too. In order to protect you best friend from harsh conditions you can buy him this green sports jacket, and he’ll be allright, just like you.'
WHERE
    slug = '2rHw1I_IoT4';

UPDATE products
SET
    long_description = 'Champion is a well-known sports apparel brand. But did you know they have a full division for pet sportswear as well? Take for instance this yellow sweater, that will certainly look cool for your very own champion.'
WHERE
    slug = 'F1PDaeAyr1A';

UPDATE products
SET
    long_description = 'Top of the bill hoodie, made from organic cotton, from the famous streetwear brand Off White. This could be the gift for you dog, which will earn him some serious street credibility. Golden chain is not included.'
WHERE
    slug = 'jwB41-bQn_o';

UPDATE products
SET
    long_description = 'It’s one of those essential items. Sure, your dog is a good boy (girl), but once his eye catches one of those nasty neighbourhood cats you can be sure he will be chasing them through the streets. So here’s a fashionable collar to keep him close to you.'
WHERE
    slug = 'lQ8WvR54MOU';

UPDATE products
SET
    long_description = 'Here’s an idea for the Christmas holidays, deer antler headbands for your dog to wear on his head. Great for parties. Displayed Christmas costume is not included.'
WHERE
    slug = 'n3c5pSoD2Fc';

UPDATE products
SET
    long_description = 'At night, when the heater is off, the house becomes colder. But sometimes your dog is up, wandering around, looking for a warm place to take his next nap. To keep him warm, put on this pyjamas, and he will feel much more comfortable. Banana is not included in the price.'
WHERE
    slug = 'vuFec8Eyk7k';

UPDATE products
SET
    long_description = 'This hooded shirt is made from a blend of cotton and synthetic materials, which makes it more flexible and more comfortable to wear for your active dog. It’s got a green plume on top of it, that will attract most people’s (and most other dog’s) attention.'
WHERE
    slug = 'ewfHXBcuFA0';