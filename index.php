<?php
//require_once 'database.php';
if (isset($_POST['submit'])) {
    $conn =0;
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    if (isset($_POST['email'])) {
        $row = mysqli_fetch_array(mysqli_query($conn, "SELECT COUNT(*) AS cntUser FROM users_account WHERE email='" . $email . "' AND password='" . $password . "'"));
        if ($row['cntUser'] > 0) {
            $_SESSION['email'] = $email;
            $_SESSION['loggedin'] = true;
            header('Location: mainpage.php');
        } else {
            echo "Invalid username and password";
//             add something here to make it looks more professional
        }
    }
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
        header("Location: mainpage.php");
    }
}
?>
<!DOCTYPE>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Alexandria | World Largest Library</title>
    <script type="text/javascript" src="js/js.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/alexandria.css" type="text/css" rel="stylesheet"/>
</head>
<body>
<div class="form-login">
    <img src="img/logo.png" alt="Logo" class="logo" style="width:6.5cm; height:8cm; padding-left: 70px;">
    <div class="info-login" id="login">
        <form method='post' autocomplete="off">
                <input type="email" placeholder="Email" name="email" required><br/>
                <input type="password" placeholder="Password" name="password" required>
            <button class="signin-button" type="submit" name="submit">Sign In</button></form>
            <label>
                <input type="checkbox" checked="checked" name="remember"> Remember me
            </label>
            <div class="aNeedhelp" data-reactid="18">
                <a href="forgot.php" style="color: black">Forgot password</a>
                <a href="register.php"style="color: black">Create new account</a>
            </div>
        </form>
    </div>
</div>
</body>
</html>