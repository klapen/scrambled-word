import request from 'request';

const url = 'http://localhost:3001/api/v1';

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
        const positions = chars.map( (d,i) => d.letter === c.letter ? d.id : -1).filter( i => i !== -1);
        return {id: c.id , letter: c.letter, x: i, y:1, classname, positions }
    });
}

class ApiService {
    getWord() {
        return new Promise( (accept, reject) => {
            const options = {
                url: `${url}/random-word`,
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
                    const word = JSON.parse(body).word;
                    return accept({
                        word: tilesObject(word),
                        audioUrl: `${url}/word-to-speech/${word}`
                    });
                }catch (ex){
                    console.log(`ApiService -> Error parsing to JSON: ${body} - ${ex}`);
                    return accept(tilesObject('<sys error>', true, 'tile-wrong'));
                }
            });
        });
    };
}

export default new ApiService();
