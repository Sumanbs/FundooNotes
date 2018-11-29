<?php
header('Access-Control-Allow-Origin: *');
require "jwt.php";

class DragAndDrop extends CI_Controller
{
    /**
     * @var PDO
     */
    public $connect = null;
    public function __construct()
    {
        try {
            $this->connect = new PDO("mysql:host=localhost;dbname=Fundoo", "root", "root");
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function DragAndDropNotes()
    {
        $email = $_POST["email"];
        $id    = $_POST["id"];
        $loop  = $_POST["loop"];

        $query     = "Select * from Notes where email = '$email' or id in (select noteid from Collaborator where shared='$email' ) and deleted='false' and archived='false' order by id DESC ";
        $statement = $this->connect->prepare($query);
        $t1        = $statement->execute();
        $allNotes  = $statement->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < $loop; $i++) {
            $querry = "";
        }

    }
}
