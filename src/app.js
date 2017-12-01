const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const mongoose = require('./mongoose');

var app = express(feathers());

app.sensorBotGetConfiguration = sensorBotGetConfiguration;
app.sensorBotSetupExpress = sensorBotSetupExpress;

function sensorBotGetConfiguration() {
  this.configure(configuration());
}

function sensorBotSetupExpress() {
  // Enable CORS, security, compression, favicon and body parsing
  this.use(cors());
  this.use(helmet());
  this.use(compress());
  this.use(express.json());
  this.use(express.urlencoded({ extended: true }));
  this.use(favicon(path.join(this.get('public'), 'img/favicon.ico')));
  // Host the public folder
  this.use('/', express.static(this.get('public')));

  // Set up Plugins and providers
  this.configure(express.rest());
  this.configure(socketio());

  this.configure(mongoose);

  // Configure other middleware (see `middleware/index.js`)
  this.configure(middleware);
  // Set up our services (see `services/index.js`)
  this.configure(services);
  // Set up event channels (see channels.js)
  this.configure(channels);

  // Configure a middleware for 404s and the error handler
  this.use(express.notFound());
  this.use(express.errorHandler({ logger: global.logger }));

  this.hooks(appHooks);
}

module.exports = app;
