<?php
// add code to change the password from the database
//require 'database.php';
session_start();
if(isset($_GET['email']) && !empty($_GET['email']) AND isset($_GET['hash']) && !empty($_GET['hash'])){
    $conn =0;
    $email = $conn->escape_string($_GET['email']);
    $hash = $conn->escape_string($_GET['hash']);
    $result = $conn->query("SELECT * FROM users_account WHERE email= '$email' AND hash = '$hash'");
    if($result->num_rows == 0) {
        //display message for invalid URL
    }
}
else {
    //error message
}
?>
<!DOCTYPE>
<html>
<head>
    <link href="css/alexandria.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="js/js.js"></script>
</head>
<title>Reset Password</title>
<div class="header">
    <div class="header-logo">
        <div class = "forgot-logo">
            <img src="img/logo.3.png" alt="Logo" class="logo">
        </div>
    </div>
</div>
<form action="reset-password.php" method="post">
    <div class = "form">
        <div class="tab-content">
            <div id="forgot">
                <h1>Reset Password</h1>
                <form action = "/" method = "post">
                    <div class ="field-wrap">
                        <label>
                            <input name="new-password" type = "password" placeholder="New Password"required autocomplete="off"/>
                        </label>
                        <label>
                            <input name="confirm-password" type = "password" placeholder="Confirm Password"required autocomplete="off"/>
                        </label>
                    </div>
                    <div class = "forgot-button">
                        <button class = "button button-block" type="submit"/>Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</html>