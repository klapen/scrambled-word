function status(req, res, next) {
  res.status(200).json({
    message: 'endpoint working properly',
    version: '0.0.1', // ToDo: get version from package.json
  });
  return next();
}

module.exports = {
  status,
};
