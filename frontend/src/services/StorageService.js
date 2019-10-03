/**
 * Class to operate with storage
 */

class StorageService {
    constructor() {
        this.storage = window.localStorage;
        this.scoreKey = 'score';
    }

    getScore() {
        return this.storage.getItem(this.scoreKey) || 0;
    }

    addToScore(points) {
        const pnts = parseInt(points);
        if (!pnts) {
            return this.getScore();
        }

        const prevScore = parseInt(this.getScore());
        const newScore = prevScore + pnts;
        this.storage.setItem(this.scoreKey, newScore);

        return newScore;
    }

    resetScore() {
        this.storage.removeItem(this.scoreKey);
    }
}

export default new StorageService()
