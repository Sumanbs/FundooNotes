<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

include "/var/www/html/codeigniter/application/Service/DragAndDropService.php";
require "/var/www/html/codeigniter/application/Service/jwt.php";

class DragAndDropController
{
    public $DragAndDropService;
    public function __construct()
    {
        $this->DragAndDropService = new DragAndDropService();
    }
    /**
     * @method  DragAndDropNotes()
     * @var string
     * @var int
     * @var int
     * @var string
     * @Description - This method swaps the notes based on ids in the notes table.
     */
    public function DragAndDropNotes()
    {
        $email     = $_POST["email"];
        $id        = $_POST["id"];
        $loop      = $_POST["loop"];
        $direction = $_POST["direction"];
        $this->DragAndDropService->DragAndDropNotes($email, $id, $loop, $direction);
    }
}
