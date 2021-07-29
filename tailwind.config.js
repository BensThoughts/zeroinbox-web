module.exports = {
  purge: {
    enabled: process.env.TAILWIND_MODE === 'build',
    content: ['./src/**/*.{html,scss, ts}']
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
};
