/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ruhulcodes.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/dashboard', '/api'],
        allow: '/',
      },
    ],
    sitemap: 'https://ruhulcodes.com/sitemap.xml',
  },
};
