
<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
// require "phpmailer/mailer.php";
require "/var/www/html/codeigniter/application/Service/jwt.php";
include "/var/www/html/codeigniter/application/RabbitMQ/send.php";
include "/var/www/html/codeigniter/application/Service/AccountService.php";
class AccountController extends CI_Controller
{
    public $AccountServiceRef;
    public function __construct()
    {
        parent::__construct();
        $this->AccountServiceRef = new AccountService();
    }
    /**
     * @method Registration()
     * @Description - Store the user information in database.
     */
    public function Registration()
    {
        /**
         * Receive data from front end as POST method
         */
        $username = $_POST["name"];
        $password = $_POST["pass"];
        $phno     = $_POST["phno"];
        $email    = $_POST["email"];
        return $this->AccountServiceRef->Registration($username, $password, $phno, $email);
    }
    public function SocialLogin()
    {
        $email    = $_POST['email'];
        $username = $_POST['name'];
        $image    = $_POST['image'];
        $this->AccountServiceRef->SocialLogin($username, $email, $image);
    }
    /**
     * @method Login()
     * @Description - Check email and password is in database or not and give access for login.
     * @var string
     * @var string
     */
    public function Login()
    {

        $email    = $_POST["email"];
        $password = $_POST["pass"];

        return $this->AccountServiceRef->Login($email, $password);
    }

    /**
     * @method forgotpassword()
     * @Description - Sends the reset password link to the registered mail ID.
     * @var string
     */
    public function forgotpassword()
    {
        $email = $_POST['email'];
        return $this->AccountServiceRef->forgotpassword($email);
    }
    /**
     * @method getmailid()
     * @Description -Used to get email ID from the Database based on the token to display
     * on frontend
     * @var string
     * @var string
     */
    public function getmailid()
    {
        $token  = $_POST['token'];
        $option = $_POST['option'];
        return $this->AccountServiceRef->getmailid($token, $option);
    }
    /**
     * @method resetpassword()
     * @Description - - Changes the password in database based on token.
     * @var string
     * @var string
     */
    public function resetpassword()
    {
        $password = $_POST['password'];
        $token    = $_POST['token'];
        return $this->AccountServiceRef->resetpassword($password, $token);
    }
}
