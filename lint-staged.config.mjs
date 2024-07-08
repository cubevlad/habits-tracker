const eslintRules = 'cd client && eslint --max-warnings=0'

const prettierRules = 'cd client && prettier --ignore-unknown --write'

const stylelintRules = 'cd client && stylelint --max-warnings=0 --config ./.stylelintrc'

const vitestRules = 'cd client && vitest run'

export default {
  '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}': [vitestRules],
  '*.{ts,tsx,js,jsx}': [eslintRules, stylelintRules, prettierRules],
  '*.{css,scss}': [stylelintRules, prettierRules],
  '!*.{js,jsx,ts,tsx,css,scss}': [prettierRules],
}
