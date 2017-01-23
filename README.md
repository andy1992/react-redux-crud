##REACT REDUX CRUD
A simple CRUD application in React+Redux, with PHP serving the API, and MySQL Database.

This project features some of basic functionalities such as:
- User registration
- User authentication
- Basic CRUD functionalities + multiple data deletion
- Pagination, sorting, and data filtering

![alt tag](http://i66.tinypic.com/iftzjb.png)

##Installation
####1. Clone the project or download the .zip file. Put it inside your local web root directory.
Since this project used PHP as the API, you could put the project inside your PHP web server root directory.

```sh
$ git clone https://github.com/andy1992/react-redux-crud.git
```

####2. Install dependencies
Install dependencies using npm
```sh
npm install
```

####3. Import the database from /database directory to your MySQL Database
Since the project used MySQL Database, you could find the exported database on the database directory, and import it to your MySQL Database.

####4. Setup config based on your environment on the config/database.php
Set the hostname, database name, username, and password based on your MySQL database configuration.

```php

class Database{
    private $host = "localhost";
    private $db_name = "react-crud";
    private $username = "root";
    private $password = "secret";
    public $conn;

    //...
}
```

####5. Setup allow access content origin
Set the allow access content origin options in config/core.php, to allow the app to access the API.
Of course for the sake of simplicity / development purpose, you could always set the header to *.

#####config/core.php
```php

<?php

//...

header('Access-Control-Allow-Origin: *');

//...

?>

```

####6. Setup API Endpoint in public/src/helpers/Constant.js.
Set the API Endpoint to be used in the react app, based on your PHP server host and port.

```js

export const API_ENDPOINT = 'http://localhost:8888/react-redux-crud/api';

```

####7. Run the app

#####7.1. Development
Run webpack dev server from your terminal / command prompt.
```sh
webpack-dev-server --history-api-fallback
```

#####7.2. Production
Turn off the webpack dev server configuration in webpack.config.js
```js
    entry: [
        //'webpack-dev-server/client?http://127.0.0.1:8080/',
        //'webpack/hot/only-dev-server',
        './public/src/main.js'
    ]
```

Build the bundle.js and index.html.
```sh
npm run build
```

Run the app:
```sh
npm start
```