const config = {
  // REQUIRED
  appName: "strong password generator",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "instantly Generate unbreakable passwords with our free strong password generator, creating unique and random keys to safeguard your sensitive data",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "strongpassword-generator.vercel.app",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
}

export default config;