<?php
header('Access-Control-Allow-Origin: *');
require "jwt.php";

class ProfilePic extends CI_Controller
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
     * @method getImage()
     * @Description - This retrieves image url from DB
     */
    public function getImage()
    {
        $email     = $_POST['email'];
        $query     = "select profilepic from Registration where email = '$email'";
        $statement = $this->connect->prepare($query);
        if ($statement->execute()) {
            $arr = $statement->fetch(PDO::FETCH_ASSOC);
            print json_encode($arr);
        } else {
            $data = array(
                "status" => "401",
            );
            print json_encode($data);
        }
    }
    /**
     * Store the image on the server and store the image path on the database
     * @var string email
     */
    public function imageFile()
    {
        $email = $_POST['email'];
        $var   = move_uploaded_file($_FILES["file"]["tmp_name"], "profilepic/" . $_FILES["file"]["name"]);

        $filePath  = 'http://localhost/codeigniter/profilepic/' . $_FILES["file"]["name"];
        $query     = "update Registration set profilepic = '$filePath' where email ='$email'";
        $statement = $this->connect->prepare($query);
        if ($statement->execute()) {
            $data = array(
                "path" => $filePath,
            );
            print json_encode($data);

        } else {
            $data = array(
                "status" => "401",
            );
            print json_encode($data);
        }

    }
    public function SaveImageInDB()
    {
        $email     = $_POST['email'];
        $base64url = $_POST['base64url'];
        $query     = "update Registration set profilepicture = '$blob' where email ='$email'";
        $statement = $this->connect->prepare($query);
        if ($statement->execute()) {
            $data = array(
                "status" => "200",
            );
            print json_encode($data);
        } else {
            $data = array(
                "status" => "401",
            );
            print json_encode($data);
        }
    }
}
