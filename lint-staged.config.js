module.exports = {
  '{packages,apps,libs}/**/*.{js,jsx,ts,tsx,md,html,css,scss}': [
    'nx affected --target link --uncommitted --fix true',
    'nx affected --target test --uncommitted',
    'nx format:write --uncommitted',
  ],
}
