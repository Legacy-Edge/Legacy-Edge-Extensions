
console.info("Extensions loaded!");

loadLocalScript("dark_mode");
loadLocalScript("polyfill");
loadLocalScript("custom-elements");
// loadRemoteScript("https://unpkg.com/@webcomponents/custom-elements");

window.addEventListener("load", () => {
    console.info("GitHub LazyLoading");
    const scripts = document.querySelectorAll("script");
    scripts.forEach((ele) => {
        if (ele.hasAttribute("data-src")) {
            ele.setAttribute("src", ele.getAttribute("data-src"));
            console.log(ele);
        }
    });
});

/**
 * Loads a local pollyfill
 * @param {string} name
 * @returns {void}
 */
async function loadLocalScript(name) {
    try {
        const basePath = `ms-browser-extension://${browser.runtime.id}/`;
        const jsContent = await fetch(`${basePath}content/inject/${name}.js`).then((x) => x.text());
        const ele = document.createElement("script");
        ele.setAttribute("data-extension-name", name);
        ele.innerHTML = jsContent;
        top.document.querySelector("html").appendChild(ele);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Loads a remote pollyfill
 * @param {string} src
 * @returns {void}
 */
function loadRemoteScript(src) {
    try {
        const ele = document.createElement("script");
        ele.src = src;
        top.document.querySelector("html").appendChild(ele);
    } catch (e) {
        console.error(e);
    }
}