<?php

require_once 'connection.php';
include 'sanitization.php';


if (isset($_POST["type"])) {
    $type = sanitizeMYSQL($connection, $_POST["type"]);
    switch ($type) {
        case "login": //validate user login creditials
            $username = sanitizeMYSQL($connection, $_POST['username']);
            $password = md5(sanitizeMYSQL($connection, $_POST['password']));
            $SQL = "SELECT Customer.ID FROM Customer WHERE Customer.ID='" . $username . "' AND Customer.Password='" . $password . "'";
            $result = mysqli_query($connection, $SQL);
            if($result) {
                $row_count = mysqli_num_rows($result);
                if ($row_count == 1) {
                    $row = mysqli_fetch_array($result);
                    processResult($row['ID']);
                    echo "success";
                    return;
                }

            }
            echo "fail";
        break;

    }
}

//on successful login, begin session
function processResult($id)
{
    session_start();
    $_SESSION['ID'] = $id;
    $_SESSION['start'] = time();
    ini_set('session.use_only_cookies', 1);


}
