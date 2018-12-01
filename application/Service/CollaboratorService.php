<?php
header('Access-Control-Allow-Origin: *');
include "/var/www/html/codeigniter/application/Static/DBConstants.php";
class CollaboratorService extends CI_Controller
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
     * @method collaboratorverifyemail()
     * @description - This method verifies whether email id is registered or not
     */
    public function CollaboratorVerifyEmail($email)
    {
        $query     = "SELECT * FROM Registration";
        $statement = $this->connect->prepare($query);
        /**
         * Execute the querry
         */
        $emailExists = false;
        $statement->execute();
        /**
         * Fetch the array of data one by one.
         * Check for whether the name exists or not.
         */
        $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($arr as $arr1) {
            if (($arr1['email'] == $email)) {
                $emailExists = true;
                break;
            }
        }
        if ($emailExists) {
            $data = array(
                "status" => 200,
            );
            print json_encode($data);
        } else {
            $data = array(
                "status" => "401",
            );
            print json_encode($data);
        }
    }
    /**
     * @method collaboratorverifyemail()
     * @description - This function helps to get collaborators added for particular notes.
     * var string @email
     * var integer @id
     */
    public function notesCollaborator($email, $id)
    {
        $ref              = new CollaboratorService();
        $noteCollaborator = $ref->patticularNotesCollaborator($id);
        $data             = array(
            "noteCollaborator" => $noteCollaborator,
        );
        print json_encode($data);

    }
    /**
     * @method patticularNotesCollaborator()
     * @param id integer
     * @Description - This method sends the collaborator array for a particular collaborator.
     */
    public function patticularNotesCollaborator($id)
    {
        $query     = "select * from Collaborator where noteid = '$id'";
        $statement = $this->connect->prepare($query);
        if ($statement->execute()) {
            $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $arr;
        } else {
            $data = array(
                "status" => "401",
            );
            print json_encode($data);
        }
    }
    /**
     * @method addCollaborator()
     * @Description - Adds new collaborator to the particular notes
     */

    public function addCollaborator($email, $owner, $shared, $noteid)
    {
        $sql = "INSERT INTO Collaborator (noteid,owner,shared)VALUES('$noteid','$owner','$shared')";
        /**
         * Check for the successful execution of the querry.
         * Return JSON Data to subscribers
         */
        $stmt = $this->connect->prepare($sql);
        /**
         * Execute the querry
         */
        if ($stmt->execute()) {
            $ref              = new CollaboratorService();
            $noteCollaborator = $ref->patticularNotesCollaborator($noteid);
            $allCollaborator  = $ref->getCollaborator($email);
            $data             = array(
                "noteCollaborator" => $noteCollaborator,
                "allCollaborator"  => $allCollaborator,
            );
            print json_encode($data);
        } else {
            $data = array(
                "status" => "401",
            );
            print json_encode($data);
        }
    }
    /**
     *
     * @method deleteCollaborator()
     * @Description - Deletes collaborator to the particular notes
     */

    public function deleteCollaborator($email, $cid, $noteid)
    {
        $query     = "DELETE FROM Collaborator WHERE ColaboratorID='$cid'";
        $statement = $this->connect->prepare($query);
        if ($statement->execute()) {
            $ref              = new CollaboratorService();
            $noteCollaborator = $ref->patticularNotesCollaborator($noteid);
            $allCollaborator  = $ref->getCollaborator($email);
            $data             = array(
                "noteCollaborator" => $noteCollaborator,
                "allCollaborator"  => $allCollaborator,
            );
            print json_encode($data);
        } else {
            $data = array(
                "status" => "401",
            );
            print json_encode($data);
        }
    }
    /**
     *
     * @method getCollaborator()
     * @param email string
     * @Description - Sends all collaborator array to frontend.
     */

    public function getCollaborator($email)
    {
        $query = "Select * from Collaborator where owner = '$email' or shared='$email'
				 or noteid in (select noteid from Collaborator where owner='$email' or shared ='$email') ";
        $statement = $this->connect->prepare($query);

        if ($statement->execute()) {
            $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $arr;
        } else {
            $data = array(
                "status" => "401",
            );
            print json_encode($data);
        }
    }

}
