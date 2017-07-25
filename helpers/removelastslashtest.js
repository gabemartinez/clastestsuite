function removeTrailingSlash(site) {
    return site.replace(/\/$/, "");
}

console.log(removeTrailingSlash('http://google.com/'));
