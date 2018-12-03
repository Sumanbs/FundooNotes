<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

require "/var/www/html/codeigniter/application/Service/jwt.php";
include "/var/www/html/codeigniter/application/Service/LabelsService.php";
class LabelsAPI
{
    public $LabelsServiceRef;
    public function __construct()
    {
        $this->LabelsServiceRef = new LabelsService();
    }
    /**
     * @method NewLabel()
     * @Description - This method adds new label to the note.
     * @var string - email
     * @var string -label
     */
    public function NewLabel()
    {
        $email = $_POST['email'];
        $label = $_POST['label'];
        $this->LabelsServiceRef->NewLabel($email, $label);
    }
    /**
     * @method getAllLabels()
     * @Description - This method sends all the labelled notes to front end
     * @var string - email
     */
    public function getAllLabels()
    {
        $email = $_POST['email'];
        $this->LabelsServiceRef->fetchAllLabels($email);
    }
    /**
     * @method editLabel()
     * @Description - Edit the label and update it in the DB
     * @var int - id
     * @var int - email
     * @var int - label
     */
    public function editLabel()
    {
        $id    = $_POST['id'];
        $email = $_POST['email'];
        $label = $_POST['label'];

        $this->LabelsServiceRef->editLabel($id, $email, $label);
    }
    /**
     * @method deleteLabel()
     * @Description - This method deletes the label assigned to the particular note
     * @var int - id
     * @var string - email
     * @var string - label
     */
    public function deleteLabel()
    {
        $id    = $_POST['id'];
        $email = $_POST['email'];
        $label = $_POST['label'];
        $this->LabelsServiceRef->deleteLabel($id, $email, $label);

    }

    /**
     * @method notesWithLabels()
     * @Description - This method returns all notes data from DB
     * @var string - email
     */
    public function notesWithLabels()
    {
        $email = $_POST['email'];
        $this->LabelsServiceRef->allNotes($email);
    }
    /**
     * @method deleteLabelFromNote()
     * @Description - This method deletes the label assigned to particular note.
     * @var string - id
     * @var string - email
     */
    public function deleteLabelFromNote()
    {
        $id    = $_POST['id'];
        $email = $_POST['email'];
        $this->LabelsServiceRef->deleteLabelFromNote($id, $email);
    }
    /**
     * @method setLabelToNote()
     * This method assigns labels to the particular notes and returns all labels array
     * @var string - id
     * @var string - email
     * @var string - label
     */
    public function setLabelToNote()
    {
        $id    = $_POST['id'];
        $email = $_POST['email'];
        $label = $_POST['label'];
        $this->LabelsServiceRef->setLabelToNote($id, $email, $label);
    }
    /**
     * @method allLabeledNotes()
     * @Description - This method returns all labelled notes based on the selected label.
     * @var string -email
     * @var string - label
     */
    public function allLabeledNotes()
    {
        $email = $_POST['email'];
        $label = $_POST['label'];
        $this->LabelsServiceRef->allLabeledNotes($email, $label);

    }
}
