<?php
$to ="patyfb04@gmail.com";
$subject = "Patricia Braga Author Website - Contact Form";
$name =  $_POST['contact_name'];
$from =  $_POST['contact_email'];
$message =  $_POST['contact_message'];
$fullmessage = $name + " ("+ $from +") sent you the following message from the Patricia Braga Author Website: <br/>" + $message;

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <'+$from+'>' . "\r\n";

mail($to,$subject,$fullmessage,$headers);

?>