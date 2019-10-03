import request from 'request';

const apiKey = "TBJHATNG";
const url = `https://random-word-api.herokuapp.com/word?key=${apiKey}&number=5`;

function tilesObject(word){
    const chars = word.toUpperCase().split('')
          .map( (c,i) => {
              return {id: i , letter: c }
          });;
    let currentIndex = chars.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = chars[currentIndex];
        chars[currentIndex] = chars[randomIndex];
        chars[randomIndex] = temporaryValue;
    }

    return chars.map( (c,i) => {
        return {id: c.id , letter: c.letter, x: i, y:1 }
    });
}

class ApiService {
    getWord() {
        const options = {
            url,
            headers: {
                'Content-type': 'application/json',
            }
        };
        return new Promise( (accept, reject) => {
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
                    console.log(`ApiService -> Error parsing to JSON: ${ex.trace}`);
                    return accept(tilesObject('<sys error>'));
                }
            });
        });
    }
}

export default new ApiService();
