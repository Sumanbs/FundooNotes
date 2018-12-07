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
            $email          = $value['email'];
            $password       = $value['pass'];
            $_POST['email'] = $email;
            $_POST['pass']  = $password;
            $ref            = new AccountController();
            $result         = $ref->Login();

            $res = $this->assertEquals($value['expected'], $result);
        }
    }
    public function test_registration()
    {
        $testcases = file_get_contents("RegistrationTestCase.json", true);
        $testcases = json_decode($testcases, true);

        foreach ($testcases as $key => $value) {
            $email    = $value['email'];
            $password = $value['pass'];
            $phno     = $value['phno'];
            $name     = $value['name'];

            $_POST['email'] = $email;
            $_POST['pass']  = $password;
            $_POST['phno']  = $phno;
            $_POST['name']  = $name;

            $ref    = new AccountController();
            $result = $ref->Registration();

            $res = $this->assertEquals($value['expected'], $result);
        }
    }
    public function test_ForgotPassword()
    {
        $testcases = file_get_contents("ForgotPasswordTestCase.json", true);
        $testcases = json_decode($testcases, true);
        foreach ($testcases as $key => $value) {
            $email          = $value['email'];
            $_POST['email'] = $email;
            $ref            = new AccountController();
            $result         = $ref->forgotpassword();
            $res            = $this->assertEquals($value['expected'], $result);
        }
    }
    public function test_resetpassword()
    {
        $testcases = file_get_contents("RestTestCases.json", true);
        $testcases = json_decode($testcases, true);
        foreach ($testcases as $key => $value) {
            $password = $value['pass'];
            $token    = $value['token'];

            $_POST['password'] = $password;
            $_POST['token']    = $token;

            $ref    = new AccountController();
            $result = $ref->resetpassword();
            $res    = $this->assertEquals($value['expected'], $result);
        }
    }
    public function test_getemailID()
    {
        $testcases = file_get_contents("RestTestCases.json", true);
        $testcases = json_decode($testcases, true);
        foreach ($testcases as $key => $value) {

            $token = $value['token'];

            $_POST['token'] = $token;

            $ref    = new AccountController();
            $result = $ref->getEmailD();
            $res    = $this->assertEquals($value['expected'], $result);
        }
    }

}
