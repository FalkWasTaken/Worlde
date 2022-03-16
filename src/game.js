const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split('')
const VALID_WORDS = ["MÅNGA", "HALLÅ", "TESTA"];

class Game {
    constructor() {
        this.currentGuess = 0
        this.guesses = ["", "", "", "", ""]
        this.word = "MÅNGA"
        this.charStatus = {}
        ALPHABET.forEach(c => this.charStatus[c] = "lightGray")
        this.observers = []
    }

    getCurrent() {
        return this.guesses[this.currentGuess]
    }

    addChar(c) {
        if (this.getCurrent().length < 5) {
            this.guesses[this.currentGuess] += c
        }
    }

    removeChar() {
        if (this.getCurrent().length > 0) {
            this.guesses[this.currentGuess] = this.getCurrent().slice(0, -1)
        }
    }

    validate() {
        const guess = this.getCurrent()
        if (guess.length === 5 && VALID_WORDS.includes(guess)) {
            const word = this.word.split('')
            guess.split('').forEach((c, i) => {
                if (!word.includes(c)) {
                    this.charStatus[c] = "keyDark"
                } else if (word[i] === c) {
                    this.charStatus[c] = "keyGreen"
                }
            })
        }
    }

    addObserver(obs) {
        this.observers = {...this.observers, obs}
    }

    removeObserver(obs) {
        this.observers = this.observers.filter(o => o !== obs)
    }

    notifyObservers(payload) {
        this.observers.forEach(obs => obs(payload))
    }
}

export default Game