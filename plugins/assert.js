function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

function getCurrentFile(){
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length-1].getAttribute('src');
};

var Assert = function(condition){
    return getCurrentFile();
};