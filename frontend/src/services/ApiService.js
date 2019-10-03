import request from 'request';

const apiKey = '7Z5LP05C';
const url = `https://random-word-api.herokuapp.com/word?key=${apiKey}&number=5`;

function tilesObject(word, readable, classname){
    const chars = word.toUpperCase().split('')
          .map( (c,i) => {
              return {id: i , letter: c }
          });;
    if(!readable){
        let currentIndex = chars.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = chars[currentIndex];
            chars[currentIndex] = chars[randomIndex];
            chars[randomIndex] = temporaryValue;
        }
    }

    return chars.map( (c,i) => {
        return {id: c.id , letter: c.letter, x: i, y:1, classname }
    });
}

class ApiService {
    getWord() {
        return new Promise( (accept, reject) => {
            const options = {
                url,
                headers: {
                    'Content-type': 'application/json',
                }
            };

            request.get(options, (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if(res.statusCode !== 200){
                    reject(`API response error: ${res.statusCode}`);
                    return;
                }
                
                try{
                    const words = JSON.parse(body).filter( w => w.length > 4 && w.length < 11);
                    return accept(tilesObject(words[0]));
                }catch (ex){
                    console.log(`ApiService -> Error parsing to JSON: ${body} - ${ex}`);
                    return accept(tilesObject('<sys error>', true, 'tile-wrong'));
                }
            });
        });
    };
}

export default new ApiService();
