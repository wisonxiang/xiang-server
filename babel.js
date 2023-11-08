require('module-alias/register');
require("@babel/register")({
  presets: ['@babel/preset-env']
});

require('./src/app.js')