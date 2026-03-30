<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Define the recipient email address
    $to = "lethomea@gmail.com"; 
    $subject = "New Contact Form Submission";
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Prepare the email content
    $email_content = "<h2>Contact Form Submission</h2>";
    $email_content .= "<p><strong>Name:</strong> $name</p>";
    $email_content .= "<p><strong>Email:</strong> $email</p>";
    $email_content .= "<p><strong>Message:</strong> $message</p>";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "<h3>Thank you for contacting us. Your message has been sent.</h3>";
    } else {
        echo "<h3>Sorry, there was an error sending your message. Please try again later.</h3>";
    }
}
?>
