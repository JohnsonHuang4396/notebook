import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  stylistic: {
    quotes: 'single',
    semi: false,
    indent: 2,
    overrides: {
      'style/comma-dangle': ['error', 'never'],
      'style/array-bracket-newline': ['error', 'consistent'],
      'style/arrow-parens': ['error', 'as-needed']
    }
  },
  rules: {
    'no-restricted-properties': 'off',
    'no-proto': 'off',
    'no-console': 'off',
    'no-var': 'off'
  },
  ignores: ['**/*.md']
})
