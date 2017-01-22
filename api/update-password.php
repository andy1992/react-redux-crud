<?php
// if the form was submitted
if($_POST){

    // include core configuration
    include_once '../config/core.php';

    // include database connection
    include_once '../config/database.php';

    include_once '../objects/user.php';

    // class instance
    $database = new Database();
    $db = $database->getConnection();
    $user = new User($db);
    $user->id = $_POST['id'];
    $u = json_decode($user->readOne())[0];

    $result = 'true';
    if(is_null($_POST['old_password']) || empty($_POST['old_password'])) {
        $result = "The old password field is required.";
    } else if(!password_verify($_POST['old_password'], $u->password)) {
        $result = "The old password did not match.";
    }else if(is_null($_POST['password']) || empty($_POST['password'])) {
        $result = "The new password field is required.";
    } else if(password_verify($_POST['password'], $u->password)) {
        $result = "The new password must be different from your old password.";
    } else if(is_null($_POST['password_confirmation']) || empty($_POST['password_confirmation'])) {
        $result = "The new password confirmation field is required.";
    } else if($_POST['password_confirmation'] != $_POST['password']) {
        $result = "The new password confirmation did not match.";
    }else {
        $user->password = $_POST['password'];
        $result = $user->update();
    }

    echo $result;
}