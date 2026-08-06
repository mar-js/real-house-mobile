const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Desactiva los package exports si un paquete de terceros rompe el bundle
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
