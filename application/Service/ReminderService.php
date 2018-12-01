<?php
header('Access-Control-Allow-Origin: *');
include "/var/www/html/codeigniter/application/Static/DBConstants.php";
class ReminderService
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
    public function setRemainder($id, $remainderDate)
    {
        /**
         * store the querry in string format
         */
        $query     = "Update Notes set remainderDateTime = '$remainderDate' where id = '$id'";
        $statement = $this->connect->prepare($query);
        /**
         * Execute the querry.
         */
        if ($statement->execute()) {
            $data = array(
                "status" => "200",
            );
            print json_encode($data);
        } else {
            $data = array(
                "status" => "404",
            );
            print json_encode($data);
        }
    }
    /**
     * To delete reminder which is setted before
     */
    public function deleteRemainder($id)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);
        if ($verify) {

            $query     = "Update Notes set remainderDateTime = 'null null' where id = '$id'";
            $statement = $this->connect->prepare($query);
            if ($statement->execute()) {
                $data = array(
                    "status" => "200",
                );
                print json_encode($data);
            } else {
                $data = array(
                    "status" => "404",
                );
                print json_encode($data);
            }
        } else {
            $data = array(
                "status" => "404",
            );
            print json_encode($data);
        }
    }
    /**
     * @method getReminders()
     * @Description - This method retrievs all notes which are having reminders
     */

    public function reminders($email, $deleted)
    {
        /**
         * store the querry in string format
         */
        $query     = "Select * from Notes where email = '$email' and remainderDateTime not in ('null null','undefined undefined') order by DragAndDropID DESC ";
        $statement = $this->connect->prepare($query);
        /**
         * Execute the querry.
         */
        if ($statement->execute()) {
            $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
            /**
             * Send the array of Notes to frontend.
             */
            print json_encode($arr);
        } else {
            $data = array(
                "msg" => "Not Success",
            );
            print json_encode($data);
        }
    }
    /**
     * This method save the note in DB and return only the notes which are having reminders
     */
    public function saveNote($note, $title, $email, $dateTime, $color, $archived)
    {
        $ref      = new JWT();
        $headers  = apache_request_headers();
        $jwt      = $headers['Authorization'];
        $jwttoken = explode(" ", $jwt);
        $verify   = $ref->verify($jwttoken[1]);

        /**
         * Store the query in string format.
         */
        if ($verify) {
            $sql = "INSERT INTO Notes(email,Title,Note,remainderDateTime,color,archived)VALUES('$email','$title','$note','$dateTime','$color','$archived')";
            /**
             * Check for the successful execution of the querry.
             * Return JSON Data to subscribers
             */
            $stmt = $this->connect->prepare($sql);
            /**
             * Execute the querry
             */
            if ($stmt->execute()) {

                $query     = "Select * from Notes where email = '$email' and deleted='false' and remainderDateTime not in ('null null','undefined undefined') order by DragAndDropID DESC ";
                $statement = $this->connect->prepare($query);
                $statement->execute();
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
                print json_encode($arr);
            } else {
                $data = array(
                    "msg" => "Not Success",
                );
                print json_encode($data);
            }
        } else {
            $data = array(
                "status" => "404",
            );
            print json_encode($data);
        }
    }

}
