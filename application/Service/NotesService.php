<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

include "/var/www/html/codeigniter/application/Static/DBConstants.php";
class NotesService extends CI_Controller
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
     * @method createnotes()
     * @Description - Used to insert notes data to the database during creation of notes.
     * @param string - note
     * @param string - title
     * @param string - email
     * @param string - date
     * @param string - color
     * @param string - archived
     * @param string - Collaborat
     */
    public function createnotes($note, $title, $email, $dateTime, $color, $archived, $Collaborat)
    {

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
     * @method all_notes()
     * @Description - Used to get all notes data from database for the logged in email id
     * @param string - email
     */

    public function all_notes($email)
    {
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

            for ($i = 0; $i < count($allNotes); $i++) {
                $allNotes[$i]['image'] = "data:image/jpeg;base64," . base64_encode($allNotes[$i]['image']);
            }

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
     * @method changeColor()
     * @Description - This method used to update the color of the note.
     * @param int - id
     * @param string - color
     */

    public function changeColor($id, $color)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {

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
     * @param string - note
     * @param string - title
     * @param string - date
     * @param string - color
     * @param string - id
     */
    public function updateNotes($note, $title, $date, $color, $id)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {
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
     * @method noteSaveImage() upload the profile pic
     * @return void
     */
    public function noteSaveImage($url, $email, $id)
    {

        $file = base64_decode($url);
        /**
         * @var string $query has query to update the user profile pic
         */
        $query     = "UPDATE Notes  SET `image` = :file  where `email`= :email  and `id`= :id ";
        $statement = $this->connect->prepare($query);
        if ($statement->execute(array(
            ':file'  => $file,
            ':email' => $email,
            ':id'    => $id,
        ))) {

        } else {
            $data = array(
                "message" => "203",
            );
            print json_encode($data);
        }
    }

}
