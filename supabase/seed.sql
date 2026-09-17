-- Sample inventory for local/staging environments.
-- Images are left empty here — upload real photos via the admin panel
-- (Sprint 4) or directly to the `vehicle-images` storage bucket.

insert into vehicles (slug, make, model, year, price, mileage, color, status, badge, description, specs)
values
  ('2023-porsche-911-gt3', 'Porsche', '911 GT3', 2023, 189900, 3200, 'GT Silver Metallic', 'available', 'Featured',
   'Track-bred naturally aspirated flat-six, PDK, full PPF, single owner.',
   '{"engine": "4.0L Flat-6", "transmission": "PDK 7-Speed", "drivetrain": "RWD", "0-60": "3.2s"}'),

  ('2022-mercedes-amg-gt', 'Mercedes-AMG', 'GT 63 S', 2022, 134500, 8100, 'Obsidian Black', 'available', 'Rare',
   'AMG 4.0L V8 biturbo, E Performance hybrid assist, Burmester sound.',
   '{"engine": "4.0L V8 Biturbo", "transmission": "9-Speed Automatic", "drivetrain": "AWD", "0-60": "3.1s"}'),

  ('2023-bmw-m4-csl', 'BMW', 'M4 CSL', 2023, 149000, 1450, 'Frozen Brooklyn Grey', 'available', 'Featured',
   'One of 1,000 units worldwide. Carbon bucket seats, CSL wheels.',
   '{"engine": "3.0L Twin-Turbo I6", "transmission": "8-Speed Automatic", "drivetrain": "RWD", "0-60": "3.4s"}'),

  ('2021-audi-rs6-avant', 'Audi', 'RS6 Avant', 2021, 109750, 15200, 'Nardo Grey', 'available', null,
   'Practical performance wagon, 591hp twin-turbo V8, dynamic package.',
   '{"engine": "4.0L V8 Biturbo", "transmission": "8-Speed Tiptronic", "drivetrain": "AWD", "0-60": "3.5s"}'),

  ('2020-lamborghini-huracan-evo', 'Lamborghini', 'Huracán EVO', 2020, 219900, 6800, 'Arancio Borealis', 'reserved', 'Rare',
   'Naturally aspirated V10, rear-wheel steering, full service history.',
   '{"engine": "5.2L V10", "transmission": "7-Speed DCT", "drivetrain": "AWD", "0-60": "2.9s"}'),

  ('2022-porsche-taycan-turbo-s', 'Porsche', 'Taycan Turbo S', 2022, 132400, 11300, 'Frozen Blue Metallic', 'available', null,
   'All-electric flagship, 750hp overboost, ceramic brakes.',
   '{"engine": "Dual Electric Motor", "transmission": "2-Speed Automatic", "drivetrain": "AWD", "0-60": "2.6s"}'),

  ('2019-ferrari-488-pista', 'Ferrari', '488 Pista', 2019, 349000, 4100, 'Rosso Corsa', 'sold', 'Rare',
   'Track-focused special series, 710hp twin-turbo V8.',
   '{"engine": "3.9L V8 Biturbo", "transmission": "7-Speed DCT", "drivetrain": "RWD", "0-60": "2.85s"}'),

  ('2023-chevrolet-corvette-z06', 'Chevrolet', 'Corvette Z06', 2023, 124995, 2600, 'Torch Red', 'available', 'Featured',
   'Flat-plane-crank V8, 670hp, track-ready carbon package.',
   '{"engine": "5.5L V8", "transmission": "8-Speed DCT", "drivetrain": "RWD", "0-60": "2.6s"}'),

  ('2021-mclaren-720s', 'McLaren', '720S', 2021, 229500, 5300, 'Volcano Orange', 'available', 'Rare',
   'Carbon monocage, 710hp twin-turbo V8, exceptional condition.',
   '{"engine": "4.0L V8 Biturbo", "transmission": "7-Speed DCT", "drivetrain": "RWD", "0-60": "2.7s"}'),

  ('2020-aston-martin-db11', 'Aston Martin', 'DB11 AMR', 2020, 159900, 9800, 'Magnetic Silver', 'available', null,
   'AMR performance package, 630hp twin-turbo V12, grand tourer.',
   '{"engine": "5.2L V12 Biturbo", "transmission": "8-Speed Automatic", "drivetrain": "RWD", "0-60": "3.5s"}');
