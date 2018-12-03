<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include "/var/www/html/codeigniter/application/Service/TrashService.php";
require "/var/www/html/codeigniter/application/Service/jwt.php";

class TrashAPI
{

    public $TrashServiceRef;
    public function __construct()
    {
        $this->TrashServiceRef = new TrashService();
    }
    /**
     * @method deleteNotes()
     * @Description - This method sets variable deleted to true in DB
     */
    public function deleteNotes()
    {
        $id    = $_POST['id'];
        $email = $_POST['email'];
        $this->TrashServiceRef->deleteNotes($id, $email);
    }
    /**
     * @method getDeletedNotes()
     * @Description - This method sends notes array for which deleted is true
     */

    public function getDeletedNotes()
    {
        $email = $_POST['email'];
        $this->TrashServiceRef->getDeletedNotes($email);
    }
    /**
     * @method restoreNote()
     * @Description - This method sets deleted to false in DB
     */
    public function restoreNote()
    {
        $id    = $_POST['id'];
        $email = $_POST['email'];
        $this->TrashServiceRef->restoreNote($id, $email);
    }
    /**
     * @method deleteNotePermanently()
     * @Description - This method Deletes the notes from DB
     */
    public function deleteNotePermanently()
    {
        $id    = $_POST['id'];
        $email = $_POST['email'];
        $this->TrashServiceRef->restoreNote($id, $email);
    }

}
