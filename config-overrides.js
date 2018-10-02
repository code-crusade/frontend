const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  // eslint-disable-next-line no-param-reassign
  config = rewireReactHotLoader(config, env);

  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
    new MonacoWebpackPlugin()
  );

  return config;
};
