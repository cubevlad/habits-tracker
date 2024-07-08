const eslintRules = 'eslint --max-warnings=0'
const prettierRules = 'prettier --ignore-unknown --write'
const stylelintRules = 'stylelint --max-warnings=0 --config ./.stylelintrc'
const vitestRules = 'vitest run'

const clientConfig = {
  './client/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}': [vitestRules],
  './client/*.{ts,tsx,js,jsx}': [eslintRules, stylelintRules, prettierRules],
  './client/*.{css,scss}': [stylelintRules, prettierRules],
  './client/!*.{js,jsx,ts,tsx,css,scss}': [prettierRules],
}

const serverConfig = {

}

export default {
  ...clientConfig,
  ...serverConfig
}
