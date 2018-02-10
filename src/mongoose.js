const mongoose = require('mongoose');

module.exports = function (app) {
  let mongoCfg = app.get('mongodb');
  let mongoUri = app.get('mongodburi');
  mongoose.connect(mongoUri || `mongodb://${mongoCfg.host}:${mongoCfg.port}/${mongoCfg.db}`, {
    useMongoClient: true
  });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
