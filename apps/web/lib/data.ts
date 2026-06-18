interface FieldType  {
    label: string;
    value: string;
}

export interface FilterField {
  name: string;
  type: string;
  fields: FieldType[] | string[];
}

interface CatalogFilterConfig {
  [category: string]: FilterField[];
}

export const headerNav = [
    {title: 'Home', url: '/'},
    {title: 'Catalog', url: '/catalog'},
    {title: 'About', url: '/about'},
    {title: 'Contact Us', url: '/contact'},
    {title: 'Blog', url: '/blog'},
];

export const footerNav = [
    {name: 'Services', links: [
        {title: 'Bonus program', url: '/'},
        {title: 'Gift cards', url: '/'},
        {title: 'Credit and Payment', url: '/'},
        {title: 'Service contracts', url: '/'},
        {title: 'Non-cash account', url: '/'},
        {title: 'Payment', url: '/'},
    ]},
    {name: 'Assistance to the buyer', links: [
        {title: 'Find an order', url: '/'},
        {title: 'Terms of delivery', url: '/'},
        {title: 'Exchange and return of goods', url: '/'},
        {title: 'Guarantee', url: '/'},
        {title: 'Frequently asked questions', url: '/'},
        {title: 'Terms of use the site', url: '/'},
    ]},
];

export const footerSocial = [
    {name: 'Twitter', src: '/icon/twitter.png', url: '/'},
    {name: 'Facebook', src: '/icon/facebook.png', url: '/'},
    {name: 'Tiktok', src: '/icon/tiktok.png', url: '/'},
    {name: 'Instagram', src: '/icon/instagram.png', url: '/'},
];

export const profileTabs = [
  {name: 'Profile', tabTag: 'profile'},
  {name: 'Add Product', tabTag: 'add-product'},
  {name: 'My Products', tabTag: 'products'},
  {name: 'Favourites', tabTag: 'favourite'},
  {name: 'Cart', tabTag: 'cart'},
  {name: 'Orders', tabTag: 'order'},
]

export const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
};

export const browseCategory = [
  {name: 'Phones', url: '/catalog/smartphones', img: '/icon/phones.png'},
  {name: 'Smart Watches', url: '/catalog/smartwatches', img: '/icon/smart_watches.png'},
  {name: 'Cameras', url: '/catalog/cameras', img: '/icon/cameras.png'},
  {name: 'Headphones', url: '/catalog/headphones', img: '/icon/headphones.png'},
  {name: 'Computers', url: '/catalog/computers', img: '/icon/computers.png'},
  {name: 'Gaming', url: '/catalog/gaming', img: '/icon/gaming.png'},
];

export const homepageSlideOptions = [
  {name: 'Popular Products', description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.', img: '/images/group-1.png', url: '/', bg: '#FFF', variant: 'black'},
  {name: 'Ipad Pro', description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.', img: '/images/group-2.png', url: '/', bg: '#F9F9F9', variant: 'black'},
  {name: 'Samsung Galaxy ', description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.', img: '/images/group-3.png', url: '/', bg: '#EAEAEA', variant: 'black'},
  {name: 'Macbook Pro', description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.', img: '/images/group-4.png', url: '/', bg: '#2C2C2C', variant: 'white'},
];

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

export const catalogOrder = [
  {name: 'By Name', type: 'name'},
  {name: 'Price Low to High', type: 'price_asc'},
  {name: 'Price High to Low', type: 'price_desc'},
];

export const productColors = [
  { name: 'black', color: '#1C1C1E' },
  { name: 'white', color: '#F8F8F8' },
  { name: 'silver', color: '#C0C0C0' },
  { name: 'graphite', color: '#4A4A4A' },
  { name: 'navy', color: '#1E3A8A' },
  { name: 'skyBlue', color: '#7DD3FC' },
  { name: 'blue', color: '#3B82F6' },
  { name: 'mint', color: '#A7F3D0' },
  { name: 'forestGreen', color: '#166534' },
  { name: 'pink', color: '#F9C8D6' },
  { name: 'blush', color: '#F8A5B8' },
  { name: 'lavender', color: '#E6D9FF' },
  { name: 'peach', color: '#FFCCB3' },
  { name: 'lemon', color: '#FEF08C' },
  { name: 'gold', color: '#EAB308' },
  { name: 'red', color: '#B91C1C' },
  { name: 'coral', color: '#FCA5A5' },
  { name: 'sage', color: '#94A38B' },
] as const;

export const deliveryDetailed = [
  {name: 'Free Delivery', img: '/icon/delivery-truck.png', text: '1-2 day'},
  {name: 'In Stock', img: '/icon/shop-com.png', text: 'Today'},
  {name: 'Guaranteed', img: '/icon/verify.png', text: '1 year'},
];

export const checkoutSteps = [
  {number: 'Step 1', dataName: 'Address', img: '/icon/location.png'},
  {number: 'Step 2', dataName: 'Shipping', img: '/icon/shipping.png'},
  {number: 'Step 3', dataName: 'Payment', img: '/icon/payment.png'},
];

export const shipmentMethod = [
  {name: 'Free', text: 'Regulary shipment', price: 0},
  {name: '$8.50', text: 'Get your delivery as soon as possible', price: 8.50},
  {name: 'Schedule', text: 'Pick a date when you want to get your delivery', price: 0},
];

export const HotOffersLinks = [
  {name: 'New Arrival', tag:'new', dbName: 'new_arrival'},
  {name: 'Bestseller', tag:'best', dbName: 'bestseller'},
  {name: 'Featured Products', tag:'featured', dbName: 'featured_products'},
];