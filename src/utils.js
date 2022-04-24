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

function generateCookie() {
    const expiration = new Date('January 1, 2030')
    return "id=" + Date.now().toString() + "; expires=" + expiration.toUTCString() + "; path=/;"
}

function parseCookie(str) {
    return str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
    }, {})
}

function getCookieID() {
    const cookie = parseCookie(document.cookie)
    return cookie.id
}

function getDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()

    return dd + '/' + mm + '/' + yyyy;
}

export {getWord, hash, generateCookie, getDate, getCookieID, VALID_WORDS}