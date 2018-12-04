<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

// require "phpmailer/mailer.php";
require "/var/www/html/codeigniter/application/Service/jwt.php";
include "/var/www/html/codeigniter/application/RabbitMQ/send.php";
include "/var/www/html/codeigniter/application/Service/AccountService.php";
include "/var/www/html/codeigniter/application/libraries/redis.php";
class AccountAPI extends CI_Controller
{

    public $AccountServiceRef;
    public function __construct()
    {

        $this->AccountServiceRef = new AccountService();
        parent::__construct();

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

        $this->AccountServiceRef->Registration($username, $password, $phno, $email);
    }
    public function facebookLogin()
    {
        $email    = $_POST['email'];
        $username = $_POST['name'];
        $image    = $_POST['image'];

        $this->AccountServiceRef->facebookLogin($username, $email, $image);
    }

    /**
     * @method Login()
     * @Description - Check email and password is in database or not and give access for login.
     * @var string
     * @var string
     */
    public function Login()
    {

        // $redis = $this->$redis->config();

        // $this->load->library('redis');
        // $redis = $this->redis->config();
        // $set   = $redis->set('name', $_POST['email']);
        // $get   = $redis->get('name');
        // echo $get;

        // $this->load->driver('cache', array('adapter' => 'apc', 'backup' => 'file', 'key_prefix' => 'my_'));
        // if ($this->cache->redis->is_supported() || $this->cache->file->is_supported()) {
        //     $var1 = $this->cache->get('name');
        // } else {
        //     $cache_var1 = $this->_model_data->get_var1();
        //     $this->cache->save('name', $cache_var1);
        // }
        $this->load->driver('cache', array('adapter' => 'apc', 'backup' => 'file'));
        $this->cache->save('name1', 'hgdfgd');
        if ($this->cache->get('name1')) {
            $testdata = $this->cache->get('name');
            echo $testdata;
// $this->cache->save('foo', $foo, 300);
        } else {

        }

        // $email    = $_POST["email"];
        // $password = $_POST["pass"];
        // $this->AccountServiceRef->Login($email, $password);
    }

    /**
     * @method  verifyJWT()
     * @Description - This method verifies the token is valid or not.
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
     * @method forgotpassword()
     * @Description - Sends the reset password link to the registered mail ID.
     * @var string
     */
    public function forgotpassword()
    {
        $email = $_POST['email'];
        $this->AccountServiceRef->forgotpassword($email);

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
        $this->AccountServiceRef->getmailid($token, $option);
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
        $this->AccountServiceRef->resetpassword($password, $token);
    }
}
