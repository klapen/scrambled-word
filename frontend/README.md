# Scrabble Frontend

English spelling exercises using scramble letters to organize according to the word audio provided. It requires to have a [custom backend](../backend/README.md) up and running.

The frontend project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.<br>

First, clone the repository, install the dependencies and start the server:
```
$ git clone https://github.com/klapen/scrambled-word.git
$ cd scrambled-word/frontend
$ yarn
$ yarn build
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

By default, the port is **3000**. If you want another port, just set the environment variable *PORT* to the new port:
```
$ export PORT={new_port}
```
The default API endpoint is addressed to **localhost:3001**, so if you use another API just set the environment variable *REACT_APP_API_SERVICE_URL* to your endpoint

## `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Run from Docker
The repository comes with *Dockerfile* to start a server:
```
$ git clone https://github.com/klapen/scrambled-word.git
$ cd scrambled-word/frontend
$ docker build -t scramble-word .
$ docker run -it -p 3000:3000 --name scramble-word --rm scramble-word
```
Remember to start docker service before typing the commands. To change the port, just map the desired port when running the docker image.

# Release note

- v0.1.0 Beta version