FROM node:8 as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

CMD ["npm","start"]
