
console.info("Extensions loaded!");

const inject = document.createElement("script");
inject.innerHTML = `

class MediaQueryListReturn {
    /**
     * 
     * @param {string} media
     * @param {boolean} matches
     */
    constructor(media, matches) {
        /**
         * @type {string}
         * */
        this.media = media;
        /**
         * @type {boolean}
         * */
        this.matches = matches;
    }
    /**
     * @returns {((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null}
     * */
    onchange() {

    }
    /**
     * @deprecated
     * @param {((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null} listener
     * @returns {void}
     * */
    addListener(listener) {

    }
    /**
     * @deprecated
     * @param {((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null} listener
     * @returns {void}
     * */
    removeListener(listener) {

    }
    /**
     * 
     * @param {string} type
     * @param {boolean | AddEventListenerOptions} options
     * @returns {void}
     */
    addListener(type, options) {

    }
    addEventListener(type, options) {

    }
    /**
     * 
     * @param {string} type
     * @param {boolean | AddEventListenerOptions} options
     * @returns {void}
     */
    removeEventListener(type, options) {

    }
}

window.matchMediaOld = window.matchMedia;

/**
 * 
 * @param {string} query
 * @returns {MediaQueryList}
 */
window.matchMedia = function (query) {
    const caseInsensitiveQuery = query.toLocaleLowerCase();
    if (caseInsensitiveQuery.includes("prefers-color-scheme")) {
        let matches = false;
        if (caseInsensitiveQuery.includes("dark")) {
            matches = true;
        } else {
            matches = false;
        }
        return new MediaQueryListReturn(query, matches);
    } else {
        return matchMediaOld(query);
    }
}
`;

top.document.querySelector("html").appendChild(inject);