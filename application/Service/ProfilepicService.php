<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

include "/var/www/html/codeigniter/application/Cloudinary/settings.php";
// include "/var/www/html/codeigniter/application/Cloudinary/vendor/cloudinary/cloudinary_php/src/Cloudinary.php";
include "/var/www/html/codeigniter/application/Cloudinary/vendor/cloudinary/cloudinary_php/src/Uploader.php";
include "/var/www/html/codeigniter/application/Cloudinary/vendor/cloudinary/cloudinary_php/src/Helpers.php";
include "/var/www/html/codeigniter/application/Cloudinary/vendor/cloudinary/cloudinary_php/src/Api.php";

include "/var/www/html/codeigniter/application/Static/DBConstants.php";
class ProfilepicService extends CI_Controller
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
    /**
     * @method fetchImage() fetch the user profile pic
     * @return void
     */
    public function fetchImage($email)
    {
        /**
         * @var string $query has query to select the profile pic of the user
         */

        $query     = "SELECT cloudImagePath FROM Registration where email='$email'";
        $statement = $this->connect->prepare($query);
        if ($statement->execute()) {

            $arr = $statement->fetch(PDO::FETCH_ASSOC);
            /**
             * returns json array response
             */
            print json_encode(($arr['cloudImagePath']));

        }

    }
    /**
     * @method saveImage() upload the profile pic
     * @return void
     */
    // public function saveImage($image, $email)
    // {

    //     $file = base64_decode($image);

    //     /**
    //      * @var string $query has query to update the user profile pic
    //      */
    //     $query     = "UPDATE Registration SET `profilepic` = :file where `email`= :email ";
    //     $statement = $this->connect->prepare($query);
    //     if ($statement->execute(array(
    //         ':file'  => $file,
    //         ':email' => $email,
    //     ))) {

    //         $ref = new ProfilepicService();
    //         $ref->fetchImage($email);
    //     } else {
    //         $data = array(
    //             "message" => "203",
    //         );
    //         print json_encode($data);
    //     }
    // }
    public function saveImage($url, $email)
    {
        if ($url != null) {
            /**
             * adding image to the cloudinary using uploader method
             */
            $response = \Cloudinary\Uploader::upload($url);
            /**
             * @var imageUrl the cloudinary url
             */
            $imageUrl = $response['url'];
            /**
             * @var string $query has query to update the user profile pic to the data base
             */
            $query     = "UPDATE Registration  SET cloudImagePath = '$imageUrl'  where email= '$email' ";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $ref = new ProfilepicService();
                $ref->fetchImage($email);
            } else {
                $data = array(
                    "message" => "404",
                );
                /**
                 * return thye json response
                 */
                print json_encode($data);
            }
        } else {
            $data = array(
                "message" => "404",
            );
            /**
             * return the json response
             */
            print json_encode($data);
        }
    }

}
