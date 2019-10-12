<?php
session_start();
//require 'database.php';
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $conn =0;
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $result = $conn->query("SELECT * FROM users_account WHERE email = '$email'");
    if($result->num_rows == 0){
    }
    else {
        $user = $result->fetch_assoc();
        $email = $user['email'];
        $hash = $user['hash'];
    }
}
?>
<!DOCTYPE>
<html>
<head>
    <link href="css/alexandria.css" type="text/css" rel="stylesheet"/>
    <script type="text/javascript" src="js/js.js"></script>
</head>
<title>Reset Password</title>
<img src="img/logo.3.png" alt="Logo" class="logo">
<form action="forgot.php" method="post">
    <div class = "forgot">
        <h1>Reset Password</h1>
        <form action = "/" method = "post">
            <div class ="field-wrap">
                <label>
                    <input name="email" type = "email" placeholder="Enter Email Address"required autocomplete="off"/>
                </label>
            </div>
            <div class = "forgot-button">
                <button class = "signin-button" type="submit"/>Email Me</button>
            </div>
        </form>
    </div>
</form>
</html>