<?php
/**
 * **************************************
 * @Description -Demonstration of rest API
 * ***************************************
 */
header('Access-Control-Allow-Origin: *');

require "phpmailer/mailer.php";
require "jwt.php";
class AccountAPI
{
    /**
     * @var PDO
     */
    public $connect = null;
    public function __construct()
    {
        try {
            $this->connect = new PDO("mysql:host=localhost;dbname=Fundoo", "root", "root");
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
    /**
     * @insertdata - Add data to database
     * @var string
     * @var string
     * @var array
     * @var int
     */
    public function Registration()
    {
        /**
         * Receive dat from front end
         */
        $username = $_POST["name"];
        $password = $_POST["pass"];
        $phno     = $_POST["phno"];
        $email    = $_POST["email"];

        $headers = apache_request_headers();

        if (AccountAPI::checkEmail($email)) {
            /**
             * Store the query in string format.
             */
            $sql  = "INSERT INTO Registration(username,email,password,phonenumber)VALUES('$username','$email','$password',$phno)";
            $stmt = $this->connect->prepare($sql);
            /**
             * Check for the successful execution of the querry.
             * Return JSON Data to subscribers
             */
            if ($stmt->execute()) {
                $token   = md5($email);
                $options = 1;
                $ref     = new Email();
                $ref->mail($email, $token, $options);
                $query     = "Update Registration set token = '$token' where email = '$email'";
                $statement = $this->connect->prepare($query);
                $statement->execute();
            } else {
                $data = array(
                    "status" => "400",
                );
                print json_encode($data);
            }
        } else {
            $data = array(
                "status" => "406",
            );
            print json_encode($data);
        }
    }
    /**
     * @method checkEmail
     * @param string
     * Check whether email exists or not.
     */
    public function checkEmail($email)
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
            while (($arr1['email'] == $email)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Check email and password is in database or not.
     */
    public function Login()
    {
        $email    = $_POST["email"];
        $password = $_POST["pass"];
        if (AccountAPI::chekUsernamePassword($email, $password)) {
            $ref  = new JWT();
            $jwt  = $ref->createJwtToken($email);
            $data = array(
                "jwt"    => $jwt,
                "status" => 200,
            );
            print json_encode($data);
        } else {
            $data = array(
                "status" => "401",
            );
            print json_encode($data);
        }
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
        $email     = $_POST['email'];
        $ref       = new Email();
        $query     = "SELECT status FROM Registration where email = '$email'";
        $statement = $this->connect->prepare($query);
        $statement->execute();
        $arr = $statement->fetch(PDO::FETCH_ASSOC);
        /**
         * checks email is present in DB or not.
         */
        if (!(AccountAPI::checkEmail($email)) && $arr['status'] == "ok") {

            $token = md5($email);
            $ref->mail($email, $token, 2);
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
