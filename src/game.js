import _ from 'underscore'
import { saveGame } from './firebaseUtils';
import { getWord, VALID_WORDS } from './utils';

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split('')

class Game {
    constructor() {
        this.currentGuess = 0
        this.guesses = ["", "", "", "", "", ""]
        this.guessStatus = Array.from({length: 6}, () => Array(5).fill("guessEmpty"))
        //this.word = _.sample(VALID_WORDS)
        this.word = getWord()
        this.charStatus = {}
        ALPHABET.forEach(c => this.charStatus[c] = "keyLight")
        this.observers = []
        this.haveWon = false
    }

    sync(state) {
        this.guesses = [...state.guesses]
        const currentGuess = state.guesses.filter(str => str != "").length
        for (const i of Array(currentGuess).keys()) {
            this.currentGuess = i
            this.validate()
          }
        this.currentGuess = currentGuess
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
            saveGame(this.guesses)
        } else if (guess.length < 5) {
            this.notifyObservers({error: "För få bokstäver"})
        } else {
            this.notifyObservers({error: "Kan inte hitta ordet"})
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