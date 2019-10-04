const express = require('express');
const controllers = require('../controllers');

const router = express.Router();
const ctrlService = controllers.service;
const ctrlRndWord = controllers.randomWord;
const ctrlTTS = controllers.textToSpeech;

const baseUrl = '/v1';

// Services status
router.get(`${baseUrl}/`, ctrlService.status);

// Word data
router.get(`${baseUrl}/random-word/`, ctrlRndWord.get);

// Text to speech
router.get(`${baseUrl}/word-to-speech/:word`, ctrlTTS.getWord);

module.exports = router;
