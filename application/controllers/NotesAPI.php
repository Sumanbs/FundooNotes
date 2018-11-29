<?php

/**
 * **************************************
 * @Description -Demonstration of rest API
 * ***************************************
 */
header('Access-Control-Allow-Origin: *');
require "jwt.php";

class NotesAPI extends CI_Controller
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
     * @createnotes -- Used to insert notes data to the database.
     *   @var string
     * @var string
     * @var string
     * @var string
     * @var string
     */
    public function createnotes()
    {
        $note                  = $_POST['note'];
        $title                 = $_POST['title'];
        $email                 = $_POST['email'];
        $dateTime              = $_POST['date'];
        $color                 = $_POST['color'];
        $archived              = $_POST['archived'];
        $Collaborat            = $_POST['selectedCollaborators'];
        $ref                   = new JWT();
        $headers               = apache_request_headers();
        $jwt                   = $headers['Authorization'];
        $jwttoken              = explode(" ", $jwt);
        $verify                = $ref->verify($jwttoken[1]);
        $selectedCollaborators = explode(",", $Collaborat);
        /**
         * Store the query in string format.
         */
        if ($verify) {
            $sql = "INSERT INTO Notes(email,Title,Note,remainderDateTime,color,archived)VALUES('$email','$title','$note','$dateTime','$color','$archived')";
            /**
             * Check for the successful execution of the querry.
             * Return JSON Data to subscribers
             */
            $stmt = $this->connect->prepare($sql);
            /**
             * Execute the querry
             */
            if ($stmt->execute()) {

                $sql    = "select max(id) as id from Notes where email = '$email'";
                $stmt   = $this->connect->prepare($sql);
                $var    = $stmt->execute();
                $noteid = $stmt->fetch(PDO::FETCH_ASSOC);
                $noteid = $noteid['id'];
                /**
                 * To update ID for Drag and drop.
                 */
                $sqlquerry         = "UPDATE Notes set DragAndDropID = $noteid where id = '$noteid'";
                $statementofQuerry = $this->connect->prepare($sqlquerry);
                $var               = $statementofQuerry->execute();

                $temp = count($selectedCollaborators);
                for ($i = 0; $i < count($selectedCollaborators); $i++) {
                    $cl = $selectedCollaborators[$i];
                    if ($selectedCollaborators[$i] != "undefined" && $selectedCollaborators[$i] != "null") {
                        $sql = "INSERT INTO Collaborator (noteid,owner,shared)VALUES('$noteid','$email','$cl')";
                        /**
                         * Check for the successful execution of the querry.
                         * Return JSON Data to subscribers
                         */
                        $stmt = $this->connect->prepare($sql);
                        /**
                         * Execute the querry
                         */
                        $temp = $stmt->execute();
                    }
                }
                /**
                 * Fetch all Notes data
                 */
                $query     = "Select * from Notes where email = '$email' or id in (select noteid from Collaborator where shared='$email' ) and deleted='false' and archived='false' order by DragAndDropID DESC ";
                $statement = $this->connect->prepare($query);

                $statement->execute();
                $allNotes = $statement->fetchAll(PDO::FETCH_ASSOC);
                /**
                 * Fetch all collaborator data
                 */
                $query = "Select * from Collaborator where owner = '$email' or shared='$email'
				 or noteid in (select noteid from Collaborator where owner='$email' or shared ='$email') ";
                $statement = $this->connect->prepare($query);

                $statement->execute();
                $allCollaborators = $statement->fetchAll(PDO::FETCH_ASSOC);
                /**
                 * Send response
                 */
                $data = array(
                    "allNotes"         => $allNotes,
                    "allCollaborators" => $allCollaborators,
                );
                print json_encode($data);
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
    /**
     * @Description - Used to get all data from database
     */
    public function all_notes()
    {

        $email = $_POST['email'];
        /**
         * store the querry in string format
         */
        $query = "Select * from Notes where email = '$email' or id in (select noteid from Collaborator where shared='$email' ) and deleted='false' and archived='false' order by DragAndDropID DESC";

        $statement = $this->connect->prepare($query);
        /**
         * Execute the querry.
         */
        if ($statement->execute()) {
            $allNotes = $statement->fetchAll(PDO::FETCH_ASSOC);
            /**
             * Send the array of Notes to frontend.
             */
            $query     = "Select * from Collaborator where owner = '$email' or shared='$email' or noteid in (select noteid from Collaborator where owner='$email' or shared ='$email') ";
            $statement = $this->connect->prepare($query);

            $t1               = $statement->execute();
            $allCollaborators = $statement->fetchAll(PDO::FETCH_ASSOC);
            /**
             * Send response
             */
            $data = array(
                "allNotes"         => $allNotes,
                "allCollaborators" => $allCollaborators,
            );
            print json_encode($data);
        } else {
            $data = array(
                "msg" => "Not Success",
            );
            print json_encode($data);
        }
    }
    /**
     * @method -setRemainder
     * This method used to set the reminder for a particular ID
     * @var string
     * @var string
     * @var string
     */
    public function setRemainder()
    {
        $id            = $_POST['id'];
        $remainderDate = $_POST['remainderDateTime'];
        /**
         * store the querry in string format
         */
        $query     = "Update Notes set remainderDateTime = '$remainderDate' where id = '$id'";
        $statement = $this->connect->prepare($query);
        /**
         * Execute the querry.
         */

        if ($statement->execute()) {
            $data = array(
                "status" => "200",
            );
            print json_encode($data);
        } else {
            $data = array(
                "status" => "404",
            );
            print json_encode($data);
        }
    }
    /**
     * To delete reminder which is setted before
     */
    public function deleteRemainder()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id        = $_POST['id'];
            $query     = "Update Notes set remainderDateTime = 'null null' where id = '$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $data = array(
                    "status" => "200",
                );
                print json_encode($data);
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
     * @Description - This method changes color of the note
     */
    public function changeColor()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id        = $_POST['id'];
            $color     = $_POST['color'];
            $query     = "Update Notes set color = '$color' where id = '$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $data = array(
                    "status" => "200",
                );
                print json_encode($data);
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
     * @method updateNotes()
     * @Description - This method perform the update operation on note and saves it in the database
     */
    public function updateNotes()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $note  = $_POST['note'];
            $title = $_POST['title'];
            $date  = $_POST['date'];
            $color = $_POST['color'];
            $id    = $_POST['id'];

            $query     = "Update Notes set remainderDateTime = '$date',Note = '$note',Title = '$title',color='$color' where id = '$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $data = array(
                    "status" => "200",
                );
                print json_encode($data);
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
     * @method NewLabel()
     * @Description - This method adds new label to the note,
     */

    public function NewLabel()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $email = $_POST['email'];
            $label = $_POST['label'];
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
     * @method getAllLabels()
     * @Description - This method sends all the labelled notes to front end
     */

    public function getAllLabels()
    {
        $email = $_POST['email'];
        $ref   = new NotesAPI();
        $ref->fetchAllLabels($email);
    }
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

    public function editLabel()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id    = $_POST['id'];
            $email = $_POST['email'];

            $label     = $_POST['label'];
            $query     = "Update Labels set label = '$label' where id = '$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $ref = new NotesAPI();
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
     */

    public function deleteLabel()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id    = $_POST['id'];
            $email = $_POST['email'];
            $label = $_POST['label'];

            $query     = "DELETE FROM Labels WHERE id='$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $query     = "DELETE FROM notesWithLabel WHERE label='$label'";
                $statement = $this->connect->prepare($query);
                $rr        = $statement->execute();
                $ref       = new NotesAPI();
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
     * @method deleteNotes()
     * @Description - This method sets variable deleted to true in DB
     */
    public function deleteNotes()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id        = $_POST['id'];
            $email     = $_POST['email'];
            $query     = "Update Notes set deleted	 = 'true' where id = '$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $query     = "Select * from Notes where email = '$email' and deleted = 'false' order by DragAndDropID DESC ";
                $statement = $this->connect->prepare($query);
                $statement->execute();
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
                /**
                 * Send the array of Notes to frontend.
                 */
                print json_encode($arr);
            } else {
                $data = array(
                    "status" => "404",
                );
                print json_encode($data);
            }
        }
    }
    /**
     * @method getDeletedNotes()
     * @Description - This method sends notes array for which deleted is true
     */

    public function getDeletedNotes()
    {
        $email = $_POST['email'];
        /**
         * store the querry in string format
         */
        $query     = "Select * from Notes where email = '$email' and deleted = 'true' order by DragAndDropID DESC ";
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
     * @method restoreNote()
     * @Description - This method sets deleted to false in DB
     */

    public function restoreNote()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id        = $_POST['id'];
            $email     = $_POST['email'];
            $query     = "Update Notes set deleted	 = 'false' where id = '$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $query     = "Select * from Notes where email = '$email' and deleted = 'true' order by DragAndDropID DESC ";
                $statement = $this->connect->prepare($query);
                $statement->execute();
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
                /**
                 * Send the array of Notes to frontend.
                 */
                print json_encode($arr);
            } else {
                $data = array(
                    "status" => "404",
                );
                print json_encode($data);
            }
        }
    }
    /**
     * @method deleteNotePermanently()
     * @Description - This method Deletes the notes from DB
     */
    public function deleteNotePermanently()
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
            $id        = $_POST['id'];
            $email     = $_POST['email'];
            $query     = "delete from Notes where id = '$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $query     = "Select * from Notes where email = '$email' and deleted = 'true' order by DragAndDropID DESC ";
                $statement = $this->connect->prepare($query);
                $statement->execute();
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
                /**
                 * Send the array of Notes to frontend.
                 */
                print json_encode($arr);
            } else {
                $data = array(
                    "status" => "404",
                );
                print json_encode($data);
            }
        }
    }
}
