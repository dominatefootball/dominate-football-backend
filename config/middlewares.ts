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
            'res.cloudinary.com'
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dominate-football-backend.onrender.com',
            '*.onrender.com',
            'res.cloudinary.com'
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',
        'https://dominate-football.vercel.app', // ✅ Add your Vercel domain
        'https://*.vercel.app' // ✅ Allow any Vercel preview deployments
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
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
