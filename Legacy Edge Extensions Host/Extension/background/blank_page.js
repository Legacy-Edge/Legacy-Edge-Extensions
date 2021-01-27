
console.info("Ready for listening!");

// Based on ideas of https://github.com/BernhardWebstudio/EdgeNewTab

function onTabActivated(info) {
    const id = info.tabId;
    browser.tabs.get(id, (tab) => {
        const url = tab.url;
        if (url.startsWith("https://www.msn.com/spartan/ntp")) {
            console.log(tab);
            browser.tabs.update(id, { "url": "https://bing.com" })
        }
    });
}
browser.tabs.onActivated.addListener(onTabActivated);