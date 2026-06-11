cors and helmet not setup because of time limit

used transformers for normalizing json response

used validators for data validation


using only single route in main index.js file
    i would devide different routes based on modules and put those route is their own files
    ever router will call a controller and its specific method
        this controller method will handle request as done in MVC application


calling weather api directly in indexjs 
    i would have kept 3rd party apis in differnt files for each module inside apis folder 



Error and exception handling
    using try catch to handle expception and errors
        every try will have different catch statements for diff exceptions or errors


will setup nodemon in devleopment for module bundling and hot reloading