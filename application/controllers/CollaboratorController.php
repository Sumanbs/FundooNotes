<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

require "/var/www/html/codeigniter/application/Service/jwt.php";
include "/var/www/html/codeigniter/application/Service/CollaboratorService.php";
class CollaboratorController
{
    /**
     * @var PDO
     */
    public $CollaboratorServiceRef;
    public function __construct()
    {
        $this->CollaboratorServiceRef = new CollaboratorService();
    }
    /**
     * @method collaboratorverifyemail()
     * @description - This method verifies whether email id is registered or not
     */
    public function collaboratorverifyemail()
    {
        $email = $_POST['email'];
        $this->CollaboratorServiceRef->CollaboratorVerifyEmail($email);
    }
    /**
     * @method collaboratorverifyemail()
     * @description - This function helps to get collaborators added for particular notes.
     * var string @email
     * var integer @id
     */
    public function notesCollaborator()
    {
        $email = $_POST['email'];
        $id    = $_POST['id'];
        $this->CollaboratorServiceRef->notesCollaborator($email, $id);
    }

    /**
     * @method addCollaborator()
     * @Description - Adds new collaborator to the particular notes
     */

    public function addCollaborator()
    {
        $email  = $_POST['email'];
        $owner  = $_POST['owner'];
        $shared = $_POST['shared'];
        $noteid = $_POST['id'];
        $this->CollaboratorServiceRef->addCollaborator($email, $owner, $shared, $noteid);

    }
    /**
     *
     * @method deleteCollaborator()
     * @Description - Deletes collaborator to the particular notes
     */

    public function deleteCollaborator()
    {
        $email  = $_POST['email'];
        $cid    = $_POST['cid'];
        $noteid = $_POST['noteid'];
        $this->CollaboratorServiceRef->deleteCollaborator($email, $cid, $noteid);

    }

}
