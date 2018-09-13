module.exports = {
  'settings': {
    'react': {
      "version": "^16.2.0",
    }
  },
  "extends": [
    "airbnb-base",
    "plugin:react/recommended",
  ],
  "globals": {
    "document": true,
    "window": true,
    "React": true,
  },
  "env": {
    "mocha": true,
    "es6": true,
    "browser": true,
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "arrow-body-style": "off",
    "react/prop-types": 0,
    "no-console": 0,
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "should|expect|raf"
      }
    ],
    // 'id-match': [
    //   'error',
    //   '^(UNSAFE_componentDidMount|UNSAFE_componentWillReceiveProps|UNSAFE_componentWillUpdate|[a-z]+([A-Z][a-z]+)*)$'
    // ]
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  
};