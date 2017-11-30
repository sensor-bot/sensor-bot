module.exports = function (app) { // eslint-disable-line no-unused-vars
  // Add your custom middleware here. Remember, that
  // in Express the order matters

  // Expose request headers to feathers hooks
  app.use(function(req, res, next) {
    req.feathers.headers = req.headers;
    next();
  });
};
