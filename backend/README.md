# Scrabble Backend

API endpoint for an English spelling exercises using scramble letters to organize according to the word audio provided. This project has a [frontend](../frontend/README.md) to test it.

## How it works

As a standard REST API, it supports different endpoints to request or retrieve information .

| Endpoint | Method| Description | Sucessfull (200) Response|
| :--------| :-------- | :-------- | :--------|
| /api/v1/ | GET | System status | ALL| ``` { message: 'endpoint working properly', version: {current_version} } ``` |
| /api/v1/random-word | GET | Retrieve a random word | ```{ word: random_word }```|
| /api/v1/word-to-speech/:word | GET | Word pronunciation | MP3 buffer|

# Before you start

## Default variables 
In the code, on */src/config/index.js*, there are a few default values configured to use *winston logger* but for the rest, it requires to be configured on files per environment, on */src/config/env/{:environment}.js*. The required variables to configure are:
- VOICE_RSS_KEY: (Required) API key from [Voice RSS](http://www.voicerss.org/default.aspx) to use the text to speech service.
- PORT: Listening port.
- API_BASE_ENDPOINT: String to set the api endpoint, by default is */api/*.

By default *development* environment file is created. To select a new environment, just create a file in */src/config/env/{:environment_name}.js* (or validate that it is already created) and change the node environment varible.

```
$ export NODE_ENV={:environment_name}
```

If no *NODE_ENV* is set, it will take by default development configuration.

# Start server
## Development 
First, clone the repository, install the dependencies and start the server:
```
$ git clone https://github.com/klapen/scrambled-word.git
$ cd scrambled-word/backend
$ npm install
$ npm start
```
By default, the port is **3000**. If you want another port, just set the environment variable *PORT* or change *NODE_ENV* to address the environment configuration.
## Docker
The repository comes with *Dockerfile* to start a server:
```
$ git clone https://github.com/klapen/scrambled-word.git
$ cd scrambled-word/backend
$ docker build -t scramble-word .
$ docker run -it -p 3000:3000 --name scramble-word-backend -e VOICE_RSS_KEY={voice_rss_key} --rm scramble-word-backend
```
Remember to start docker service before typing the commands.
# How to use

Open your favourite API client and send request to the drone broker API.
```
GET http://localhost:3000/api/v1/word/
Content-Type: application/json
```

# Release note

- v0.0.1 Proof-Of-Concept
