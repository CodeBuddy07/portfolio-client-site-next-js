/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ruhulcodes.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/dashboard', '/api'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.ruhulcodes.com/sitemap.xml',
  },
};
