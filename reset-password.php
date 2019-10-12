<?php
//require 'database.php';
session_start();
if($_SERVER['REQUEST_METHOD'] == 'post'){
    if($_POST['new-password'] == $_POST['confirm-password']){
        $new_pass = password_hash($_POST['new-password'], PASSWORD_BCRYPT);
        $conn =0;
        $email = $conn->escape_string($_POST['email']);
        $hash = $conn->escape_string($_POST['hash']);
        $sql = "UPDATE users_account SET password='$new_pass', hash = '$hash' WHERE email = '$email'";
        if ($conn->query($sql) === TRUE){
            $_SESSION['message'] = "Password reset successfully";
            header("location: index.php");
        }
        else{
            $_SESSION['message'] = "Passwords don't match, please try again.";
        }
    }
}
?>
