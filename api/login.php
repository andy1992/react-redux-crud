<?php

header('content-type: text/javascript');
header("access-control-allow-origin: *");

if(session_status() == PHP_SESSION_NONE)
    session_start();

if($_REQUEST){

    // include core configuration
    include_once '../config/core.php';

    // include database connection
    include_once '../config/database.php';

    // product object
    include_once '../objects/user.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);

    // set product property values
    $msg = 'true';
    $result = null;
    if(is_null($_REQUEST['email']) || empty($_REQUEST['email'])) {
        $msg = "The email field is required.";
    } else if(!filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL)) {
        $msg = "The email is invalid.";
    } else if(is_null($_REQUEST['password']) || empty($_REQUEST['password'])) {
        $msg = "The password field is required.";
    } else {
        $user->email = $_REQUEST['email'];
        $user->password = $_REQUEST['password'];
        $obj = $user->auth();
        $result = $obj;
        if($obj != null)
            $msg = 'true';
        else
            $msg = 'Invalid email / password';
    }

    /*$data = [
        'message'   => $msg,
        'user'      => $result
    ];

    echo json_encode($data);*/

    $callback = 'callback';
    if(isset($_REQUEST['callback'])) {
        $callback = $_REQUEST['callback'];
    }

    if($result != null) {
        echo $callback . "({'message': \"$msg\", 'user': {'id':".$result->id.",'email':\"".$result->email."\"}})";
    } else {
        echo $callback . "({'message': \"$msg\", 'user': null})";
    }
}