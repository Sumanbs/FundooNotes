<?php

header('Access-Control-Allow-Origin: *');

// require "phpmailer/mailer.php";
require "jwt.php";
include "/var/www/html/codeigniter/application/RabbitMQ/send.php";
include "/var/www/html/codeigniter/application/Service/AccountService.php";
class AccountAPI
{
    public $AccountServiceRef = null;
    public function __construct()
    {
        $this->AccountServiceRef = new AccountService();
    }

    public function Registration()
    {
        /**
         * Receive dat from front end
         */
        $username = $_POST["name"];
        $password = $_POST["pass"];
        $phno     = $_POST["phno"];
        $email    = $_POST["email"];

        $this->AccountServiceRef->Registration($username, $password, $phno, $email);
    }

    /**
     * Check email and password is in database or not.
     */
    public function Login()
    {
        $email    = $_POST["email"];
        $password = $_POST["pass"];
        $this->AccountServiceRef->Login($email, $password);

    }
    /**
     * @method  verifyJWT()
     * This method verifies the token is valid or not
     */
    public function verifyJWT()
    {
        $jwt   = $_POST["jwt"];
        $ref   = new JWT();
        $valid = $ref->verify($jwt);
        if ($valid) {
            $data = array(
                "status" => "200",
            );
            print json_encode($data);
        } else {
            $data = array(
                "status" => "500",
            );
            print json_encode($data);
        }
    }
    /**
     * @method chekUsernamePassword
     * @param $email string
     * @param $password string
     */
    public function chekUsernamePassword($email, $password)
    {
        $query     = "SELECT * FROM Registration ORDER BY id";
        $statement = $this->connect->prepare($query);
        /**
         * Execute the querry
         */
        $statement->execute();
        /**
         * Fetch the array of data one by one.
         * Check for whether the name exists or not.
         */
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($arr as $arr1) {
            while (($arr1['email'] == $email) && ($arr1['password'] == $password)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @Description - Sends the reset password link to the registered mail ID.
     */
    public function forgotpassword()
    {
        $email = $_POST['email'];
        // $ref       = new Email();
        $query     = "SELECT status FROM Registration where email = '$email'";
        $statement = $this->connect->prepare($query);
        $statement->execute();
        $arr = $statement->fetch(PDO::FETCH_ASSOC);
        /**
         * checks email is present in DB or not.
         */
        if (!(AccountAPI::checkEmail($email)) && $arr['status'] == "ok") {

            $token     = md5($email);
            $link      = "http://localhost:4200/resetPassword?token=" . $token;
            $emailBody = "Click here to Reset your Fundoo Account password " . $link;
            $obj       = new SendMail();
            $res       = $obj->sendEmail($email, 'Account Activation Link', $emailBody);

            if ($res == "Success") {
                $data = array(
                    "status" => "200",
                );
            } else {
                $data = array(
                    "status" => "400",
                );
            }
            print json_encode($data);

            $query     = "Update Registration set token = '$token' where email = '$email'";
            $statement = $this->connect->prepare($query);
            /**
             * Execute the querry
             */

            $statement->execute();
        } else {
            $data = array(
                "status" => "400",
            );
            print json_encode($data);
        }
    }
    /**
     * @getmailid -Used to get email ID from the Database based on the token
     */
    public function getmailid()
    {
        $token  = $_POST['token'];
        $option = $_POST['option'];
        if ($option == "reset") {
            $query     = "Select email from Registration where token = '$token'";
            $statement = $this->connect->prepare($query);
            /**
             * get mailID from Database.
             */

            if ($statement->execute()) {
                $arr = $statement->fetch(PDO::FETCH_ASSOC);

                if (!$arr) {
                    $data = array(
                        "error" => "Your session has been expired",
                    );
                } else {
                    $data = array(
                        "email" => $arr['email'],
                    );
                }
            } else {
                $data = array(
                    "error" => "Your session has been expired",
                );
            }
            print json_encode($data);
        } else if ($option == "activation") {
            $query     = "Update Registration set status = 'ok' where token = '$token'";
            $statement = $this->connect->prepare($query);
            $statement->execute();
            $query1     = "Update Registration set token = null where token = '$token'";
            $statement1 = $this->connect->prepare($query1);
            /**
             * Execute the querry
             */

            if ($statement1->execute()) {
                $data = array(
                    "status" => "200",
                );
            } else {
                $data = array(
                    "status" => "500",
                );
            }
            print json_encode($data);
        }
    }
    /**
     * @resetpassword - Changes the password in database based on token.
     */
    public function resetpassword()
    {
        $password  = $_POST['password'];
        $token     = $_POST['token'];
        $query     = "Update Registration set password = '$password' where token = '$token'";
        $statement = $this->connect->prepare($query);
        /**
         * Execute the querry
         */
        $statement->execute();
        $query1     = "Update Registration set token = null where token = '$token'";
        $statement1 = $this->connect->prepare($query1);
        if ($statement1->execute()) {
            $data = array(
                "status" => "200",
            );
        } else {
            $data = array(
                "status" => "500",
            );
        }
        print json_encode($data);
    }
}
