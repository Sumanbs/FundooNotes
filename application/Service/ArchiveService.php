<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

include "/var/www/html/codeigniter/application/Static/DBConstants.php";
class ArchiveService extends CI_Controller
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
    public function archiveNote($id, $email)
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
            $query     = "Update Notes set archived	 = 'true' where id = '$id'";
            $statement = $this->connect->prepare($query);
            /**
             * Execute the querry.
             */
            if ($statement->execute()) {
                $ref = new ArchiveService();
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
     * @method unArchiveNote()
     * @description - this method sets the archive flag to false in DB
     */
    public function unArchiveNote($id, $email)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            /**
             * store the querry in string format
             */
            $query     = "Update Notes set archived	 = 'false' where id = '$id'";
            $statement = $this->connect->prepare($query);
            /**
             * Execute the querry.
             */
            if ($statement->execute()) {
                $ref = new ArchiveService();
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
