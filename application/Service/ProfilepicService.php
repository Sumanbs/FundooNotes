<?php
header('Access-Control-Allow-Origin: *');
include "/var/www/html/codeigniter/application/Static/DBConstants.php";
class ProfilepicService
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
    }
    /**
     * @method fetchImage() fetch the user profile pic
     * @return void
     */
    public function fetchImage($email)
    {
        /**
         * @var string $query has query to select the profile pic of the user
         */
        $query     = "SELECT profilepic FROM registration where email='$email'";
        $statement = $this->connect->prepare($query);
        if ($statement->execute()) {

            $arr = $statement->fetch(PDO::FETCH_ASSOC);
            /**
             * returns json array response
             */
            print json_encode(base64_encode($arr['profilepic']));

        }

    }
    /**
     * @method saveImage() upload the profile pic
     * @return void
     */
    public function saveImage($image, $email)
    {

        $file = base64_decode($image);
        /**
         * @var string $query has query to update the user profile pic
         */
        $query     = "UPDATE Registration SET `profilepic` = :file where `email`= :email ";
        $statement = $this->connect->prepare($query);
        if ($statement->execute(array(
            ':file'  => $file,
            ':email' => $email,
        ))) {

            $ref = new ProfilepicService();
            $ref->fetchImage($email);
        } else {
            $data = array(
                "message" => "203",
            );
            print json_encode($data);
        }
    }
}
