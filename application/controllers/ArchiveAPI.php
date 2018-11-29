<?php
header('Access-Control-Allow-Origin: *');
require "jwt.php";

class ArchiveAPI extends CI_Controller
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
    public function all_notes($email, $deleted, $archive)
    {

        /**
         * store the querry in string format
         */
        $query     = "Select * from Notes where email = '$email' and deleted = '$deleted' and archived='$archive' order by DragAndDropID DESC ";
        $statement = $this->connect->prepare($query);
        /**
         * Execute the querry.
         */
        if ($statement->execute()) {
            $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
            /**
             * Send the array of Notes to frontend.
             */
            print json_encode($arr);
        } else {
            $data = array(
                "msg" => "Not Success",
            );
            print json_encode($data);
        }
    }
    /**
     * @method archiveNote()
     * This method sets the archive flag to true.
     */
    public function archiveNote()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        /**
         * Calls the method Verify to verify the jwt token
         */
        $verify = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id        = $_POST['id'];
            $email     = $_POST['email'];
            $query     = "Update Notes set archived	 = 'true' where id = '$id'";
            $statement = $this->connect->prepare($query);
            /**
             * Execute the querry.
             */
            if ($statement->execute()) {
                $ref = new ArchiveAPI();
                $ref->all_notes($email, 'false', 'false');
            } else {
                $data = array(
                    "status" => "404",
                );
                print json_encode($data);
            }
        }
    }
    /**
     * @method getArchivedNotes
     * This method fetches all archived notes from DB
     */
    public function getArchivedNotes()
    {
        $email = $_POST['email'];
        $ref   = new ArchiveAPI();
        $ref->all_notes($email, 'false', 'true');
    }
    /**
     * @method unArchiveNote()
     * @description - this method sets the archive flag to false in DB
     */
    public function unArchiveNote()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id    = $_POST['id'];
            $email = $_POST['email'];
            /**
             * store the querry in string format
             */
            $query     = "Update Notes set archived	 = 'false' where id = '$id'";
            $statement = $this->connect->prepare($query);
            /**
             * Execute the querry.
             */
            if ($statement->execute()) {
                $ref = new ArchiveAPI();
                $ref->all_notes($email, 'false', 'true');
            } else {
                $data = array(
                    "status" => "404",
                );
                print json_encode($data);
            }
        }
    }
}
