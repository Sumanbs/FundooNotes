<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

require "/var/www/html/codeigniter/application/Service/jwt.php";
include "/var/www/html/codeigniter/application/Service/ReminderService.php";

class RemindersController
{

    public $ReminderServiceRef;
    public function __construct()
    {
        $this->ReminderServiceRef = new ReminderService();
    }
    /**
     * @method - setRemainder
     * This method used to set the reminder for a particular ID
     * @var string
     * @var string
     * @var string
     */
    public function setRemainder()
    {
        $id            = $_POST['id'];
        $remainderDate = $_POST['remainderDateTime'];
        $this->ReminderServiceRef->setRemainder($id, $remainderDate);
    }
    /**
     * To delete reminder which is setted before
     */
    public function deleteRemainder()
    {
        $id = $_POST['id'];
        $this->ReminderServiceRef->deleteRemainder($id);
    }
    /**
     * @method getReminders()
     * @Description - This method retrievs all notes which are having reminders
     */
    public function getReminders()
    {
        $email = $_POST['email'];

        $this->ReminderServiceRef->reminders($email, 'false');
    }

    /**
     * This method save the note in DB and return only the notes which are having reminders
     */
    public function saveNote()
    {
        $note     = $_POST['note'];
        $title    = $_POST['title'];
        $email    = $_POST['email'];
        $dateTime = $_POST['date'];
        $color    = $_POST['color'];
        $archived = $_POST['archived'];

        $this->ReminderServiceRef->saveNote($note, $title, $email, $dateTime, $color, $archived);

    }
}
