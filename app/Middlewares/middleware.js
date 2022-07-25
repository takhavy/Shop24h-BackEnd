const middlewareApp = (request, response, next) => {
    console.log("Method: " + request.method + ", Url: " + request.url + ", Time: " + new Date())
    next()
}
module.exports = middlewareApp;
