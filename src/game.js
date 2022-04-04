import _ from 'underscore'

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split('')
const VALID_WORDS = require('./valid.json');

function getWord() {
    const d = new Date()
    const str = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString()
    return VALID_WORDS[hash(str) % VALID_WORDS.length]
}

function hash(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

class Game {
    constructor() {
        this.currentGuess = 0
        this.guesses = ["", "", "", "", "", ""]
        this.guessStatus = Array.from({length: 6}, () => Array(5).fill("guessEmpty"))
        this.word = _.sample(VALID_WORDS)
        //this.word = getWord()
        this.charStatus = {}
        ALPHABET.forEach(c => this.charStatus[c] = "keyLight")
        this.observers = []
        this.haveWon = false
    }

    getCurrent() {
        return this.guesses[this.currentGuess]
    }

    addChar(c) {
        if (this.getCurrent().length < 5 && ALPHABET.includes(c) && !this.haveWon) {
            this.guesses[this.currentGuess] += c
            this.notifyObservers({newGuesses: this.guesses})
        }
    }

    removeChar() {
        if (this.getCurrent().length > 0) {
            this.guesses[this.currentGuess] = this.getCurrent().slice(0, -1)
            this.notifyObservers({newGuesses: this.guesses})
        }
    }

    validate() {
        const guess = this.getCurrent()
        if (guess.length === 5 && VALID_WORDS.includes(guess)) {
            const word = this.word.split('')
            let processed = Array(5).fill(false)
            let available = Array(5).fill(true)
            let numCorrect = 0
            guess.split('').forEach((c, i) => {
                if (!word.includes(c)) {
                    processed[i] = true
                    this.charStatus[c] = "keyDark"
                    this.guessStatus[this.currentGuess][i] = "guessGray"
                } else if (word[i] === c) {
                    processed[i] = true
                    available[i] = false
                    numCorrect++
                    this.charStatus[c] = "keyGreen"
                    this.guessStatus[this.currentGuess][i] = "guessGreen"  
                }
            })

            if (numCorrect === 5)
                this.haveWon = true

            guess.split('').forEach((c, i) => {
                if (!processed[i]) {
                    if (word.some((c2, j) => {
                        if (i !== j && available[j] && c2 === c) {
                            available[j] = false
                            return true
                        }
                        return false
                    })) {
                        if (this.charStatus[c] === "keyLight") {
                            this.charStatus[c] = "keyYellow"
                        }
                        this.guessStatus[this.currentGuess][i] = "guessYellow"
                    } else {
                        this.guessStatus[this.currentGuess][i] = "guessGray"
                    }
                }
            })
            this.notifyObservers({newStatus: this.charStatus, newGuessStatus: this.guessStatus})
            this.currentGuess++
        } else if (guess.length < 5) {
            this.notifyObservers({error: "Not enough letters"})
        } else {
            this.notifyObservers({error: "Not in word list"})
        }
    }

    addObserver(obs) {
        this.observers = [...this.observers, obs]
        return () => this.removeObserver(obs)
    }

    addObservers(listToAdd) {
        this.observers = [...this.observers, ...listToAdd]
        return () => this.removeObservers(listToAdd)
    }

    removeObserver(obs) {
        this.observers = this.observers.filter(o => o !== obs)
    }

    removeObservers(listToRem) {
        this.observers = this.observers.filter(obs => !listToRem.includes(obs))
    }

    notifyObservers(payload) {
        this.observers.forEach(obs => obs(payload))
    }
}

export default Game