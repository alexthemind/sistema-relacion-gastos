

const Http = {
    host: window.location.origin == 'http://localhost:8080' ? 'http://localhost:8000' : window.location.origin,
    routes: {
        // routes here
    },
    get: function() {},
    post: function() {},
    patch: function() {},
    delete: function() {},
} 


export default Http