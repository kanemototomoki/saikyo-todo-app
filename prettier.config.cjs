module.exports = {
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'none',
  semi: false,
  useTabs: false,
  importOrder: [
    '^(react(.*)/(.*)$)|^react$',
    '<THIRD_PARTY_TS_TYPES>',
    '<THIRD_PARTY_MODULES>',
    '^types$',
    '^@server/(.*)$',
    '^@client/(.*)$',
    '^@src/(.*)$',
    '^[./]'
  ],
  plugins: [require('prettier-plugin-tailwindcss')]
}
