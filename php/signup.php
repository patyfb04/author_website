<?php
$to ="patyfb04@gmail.com";
$subject = "Patricia Braga Author Website - Subscription";
$from = $_POST['email'];;
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <'+$from+'>' . "\r\n";

$email = "";
mail($to,$subject, " The email " + $from + " subscribed to receive news, content from the Patricia Braga Author Website");

?>