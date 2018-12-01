<?php
header('Access-Control-Allow-Origin: *');
include "/var/www/html/codeigniter/application/Static/DBConstants.php";
class DragAndDropService
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
     * @method  DragAndDropNotes()
     * @var string
     * @var int
     * @var int
     * @var string
     * @Description - This method swaps the notes based on ids in the notes table.
     */
    public function DragAndDropNotes($email, $id, $loop, $direction)
    {
        for ($i = 0; $i < $loop; $i++) {
            /**
             * If direction is upward get the note id which is less than current id
             */

            if ($direction == "upward") {
                $querry = "SELECT max(DragAndDropID) as nextid from Notes where DragAndDropID < '$id' and email='$email'";
            }
            /**
             * If direction is not upward get the note id which is greater than current id
             */
            else {
                $querry = "SELECT min(DragAndDropID) as nextid from Notes where DragAndDropID > '$id' and email='$email'";
            }
            $stmt   = $this->connect->prepare($querry);
            $var    = $stmt->execute();
            $noteid = $stmt->fetch(PDO::FETCH_ASSOC);
            $noteid = $noteid['nextid'];
            /**
             * Querry to Swap the notes.
             */
            $querry = "UPDATE Notes a inner join Notes b on a.DragAndDropID <> b.DragAndDropID  set
			a.DragAndDropID =b.DragAndDropID  where a.DragAndDropID in('$noteid','$id') and b.DragAndDropID in('$noteid','$id')";
            $stmt = $this->connect->prepare($querry);
            $var  = $stmt->execute();
            /**
             * Swap the id's
             */
            $id = $noteid;
        }
    }
}
