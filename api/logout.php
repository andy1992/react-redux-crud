<?php

if(session_status() == PHP_SESSION_NONE)
    session_start();

session_destroy();

$callback = 'callback';
if(isset($_REQUEST['callback']))
    $callback = $_REQUEST['callback'];

echo $callback . "('ok')";