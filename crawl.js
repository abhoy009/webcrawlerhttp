function normalizeURL(urlString) {
    const urlObject = new URL(urlString);
    const hostPath =  `${urlObject.host}${urlObject.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1)
    } else {
        return hostPath;
    }
    
}

module.exports = {
    normalizeURL
}