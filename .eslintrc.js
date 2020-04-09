module.exports = {
  extends: 'erb/typescript',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/no-static-element-interactions' : 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "class-methods-use-this": 0,
    // promise
    "promise/catch-or-return": 0,
    "promise/always-return": 0,
    "promise/no-nesting": 0
    // for in for of
    "no-restricted-syntax": 0,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  }
};
