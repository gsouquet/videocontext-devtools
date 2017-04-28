function retrieveJson() {
    var clientFunctionName = "__GET_VIDEOCONTEXT_JSON__"
    var tempAttrName = "tmp_json"
    var tempScriptId = "tmpScript"

    var ret = {};

    var scriptContent = "";
    scriptContent += "if (typeof " + clientFunctionName + " !== 'undefined') document.body.setAttribute('" + tempAttrName + "', JSON.stringify(" + clientFunctionName + "()));\n"

    var script = document.createElement('script');
    script.id = tempScriptId;
    script.appendChild(document.createTextNode(scriptContent));
    (document.body || document.head || document.documentElement).appendChild(script);

    if (document.body.hasAttribute(tempAttrName)) {
        var json = JSON.parse(document.body.getAttribute(tempAttrName));
        document.body.removeAttribute(tempAttrName);
        document.body.removeChild(document.getElementById(tempScriptId))
        return json
    } else {
        return null
    }
}

chrome.runtime.onMessage.addListener(() => {
    chrome.runtime.sendMessage({
        type: "contentscriptSendingJSON",
        payload: retrieveJson(),
    })
})
