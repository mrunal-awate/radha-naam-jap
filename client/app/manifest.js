export default function manifest() {
  return {
    name: 'Radha Naam Jap - Free Japa Counter',
    short_name: 'Radha Naam Jap',
    description: 'A quiet space to count your japa. Free, always.',
    start_url: '/',
    display: 'standalone',
    background_color: '#2a0a1c',
    theme_color: '#4a1530',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
}