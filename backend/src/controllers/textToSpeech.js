const config = require('../config');
const logger = require('../utils/logger');
const tts = require('../utils/voice-rss-tts');

function getWord(req, res, next) {
    if(!config.VOICE_RSS_KEY){
      logger.error('GetWord -> No key defined for Voice RSS API');
      return next('Couldn\'t get the audio. Please contact system administrator');
  }
  tts.speech({
    key: config.VOICE_RSS_KEY,
    hl: 'en-us',
    src: req.params.word,
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
    b64: false,
    callback: (error, audio) => {
      if (error) {
        logger.error(`GetWord -> Error on Voice RSS api: ${error}`);
        return next('Error on Voice RSS api. Please contact system administrator');
      }

      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audio.length,
      });

      res.end(audio);
      return next();
    },
  });
}


module.exports = {
  getWord,
};
