<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

//Load Composer's autoloader
require 'vendor/autoload.php';
class Email
{
    public function mail($email, $token, $option)
    {
        $mail = new PHPMailer(true); // Passing `true` enables exceptions
        try {
            //Server settings
            $mail->SMTPDebug = 0; // Enable verbose debug output
            $mail->isSMTP(); // Set mailer to use SMTP
            $mail->Host       = 'smtp.gmail.com'; // Specify main and backup SMTP servers
            $mail->SMTPAuth   = true; // Enable SMTP authentication
            $mail->Username   = 'darshangangadhar@gmail.com'; // SMTP username
            $mail->Password   = 'darshu@4150'; // SMTP password
            $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
            $mail->Port       = 587; // TCP port to connect to

            //Recipients
            $mail->setFrom('darshangangadhar@gmail.com', 'Suman');
            $mail->addAddress($email); // Add a recipient

            //Content
            $mail->isHTML(true); // Set email format to HTML

            if ($option == 1) {
                $mail->Subject = "Account activation link";
                $url1          = " http://" . $_SERVER['SERVER_NAME'] . ":4200" . "/account_activate";
                $body          = "<div>Click the activation link to activate the account. <br>" . "<a href=" . $url1 . "?token=" . $token . " > " . $url1 . "</a><br><br></p>Thanks and Regards,<br> Suman</div>";
            } else if ($option == 2) {
                $mail->Subject = "Reset Password link";
                $url1          = " http://" . $_SERVER['SERVER_NAME'] . ":4200" . "/resetPassword";
                $body          = "<div>Click here to reset your password <br>" . "<a href=" . $url1 . "?token=" . $token . " > " . $url1 . "</a><br><br></p>Thanks and Regards,<br> Suman</div>";
            }

            $mail->Body = $body;
            $mail->send();

            $data = array(
                "status" => "200",
            );
            print json_encode($data);

        } catch (Exception $e) {
            $data = array(
                "status" => "500",
            );
            print json_encode($data);
        }
    }
}
