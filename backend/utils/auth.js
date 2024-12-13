function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // Send a 401 response with a message
    res.status(401).json({ message: 'You need to log in first.' });
}

module.exports = { isAuthenticated };

/*
 module.exports: In Node.js, module.exports is the object that a file returns when it is required (or imported) in another file. By default, it's an empty object, but you can attach functions, objects, or other data to it so they can be used in other files.
  
 Exporting as an Object: { isAuthenticated } is shorthand for { isAuthenticated: isAuthenticated } in JavaScript. It creates an object where the key is isAuthenticated (the property name) and the value is the isAuthenticated function itself. This allows other files to access it by its property name.
 */