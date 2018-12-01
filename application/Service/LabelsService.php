<?php
header('Access-Control-Allow-Origin: *');
include "/var/www/html/codeigniter/application/Static/DBConstants.php";
class LabelsService extends CI_Controller
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
     * @method NewLabel()
     * @Description - This method adds new label to the note.
     * @var string - email
     * @var string -label
     */

    public function NewLabel($email, $label)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            if ($email != '') {
                $sqlQuerry         = "select * from Labels where email='$email'";
                $statementofQuerry = $this->connect->prepare($sqlQuerry);
                $statementofQuerry->execute();
                $arr             = $statementofQuerry->fetchAll(PDO::FETCH_ASSOC);
                $labelnotPresent = true;

                foreach ($arr as $arr1) {
                    if (($arr1['email'] == $email) && ($arr1['label'] == $label)) {
                        $labelnotPresent = false;
                        break;
                    }
                }
                if ($labelnotPresent) {
                    $sql       = "INSERT INTO Labels(email,label)VALUES('$email','$label')";
                    $statement = $this->connect->prepare($sql);
                    if ($statement->execute()) {
                        $statementofQuerry = $this->connect->prepare($sqlQuerry);
                        $statementofQuerry->execute();
                        $arr = $statementofQuerry->fetchAll(PDO::FETCH_ASSOC);
                        print json_encode($arr);
                    } else {
                        $data = array(
                            "status" => "404",
                        );
                        print json_encode($data);
                    }
                }
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
     * @method fetchAllLabels()
     * @Description - This method fetches all labels from DB and sends it frontend.
     * @param string - email
     */
    public function fetchAllLabels($email)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $sqlQuerry         = "select * from Labels where email='$email'";
            $statementofQuerry = $this->connect->prepare($sqlQuerry);
            if ($statementofQuerry->execute()) {
                $arr = $statementofQuerry->fetchAll(PDO::FETCH_ASSOC);
                print json_encode($arr);
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
     * @method editLabel()
     * @Description - Edit the label and update it in the DB
     * @var int - id
     * @var int - email
     * @var int - label
     */
    public function editLabel($id, $email, $label)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $query     = "Update Labels set label = '$label' where id = '$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $ref = new LabelsService();
                $ref->fetchAllLabels($email);
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
     * @method deleteLabel()
     * @Description - This method deletes the label assigned to the particular note
     * @var int - id
     * @var string - email
     * @var string - label
     */
    public function deleteLabel($id, $email, $label)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $query     = "DELETE FROM Labels WHERE id='$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $query     = "DELETE FROM notesWithLabel WHERE label='$label'";
                $statement = $this->connect->prepare($query);
                $rr        = $statement->execute();
                $ref       = new LabelsService();
                $ref->fetchAllLabels($email);
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
     * @method  -  allNotes()
     * @Description - This method is returns all notes hab=ving the given label
     * @var string - email
     */
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
     * @method deleteLabelFromNote()
     * @Description - This method deletes the label assigned to particular note.
     * @var string - id
     * @var string - email
     */
    public function deleteLabelFromNote($id, $email)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $query     = "DELETE FROM notesWithLabel WHERE uniqueId='$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $ref = new LabelsService();
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
     * @var string - id
     * @var string - email
     * @var string - label
     */
    public function setLabelToNote($id, $email, $label)
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
            $ref1 = new LabelsService();
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
     * @var string -email
     * @var string - label
     */
    public function allLabeledNotes($email, $label)
    {
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
