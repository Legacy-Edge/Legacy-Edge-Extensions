/**
 * @type {MessagePort}
 * */
var port = browser.runtime.connectNative("EdgeExtensionsHostService");
port.onMessage.addListener((msg) => {
    try {
        const data = JSON.parse(msg);
        const type = data["type"];
        const guid = data["guid"];
        try {

            switch (type) {
                case "method_call":
                    const msg = {
                        "type": "method_call_response",
                        "guid": guid,
                        "data": Function(data["code"])()
                    }
                    port.postMessage(JSON.stringify(msg));
                    break;
            }

        } catch (ex) {
            ReturnException(ex, guid);
        }
    } catch (e) {
        
    }
});
/**
 * 
 * @param {Error} ex
 * @param {any} guid
 */
function ReturnException(ex, guid) {
    const msg = {
        "type": "exception",
        "guid": guid,
        "exception": {
            "message": ex.message,
            "description": ex.description,
            "stack": ex.stack
        }
    }
    port.postMessage(JSON.stringify(msg));
}

port.onDisconnect.addListener(() => {

});
// port.postMessage("Hallo!");
console.info("Extension started! x");
