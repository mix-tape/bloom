<?php

// --------------------------------------------------------------------------
//  Super simple email sender
// --------------------------------------------------------------------------

$send_to = "ryanberry@iinet.net.au";

// richard@celsiusproperty.com.au, jane@celsiusproperty.com.au, steve@giorgigroup.com.au, info@idgroup.com.au

$send_subject = "Bloom enquiry";

$f_name = cleanupentries($_GET["firstname"] . ' ' . $_GET["lastname"]);
$f_email = cleanupentries($_GET["email"]);
$f_phone = cleanupentries($_GET["phone"]);


function cleanupentries($entry) {
    $entry = trim($entry);
    $entry = stripslashes($entry);
    $entry = htmlspecialchars($entry);

    return $entry;
}

$message = "This enquiry was submitted on " . date('m-d-Y') .
"\n\nName: " . $f_name .
"\n\nE-Mail: " . $f_email .
"\n\nPhone: " . $f_phone;

$send_subject .= " - {$f_name}";

$headers = "From: " . $f_email . "\r\n" .
    "Reply-To: " . $f_email . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

file_put_contents('entries/' . date('l jS F Y h:i:s A') . '.txt', $message);

if (!$f_email) {
    echo "no email";
    exit;
}else if (!$f_name){
    echo "no name";
    exit;
}else{
    if (filter_var($f_email, FILTER_VALIDATE_EMAIL)) {
        if (mail($send_to, $send_subject, $message, $headers)) {
            echo "Email sent!";
        }
    }else{
        echo "invalid email";
        exit;
    }
}

?>
