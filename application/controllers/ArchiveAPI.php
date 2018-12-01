<?php
header('Access-Control-Allow-Origin: *');
require "/var/www/html/codeigniter/application/Service/jwt.php";
include "/var/www/html/codeigniter/application/Service/ArchiveService.php";
class ArchiveAPI
{
    /**
     * @var PDO
     */
    public $ArchiveServiceRef;
    public function __construct()
    {
        $this->ArchiveServiceRef = new ArchiveService();
    }

    /**
     * @method archiveNote()
     * This method sets the archive flag to true.
     */
    public function archiveNote()
    {
        $id    = $_POST['id'];
        $email = $_POST['email'];
        $this->ArchiveServiceRef->archiveNote($id, $email);
    }
    /**
     * @method getArchivedNotes
     * This method fetches all archived notes from DB
     */
    public function getArchivedNotes()
    {
        $email = $_POST['email'];
        $this->ArchiveServiceRef->all_notes($email, 'false', 'true');
    }
    /**
     * @method unArchiveNote()
     * @description - this method sets the archive flag to false in DB
     */
    public function unArchiveNote()
    {
        $id    = $_POST['id'];
        $email = $_POST['email'];
        $this->ArchiveServiceRef->unArchiveNote($id, $email);
    }
}
