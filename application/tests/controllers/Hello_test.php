<?php

include "/var/www/html/codeigniter/application/tests/controllers/TestConstants.php";
class AccountController_test extends TestCase
{
    public $TestConstsntsRef;
    public function __construct()
    {
        $this->TestConstsntsRef = new TestConstants();
    }
    public function test_login()
    {
        $testcases = file_get_contents("LoginTestCase.json", true);
        $testcases = json_decode($testcases, true);
        foreach ($testcases as $key => $value) {
            $email    = $value['email'];
            $password = $value['pass'];
            $ch       = curl_init($this->TestConstsntsRef->LoginURL);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "email=$email&pass=$password");
            $result   = curl_exec($ch);
            $response = json_decode($result, true);
            /**
             * email and password is not same
             */
            $actual = $response['status'];
            $res    = $this->assertEquals($value['expected'], $actual);
            curl_close($ch);
        }
    }
}
