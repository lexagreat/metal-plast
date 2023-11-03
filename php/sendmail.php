<?php
error_reporting(E_ALL);
$name = $_POST['name'];
$email = $_POST['email'];

$to = ''; //твой имэйл
$subject = 'Тема письма';
$message = 'Текст письма';
$headers = 'From: '. $email . "\r\n" .
    'Reply-To: '. $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$send = mail($to, $subject, $message, $headers);

if($send) {
    echo("<script>alert('success');</script>");
    // header("Refresh: 1, url=../index.html");
}
?>