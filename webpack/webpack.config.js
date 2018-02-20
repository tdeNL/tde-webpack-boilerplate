/* eslint-disable import/no-dynamic-require,global-require */
const _ = require('lodash');

const buildType = process.env.NODE_ENV || 'default';
const config = require(`./config/${buildType}`);
const fs = require('fs');

if (!fs.existsSync(config.private)) {
  fs.mkdirSync(config.private);
}

const webpack = {
  plugins: [],
  module: {
    rules: [],
  },
  devtool: config.debug ? 'eval-cheap-source-map' : false,
  entry: config.entries,
  output: {
    path: config.private,
    filename: config.components.js.fileMask,
    publicPath: config.public,
  },
};

_.forEach(config.enabledPlugins, (plugin) => {
  require(`./plugins/${plugin}-plugin`)(webpack, config);
});

module.exports = webpack;
