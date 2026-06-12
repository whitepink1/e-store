interface FieldType  {
    label: string;
    value: string;
}

interface FilterField {
  name: string;
  type: string;
  fields: FieldType[] | string[];
}

interface CatalogFilterConfig {
  [category: string]: FilterField[];
}

export const catalogFilter: CatalogFilterConfig = {
  smartphones: [
    { name: 'Battery Capacity', type: 'battery_capacity', fields: 
        [
            {label: '4000-4500 mAh', value: '4000-4500'}, 
            {label: '4500-5000 mAh', value: '4500-5000'}, 
            {label: '5000-6000 mAh', value: '5000-6000'}, 
            {label: '6000+ mAh', value: '6000-99999'}
        ]},
    { name: 'Screen Type', type: 'screen_type', fields: ['AMOLED', 'OLED', 'IPS', 'LCD'] },
    { name: 'Protection Class', type: 'protection_class', fields: ['IP67', 'IP68', 'IP69', 'No protection'] },
  ],
  smartwatches: [
    { name: 'Case Size', type: 'case_size', fields: 
      [
        {label: '38mm', value: '38'}, 
        {label: '40mm', value: '40'}, 
        {label: '41mm', value: '41'}, 
        {label: '44mm', value: '44'}, 
        {label: '45mm', value: '45'}, 
        {label: '49mm', value: '49'}
       ]},
    { name: 'Display Type', type: 'display_type', fields: ['AMOLED', 'OLED', 'TFT', 'E-Ink'] },
    { name: 'Strap Material', type: 'strap_material', fields: ['Silicone', 'Leather', 'Metal', 'Nylon', 'Fabric'] },
  ],
  cameras: [
    { name: 'Sensor Type', type: 'sensor_type', fields: ['Full Frame', 'APS-C', 'Micro Four Thirds', '1-inch'] },
    { name: 'Effective Pixels', type: 'effective_pixels', fields: 
        [
            { label: '12-20 MP', value: '12-20'}, 
            { label: '20-30 MP', value: '20-30'}, 
            { label: '30-40 MP', value: '30-40'}, 
            { label: '40+ MP', value: '40-999'}

        ]},
    { name: 'Video Resolution', type: 'video_resolution', fields: 
      [
        {label: 'Full HD (1080p)', value: '1080p'}, 
        {label: '4K UHD', value: '4K'}, 
        {label: '6K', value: '6K'}, 
        {label: '8K', value: '8K'},
      ]},
  ],
  headphones: [
    { name: 'Headphone Type', type: 'headphone_type', fields: ['In-Ear', 'On-Ear', 'Over-Ear', 'Earbuds'] },
    { name: 'Connection Type', type: 'connection_type', fields: ['Bluetooth (Wireless)', 'Wired (3.5mm)', 'Wired (Type-C)', 'Radio Channel'] },
    { name: 'Microphone', type: 'microphone', fields: ['Built-in', 'Detachable', 'On-Wire', 'None'] },
  ],
  computers: [
    { name: 'Processor', type: 'processor', fields: ['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M-Series'] },
    { name: 'Screen Diagonal', type: 'screen_diagonal', fields: 
        [
            {label: '13"-14"', value: '13-14'}, 
            {label: '15"-16"', value: '15-16'},
            {label: '16"-17"', value: '16-17'}, 
            {label: '18"+', value: '18-99'}
        ]},
    { name: 'RAM Size', type: 'ram_size', fields: 
      [
        {label: '8 GB', value: '8'},
        {label: '16 GB', value: '16'},
        {label: '32 GB', value: '32'},
        {label: '64 GB', value: '64'},

      ]},
  ],
  gaming: [
    { name: 'Max Resolution', type: 'max_resolution', fields: 
      [
        {label: 'Full HD (1080p)', value: '1080p'}, 
        {label: '4K UHD', value: '4K'}, 
        {label: '6K', value: '6K'}, 
        {label: '8K', value: '8K'},
      ]},
    { name: 'Drive Type', type: 'drive_type', fields: ['SSD', 'HDD', 'Digital Only'] },
    { name: 'Controller Included', type: 'controller', fields: ['1 Gamepad', '2 Gamepads', 'None'] },
  ],
};