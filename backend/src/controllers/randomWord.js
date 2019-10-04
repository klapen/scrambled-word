const randomWords = require('random-words');

function get(req, res, next) {
  const word = randomWords({ exactly: 1, maxLength: 11 })[0];

  res.status(200).json({
    word,
  });
  return next();
}


module.exports = {
  get,
};
