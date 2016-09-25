module.exports = {
    "extends": "angular",
  rules: {
    'indent': [2, 2, {
      SwitchCase: 1
    }],
    'space-before-function-paren': [2, 'never'],
    'max-len': [1, 120, 4, {
      ignoreComments: true,
      ignoreUrls: true
    }],
    'no-unused-vars': [2, {
      "args": "none",
    }],
  }

};
