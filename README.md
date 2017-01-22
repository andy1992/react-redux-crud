##REACT REDUX CRUD
A simple CRUD application in React+Redux, with PHP serving the API, and MySQL Database.

![alt tag](http://i66.tinypic.com/iftzjb.png)

##Installation
####1. Clone the project or download the .zip file. Put it inside your local web root directory.
Since this project used PHP as the API, you could put the project inside your PHP web server root directory.

```sh
$ git clone https://github.com/andy1992/react-redux-crud.git
```

####2. Install dependencies
```sh
npm install
```

####3. Import the database from /database directory to your MySQL Database
Since the project used MySQL Database, you could find the exported database on the /database directory, and import it to your MySQL Database.

####4. Setup config based on your environment on the config/database.php
Set the hostname, database name, username, and password based on your database configuration.

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

```php

<?php

//...

header('Access-Control-Allow-Origin: http://localhost:8000');

//...

?>

```

####6. Setup API Endpoint in public/src/helpers/Constant.js.
Set the API Endpoint to be used in the react app.

```js

export const API_ENDPOINT = 'http://localhost:8000/react-redux-crud/api';

```

####7. Run the app

```sh
webpack-dev-server --history-api-fallback
```