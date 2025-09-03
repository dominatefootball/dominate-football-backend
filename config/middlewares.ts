export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dominate-football-backend.onrender.com',
            '*.onrender.com',
            'res.cloudinary.com' // ✅ Add this for Cloudinary images
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dominate-football-backend.onrender.com',
            '*.onrender.com', 
            'res.cloudinary.com' // ✅ Add this for Cloudinary media
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000'], // ✅ Allow Next.js frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
