<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

include "/var/www/html/codeigniter/application/Static/DBConstants.php";
class SendDataService extends CI_Controller
{
    public function __construct()
    {
        $DBConstantReference = new DBConstants();
        try {
            $this->connect = new PDO("mysql:host=$DBConstantReference->host;dbname=$DBConstantReference->DatabaseName", "$DBConstantReference->username", "$DBConstantReference->password");
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
        parent::__construct();
    }
    public function sendData()
    {
        /**
         *Get data from Redis
         */
        $this->load->library('Redis');
        $redis = $this->redis->config();
        $email = $redis->get('email');
        $data  = array(
            "email" => $email,
        );
        print json_encode($data);
    }
}
