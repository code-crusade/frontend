const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = function override(config, env) {
  // eslint-disable-next-line no-param-reassign
  config = rewireReactHotLoader(config, env);
  return config;
};
