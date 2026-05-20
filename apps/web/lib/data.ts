interface FilterField {
  name: string;
  type: string;
  fields: string[];
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
  {name: 'Popular Products', description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.', img: '/images/', url: '/', bg: '', variant: 'black'},
  {name: 'Ipad Pro', description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.', img: '/images/', url: '/', bg: '', variant: 'black'},
  {name: 'Samsung Galaxy ', description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.', img: '/images/', url: '/', bg: '', variant: 'black'},
  {name: 'Macbook Pro', description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.', img: '/images/', url: '/', bg: '', variant: 'white'},
];

export const catalogFilter: CatalogFilterConfig = {
  smartphones: [
    { name: 'Battery Capacity', type: 'battery_capacity', fields: ['4000-4500 mAh', '4500-5000 mAh', '5000-6000 mAh', '6000+ mAh'] },
    { name: 'Screen Type', type: 'screen_type', fields: ['AMOLED', 'OLED', 'IPS', 'LCD'] },
    { name: 'Protection Class', type: 'protection_class', fields: ['IP67', 'IP68', 'IP69', 'No protection'] },
  ],
  smartwatches: [
    { name: 'Case Size', type: 'case_size', fields: ['38mm', '40mm', '41mm', '44mm', '45mm', '49mm'] },
    { name: 'Display Type', type: 'display_type', fields: ['AMOLED', 'OLED', 'TFT', 'E-Ink'] },
    { name: 'Strap Material', type: 'strap_material', fields: ['Silicone', 'Leather', 'Metal', 'Nylon', 'Fabric'] },
  ],
  cameras: [
    { name: 'Sensor Type', type: 'sensor_type', fields: ['Full Frame', 'APS-C', 'Micro Four Thirds', '1-inch'] },
    { name: 'Effective Pixels', type: 'effective_pixels', fields: ['12-20 MP', '20-30 MP', '30-40 MP', '40+ MP'] },
    { name: 'Video Resolution', type: 'video_resolution', fields: ['Full HD (1080p)', '4K UHD', '6K', '8K'] },
  ],
  headphones: [
    { name: 'Headphone Type', type: 'headphone_type', fields: ['In-Ear', 'On-Ear', 'Over-Ear', 'Earbuds'] },
    { name: 'Connection Type', type: 'connection_type', fields: ['Bluetooth (Wireless)', 'Wired (3.5mm)', 'Wired (Type-C)', 'Radio Channel'] },
    { name: 'Microphone', type: 'microphone', fields: ['Built-in', 'Detachable', 'On-Wire', 'None'] },
  ],
  computers: [
    { name: 'Processor', type: 'processor', fields: ['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M-Series'] },
    { name: 'Screen Diagonal', type: 'screen_diagonal', fields: ['13"-14"', '15"-15.6"', '16"', '17"+'] },
    { name: 'RAM Size', type: 'ram_size', fields: ['8 GB', '16 GB', '32 GB', '64 GB'] },
  ],
  gaming: [
    { name: 'Max Resolution', type: 'max_resolution', fields: ['1080p (Full HD)', '1440p (Quad HD)', '4K Ultra HD'] },
    { name: 'Drive Type', type: 'drive_type', fields: ['SSD', 'HDD', 'Digital Only (No Drive)'] },
    { name: 'Controller Included', type: 'controller', fields: ['1 Gamepad', '2 Gamepads', 'None (Console Only)'] },
  ],
};

export const catalogOrder = [
  {name: 'By Name', type: 'name'},
  {name: 'Price Low to High', type: 'price_asc'},
  {name: 'Price High to Low', type: 'price_desc'},
  {name: 'By Rating', type: 'rating'},
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
]