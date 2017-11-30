// station-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const station = new Schema({
    localId: {
      type: String,
      required: true,
      trim: true,
      index: {
        unique: true
      }
    },
    displayName: {
      type: String,
      trim: true
    },
    channelDisplayNames: [{
      type: String,
      trim: true
    }]
  });

  return mongooseClient.model('station', station);
};
