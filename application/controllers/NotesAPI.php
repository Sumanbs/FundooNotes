<?php

/**
 * *********************************************************
 * @Description - This class handles crud operation on notes
 * *********************************************************
 */
header('Access-Control-Allow-Origin: *');
include "/var/www/html/codeigniter/application/Service/NotesService.php";
require "/var/www/html/codeigniter/application/Service/jwt.php";

class NotesAPI
{

    public $NotesServiceRef;
    public function __construct()
    {
        $this->NotesServiceRef = new NotesService();
    }
    /**
     * @method createnotes()
     * @Description - Used to insert notes data to the database during creation of notes.
     * @var string - note
     * @var string - title
     * @var string - email
     * @var string - date
     * @var string - color
     * @var string - archived
     * @var string - Collaborat
     */
    public function createnotes()
    {
        $note       = $_POST['note'];
        $title      = $_POST['title'];
        $email      = $_POST['email'];
        $dateTime   = $_POST['date'];
        $color      = $_POST['color'];
        $archived   = $_POST['archived'];
        $Collaborat = $_POST['selectedCollaborators'];
        $this->NotesServiceRef->createnotes($note, $title, $email, $dateTime, $color, $archived, $Collaborat);
    }
    /**
     * @method all_notes()
     * @Description - Used to get all notes data from database for the logged in email id
     * @var string - email
     */
    public function all_notes()
    {
        $email = $_POST['email'];
        $this->NotesServiceRef->all_notes($email);
    }

    /**
     * @method changeColor()
     * @Description - This method used to update the color of the note.
     * @var int - id
     * @var string - color
     */
    public function changeColor()
    {
        $id    = $_POST['id'];
        $color = $_POST['color'];
        $this->NotesServiceRef->changeColor($id, $color);

    }
    /**
     * @method updateNotes()
     * @Description - This method perform the update operation on note and saves it in the database
     * @var string - note
     * @var string - title
     * @var string - date
     * @var string - color
     * @var string - id
     */
    public function updateNotes()
    {
        $note  = $_POST['note'];
        $title = $_POST['title'];
        $date  = $_POST['date'];
        $color = $_POST['color'];
        $id    = $_POST['id'];
        $this->NotesServiceRef->changeColor($note, $title, $date, $color, $id);
    }
}
