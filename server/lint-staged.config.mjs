const eslintRules = 'eslint --max-warnings=0'
const prettierRules = 'prettier --ignore-unknown --write'

export default {
  // '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}': [vitestRules],
  '*.{ts,tsx,js,jsx}': [eslintRules, prettierRules],
  '!*.{js,jsx,ts,tsx,css,scss}': [prettierRules],
}
