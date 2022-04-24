import { getCookieID, getDate } from "./utils"
import firebase from "firebase/app"
require("firebase/database")

async function updateStats(numGuesses = 0) {
    const id = getCookieID()
    increase("Global/numPlayers")
    if (numGuesses == 0) {
        increase("Users/" + id + "/numLost")
        increase("Global/numLost")
    } else {
        increase("Users/" + id + "/" + numGuesses)
        const date = await read("Global/currentDate")
        if (date == getDate()) {
            increase("Global/numWon")
            increase("Global/numTries", numGuesses)
        } else {
            getRef("Global").set({currentDate: getDate(), numPlayers: 1, numTries: numGuesses})
        }
    }
}

async function getUserStats() {
    const id = getCookieID()
    try {
        const data = await read("Users/" + id)
        if (data) {
            return {stats: [data["1"], data["2"], data["3"], data["4"], data["5"], data["6"]], numLost: data.numLost}
        }
        return {stats: Array(6).fill(0), numLost: 0}
    } catch (e) {
        return console.log(e)
    }
    
    
}

async function getGlobalStats() {
    try {
        const global = await read("Global")
        return ({ avarageClear: global.numWon / global.numPlayers, avarageTries: global.numTries / global.numWon })
    } catch (e) {
        return console.log(e)
    }
}

async function syncGame() {
    const id = getCookieID()
    const date = await read("Global/currentDate")
    if (date != getDate()) {
        getRef("Games/Users/" + id).remove()
        return null
    }
    const state = await read("Games/Users/" + id)
    if (state) {
        return {guesses: Object.keys(state).map(key => state[key])}
    }
    return null;
}

async function saveGame(state) {
    const id = getCookieID()
    getRef("Games/Users/" + id).set(state)
}

function getRef(path) {
    return firebase.database().ref(path)
}

async function read(path) {
    try {
        const snapshot = await getRef(path).get()
        return snapshot.val()
    } catch (e) {
        return console.log(e)
    }
}

function modify(path, func) {
    return getRef(path).transaction(func)
}

function increase(path, by = 1) {
    return modify(path, count => count + by)
}

export {updateStats, getGlobalStats, syncGame, getUserStats, saveGame}