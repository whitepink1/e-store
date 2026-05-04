export const headerNav = [
    {title: 'Home', url: '/'},
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