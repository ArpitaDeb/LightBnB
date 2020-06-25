INSERT INTO
  users (name, email, password)
VALUES
  (
    'ric',
    'ric.sandchez@gmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  ),
  (
    'rick',
    'rick.sandchez@gmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  ),
  (
    'arick',
    'ri.sandchez@gmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  ),
  (
    'rarick',
    'rik.sandchez@gmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  );

INSERT INTO
  properties (
    title,
    description,
    owner_id,
    cover_photo_url,
    thumbnail_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    active,
    province,
    city,
    country,
    street,
    post_code
  )
VALUES
  (
    'Magic familiar',
    'Comfortable fill stick belong fly construction wave positive mean',
    128,
    'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg',
    'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350',
    36317,
    1,
    3,
    0,
    true,
    'Quebec',
    'Chicoutimi',
    'Canada',
    '1950 Zujcol Path',
    '19755'
  ),
  (
    'List least',
    'Younger week student surface speak how sick bark outside',
    391,
    'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg',
    'https://images.pexels.com/photos/2099019/pexels-photo-2099019.jpeg?auto=compress&cs=tinysrgb&h=350',
    34565,
    0,
    1,
    1,
    true,
    'Newfoundland And Labrador',
    'Paradise',
    'Canada',
    '1848 Cuzo Trail',
    '08409'
  ),
  (
    'Done game',
    'Invented',
    69,
    'https://images.pexels.com/photos/271649/pexels-photo-271649.jpeg',
    'https://images.pexels.com/photos/271649/pexels-photo-271649.jpeg?auto=compress&cs=tinysrgb&h=350',
    57597,
    0,
    1,
    7,
    true,
    'Prince Edward Island',
    'Summerside',
    'Canada',
    '1624 Cufpip Square',
    '79224'
  );
INSERT INTO
  reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 1, 1),
  ('2019-01-04', '2019-02-01', 2, 2),
  ('2020-01-04', '2020-02-01', 3, 3),
  ('2021-10-01', '2021-10-14', 4, 4);

INSERT INTO
  property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES
  (399, 71, 1014869, 5, 'Gecivudi'),
  (
    808,
    551,
    1019030,
    5,
    'Nacsogce'
  ),
  (994, 521, 1016993, 3, 'Te gow');