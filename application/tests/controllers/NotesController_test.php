<?php
include "/var/www/html/codeigniter/application/controllers/NotesController.php";
class NotesController_test extends TestCase
{

    public function test_registration()
    {
        $testcases = file_get_contents("createNotestest.json", true);
        $testcases = json_decode($testcases, true);

        foreach ($testcases as $key => $value) {
            $_POST["note"]                  = $value['note'];
            $_POST["title"]                 = $value['title'];
            $_POST["email"]                 = $value['email'];
            $_POST["date"]                  = $value['date'];
            $_POST["color"]                 = $value['color'];
            $_POST["archived"]              = $value['archived'];
            $_POST["selectedCollaborators"] = $value['selectedCollaborators'];

            $ref    = new NotesController();
            $result = $ref->createnotes();

            $res = $this->assertEquals($value['expected'], $result);
        }
    }
    public function test_allNotes()
    {
        $testcases = file_get_contents("All_notes.json", true);
        $testcases = json_decode($testcases, true);

        foreach ($testcases as $key => $value) {

            $_POST["email"] = $value['email'];

            $ref    = new NotesController();
            $result = $ref->all_notes();

            $res = $this->assertEquals($value['expected'], $result);
        }
    }
    public function test_updateNotes()
    {
        $testcases = file_get_contents("All_notes.json", true);
        $testcases = json_decode($testcases, true);

        foreach ($testcases as $key => $value) {

            $_POST["email"] = $value['email'];

            $ref    = new NotesController();
            $result = $ref->updateNotes();

            $res = $this->assertEquals($value['expected'], $result);
        }
    }
}
