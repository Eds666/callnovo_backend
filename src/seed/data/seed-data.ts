import * as bcrypt from 'bcrypt';

interface SeedAsset {
  description: string;
  location: string;
  subsidiary: string;
  category: string;
  brand: string;
  model: string;
  serial_number: string;
  code: string;
  condition_equipment: string;
}

interface SeedUser {
  email: string;
  password: string;
  username: string;
  roles: string[];
}

interface SeedData {
  users: SeedUser[];
  assets: SeedAsset[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'pablo.penaloza@callnovo.com.es',
      password: bcrypt.hashSync('Gringo123', 10),
      username: 'Gringo',
      roles: ['user'],
    },
    {
      email: 'edsguz666@gmail.com',
      password: bcrypt.hashSync('Eds666', 10),
      username: 'Eds666',
      roles: ['user', 'super-user'],
    },
    {
      email: 'vico@gmail.com',
      password: bcrypt.hashSync('Eds666', 10),
      username: 'VicoSi',
      roles: ['user', 'super-user'],
    },
  ],

  assets: [
    {
      description: 'CPU I5-9400F',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'SURE',
      model: 'I5-9400F',
      serial_number: 'BTOI59400FLP1251',
      code: 'BTOCC-EC-0001',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU i3 9100f',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'SURE',
      model: 'i3 9100f',
      serial_number: 'BTOI39100FLP1202',
      code: 'BTOCC-EC-0002',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU i3 9100',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'i3 9100',
      serial_number: 'BTOI39100LP1165',
      code: 'BTOCC-EC-0003',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU i3 9100',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'i3 9100',
      serial_number: 'BTOI39100LP1150',
      code: 'BTOCC-EC-0004',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I3 9100',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'I3 9100',
      serial_number: 'BTOI39100LP1121',
      code: 'BTOCC-EC-0005',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU i5 9400',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'i5 9400',
      serial_number: 'BTOI59400LP1152',
      code: 'BTOCC-EC-0006',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU AMD RYZEN 3 3200G',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'SURE',
      model: 'AMD RYZEN 3 3200G',
      serial_number: 'BTORZ33200GLP1227',
      code: 'BTOCC-EC-0007',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I3-10100',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'I3-10100',
      serial_number: 'BTOI310100LP1153',
      code: 'BTOCC-EC-0008',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I5-9400F',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'SURE',
      model: 'I5-9400F',
      serial_number: 'BTOI59400FLP1057',
      code: 'BTOCC-EC-0009',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I5-9400',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'I5-9400',
      serial_number: 'BTOI59400FLP1148',
      code: 'BTOCC-EC-0010',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I3 9100',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'I3 9100',
      serial_number: 'BTOI39100LP1228',
      code: 'BTOCC-EC-0011',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU i3 9100f',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'SURE',
      model: 'i3 9100f',
      serial_number: 'BTOI39100FLP1186',
      code: 'BTOCC-EC-0012',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU i5 9400',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'i5 9400',
      serial_number: 'BTOI59400LP1151',
      code: 'BTOCC-EC-0013',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I3-3240',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'ZIP',
      model: 'I3-3240',
      serial_number: 'BTOI33240LP1030',
      code: 'BTOCC-EC-0014',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I3 9100',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'SURE',
      model: 'I3 9100',
      serial_number: 'BTOI39100FLP1029',
      code: 'BTOCC-EC-0015',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU RYZEN 3200G',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'SURE',
      model: 'RYZEN 3200G',
      serial_number: 'BTORZ3200GLP1063',
      code: 'BTOCC-EC-0016',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I3 3240',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'ZIP',
      model: 'I3 3240',
      serial_number: 'BTOI33240LP1206',
      code: 'BTOCC-EC-0017',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU i3 - 9100',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'i3 - 9100',
      serial_number: 'BTOI39100LP1145',
      code: 'BTOCC-EC-0018',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU Core i3-3220',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'ZIP',
      model: 'Core i3-3220',
      serial_number: 'BTOI33220LP1217',
      code: 'BTOCC-EC-0019',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU RYZEN 3200G',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'SURE',
      model: 'RYZEN 3200G',
      serial_number: 'BTORZ3200GLP1048',
      code: 'BTOCC-EC-0020',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I5 - 10400',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'INVADER',
      model: 'I5 - 10400',
      serial_number: 'BTOI510400LP1239',
      code: 'BTOCC-EC-0021',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU I3-3240',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'ZIP',
      model: 'I3-3240',
      serial_number: 'BTOI33240LP1030',
      code: 'BTOCC-EC-0022',
      condition_equipment: 'Bueno',
    },
    {
      description: 'CPU i3-3220',
      location: 'Oficina',
      subsidiary: 'La Paz',
      category: 'Equipo de Computacion',
      brand: 'ZIP',
      model: 'i3-3220',
      serial_number: 'BTOI332201234',
      code: 'BTOCC-EC-0023',
      condition_equipment: 'Bueno',
    },
  ],
};