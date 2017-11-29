// measurement-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const measurement = new Schema({
    value: { type: Number, required: true },
    channelIndex: { type: Number, required: true },
    station: { type: Schema.ObjectId, ref: 'station' }
  }, {
    timestamps: true
  });

  return mongooseClient.model('measurement', measurement);
};
