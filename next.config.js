const nextOffline = require('next-offline');

const config = {
  swcMinify: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.devtool = 'source-map';
    }
    if (isServer) {
      config.resolve.mainFields.reverse();
    }
    return config;
  },
};

const offlineConfig = [
  nextOffline,
  {
    transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
    workboxOpts: {
      swDest: 'static/service-worker.js',
    },
  },
];

const compose = plugins => ({
  webpack(config, options) {
    return plugins.reduce((config, plugin) => {
      if (plugin instanceof Array) {
        const [_plugin, ...args] = plugin;
        plugin = _plugin(...args);
      }
      if (plugin instanceof Function) {
        plugin = plugin();
      }
      if (plugin && plugin.webpack instanceof Function) {
        return plugin.webpack(config, options);
      }
      return config;
    }, config);
  },

  webpackDevMiddleware(config) {
    return plugins.reduce((config, plugin) => {
      if (plugin instanceof Array) {
        const [_plugin, ...args] = plugin;
        plugin = _plugin(...args);
      }
      if (plugin instanceof Function) {
        plugin = plugin();
      }
      if (plugin && plugin.webpackDevMiddleware instanceof Function) {
        return plugin.webpackDevMiddleware(config);
      }
      return config;
    }, config);
  },
});

module.exports = compose([config, offlineConfig]);
