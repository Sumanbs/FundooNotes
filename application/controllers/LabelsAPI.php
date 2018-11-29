<?php
header('Access-Control-Allow-Origin: *');
require "jwt.php";

class LabelsAPI extends CI_Controller
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
     * @method labelexists()
     * @param id int
     * @param email string
     * @param label string
     * @Description - Checks whether the label is already assigned to the note or not.
     */
    public function labelexists($id, $email, $label)
    {
        $labelnotPresent = true;
        $query           = "Select * from notesWithLabel where email = '$email'";
        $statement       = $this->connect->prepare($query);
        $statement->execute();
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($arr as $arr1) {
            if (($arr1['email'] == $email) && ($arr1['label'] == $label) && ($arr1['id'] == $id)) {
                $labelnotPresent = false;
                break;
            }
        }
        return $labelnotPresent;
    }
    /**
     * @method notesWithLabels()
     * This method returns all notes data from DB
     */
    public function notesWithLabels()
    {
        $email = $_POST['email'];
        $ref   = new LabelsAPI();
        $ref->allNotes($email);
        // $data = array(
        //     "success" => "200",
        // );
        // print json_encode($data);

    }
    public function allNotes($email)
    {
        $labelnotPresent = true;
        $query           = "Select * from notesWithLabel where email = '$email'";
        $statement       = $this->connect->prepare($query);
        if ($statement->execute()) {
            $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
            print json_encode($arr);
        } else {
            $data = array(
                "status" => "404",
            );
            print json_encode($data);
        }
    }
    /**
     * @method labelexists()
     * @Description - Delete the label which is assigned to the particular note
     */

    public function deleteLabelFromNote()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id        = $_POST['id'];
            $email     = $_POST['email'];
            $query     = "DELETE FROM notesWithLabel WHERE uniqueId='$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $ref = new LabelsAPI();
                $ref->allNotes($email);
            } else {
                $data = array(
                    "status" => "404",
                );
                print json_encode($data);
            }
        } else {
            $data = array(
                "status" => "404",
            );
            print json_encode($data);
        }
    }
    /**
     * @method setLabelToNote()
     * This method assigns labels to the particular notes and returns all labels array
     */

    public function setLabelToNote()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);

        /**
         * Store the query in string format.
         */
        if ($verify) {
            $id    = $_POST['id'];
            $email = $_POST['email'];
            $label = $_POST['label'];
            $ref1  = new LabelsAPI();
            if ($ref1->labelexists($id, $email, $label)) {
                $sql = "INSERT INTO notesWithLabel(email,id,label)VALUES('$email','$id','$label')";
                /**
                 * Check for the successful execution of the querry.
                 * Return JSON Data to subscribers
                 */
                $stmt = $this->connect->prepare($sql);
                /**
                 * Execute the querry
                 */
                if ($stmt->execute()) {

                    $query     = "Select * from notesWithLabel where email = '$email'";
                    $statement = $this->connect->prepare($query);
                    $statement->execute();
                    $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
                    print json_encode($arr);
                } else {
                    $data = array(
                        "msg" => "Not Success",
                    );
                    print json_encode($data);
                }
            } else {
                $data = array(
                    "status" => "404",
                );
                print json_encode($data);
            }
        }
    }
    /**
     * @method allLabeledNotes()
     * @Description - This method returns all labelled notes based on the selected label.
     */
    public function allLabeledNotes()
    {
        $email = $_POST['email'];
        $label = $_POST['label'];

        $sql = "select * from Notes where id in (select id from notesWithLabel where label='$label' and email ='$email')";
        /**
         * Check for the successful execution of the querry.
         * Return JSON Data to subscribers
         */
        $stmt = $this->connect->prepare($sql);
        /**
         * Execute the querry
         */
        if ($stmt->execute()) {
            $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
            print json_encode($arr);

        } else {
            $data = array(
                "status" => "404",
            );
            print json_encode($data);
        }

    }
}
