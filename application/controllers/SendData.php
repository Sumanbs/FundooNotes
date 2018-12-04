<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

require "/var/www/html/codeigniter/application/Service/jwt.php";
include "/var/www/html/codeigniter/application/Service/SendDataService.php";

class SendData
{

    public $SendDataServiceRef;
    public function __construct()
    {
        $this->SendDataServiceRef = new SendDataService();
    }

    public function sendData()
    {
        $this->SendDataServiceRef->sendData();
    }
}
