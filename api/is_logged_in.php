<?php

header('content-type: text/javascript');
header("access-control-allow-origin: *");
// include core configuration
include_once '../config/core.php';

// include database connection
include_once '../config/database.php';

include_once '../objects/user.php';

if(session_status() == PHP_SESSION_NONE)
    session_start();

// set product property values
$msg = 'false';
$u = null;
if(isset($_SESSION['id'])) {
    $msg = "true";
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    $user->id = $_SESSION['id'];
    $u = $user->readOne();
}

$result = [
    'message'   => $msg,
    'user'      => $u
];

//echo json_encode($result);

$callback = 'callback';
if(isset($_REQUEST['callback'])) {
    $callback = $_REQUEST['callback'];
}

$x = json_decode($u);

if($u != null)
    echo $callback . "({'message': \"$msg\", 'user': {'id':".$x[0]->id.",'email':\"".$x[0]->email."\"}})";
else
    echo $callback . "({'message': \"$msg\", 'user': null})";