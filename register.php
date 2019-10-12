<?php
//require_once 'database.php';
$_SESSION['email'] = $_POST['email'];
$_SESSION['firstname'] = $_POST['firstname'];
$_SESSION['lastname'] = $_POST['lastname'];
if (isset($_POST['firstname'])) {
    $conn = 0;
    $first_name = mysql_entities_fix_string($conn, $_POST['firstname']);
    $last_name = mysql_entities_fix_string($conn, $_POST['lastname']);
    $email = mysql_entities_fix_string($conn, $_POST['email']);
    $pass = mysql_entities_fix_string($conn, $_POST['pass']);
    $token = mysql_entities_fix_string($conn, hash('ripemd128', $password));
    $query = "SELECT * FROM users_account WHERE email = '$emal'";
    if ($query->num_rows > 0) $error = "Email already registered";
    else
        $query = "INSERT INTO users_account(firstname, lastname, email, password, hash)"
            . "VALUES('$first_name', '$last_name', '$email', '$pass', '$token')";
    $result = $conn->query($query);
    if (!$result) die ("Database access failed: " . $conn->error);
}
// close sql connection
?>
<!DOCTYPE>
<html>
<head>
    <title>
        Sign Up
    </title>
    <link type="text/css" rel="stylesheet" href="css/alexandria.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<!--<div class="small-header">-->
<!--    <img src="img/logo.png" alt="Logo" class="logo" style="width:5cm; height:6.25cm;">-->
<!--</div>-->
<div class="header">
    <div class="header-logo">
        <div class="register-logo">
            <img src="img/logo.3.png" alt="Logo" class="logo">
        </div>
    </div>
</div>
<div class="message">
</div>
<div class="form">
    <div class="signup">
        <div class="register-text">
            <h1>
                Sign up
            </h1>
        </div>
        <form action="register.php" method="post">
            <label>
                <input type="text" placeholder="First name" name="firstname" required autocomplete="off">
            </label><br/>
            <label>
                <input type="text" placeholder="Last name" name="lastname" required autocomplete="off">
            </label><br/>
            <label>
                <input type="email" placeholder="Email" name="email" required autocomplete="off"/>
            </label><br/>
            <label>
                <input type="password" placeholder="New password" name="pass" required autocomplete="off">
            </label><br/>
            <button class="submit-button" type="submit" name="submit">Submit</button>
        </form>
    </div>
</div>
</body>
</html>