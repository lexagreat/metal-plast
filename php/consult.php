<?php
error_reporting(E_ALL);
$name = $_POST['name2'];
$email = $_POST['email2'];
$phone = $_POST['phone2'];
$comment = $_POST['comment2'];
$file = $_POST['file2'];

$to = '9608798010@mail.ru'; //твой имэйл
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