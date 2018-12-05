<?php
defined('BASEPATH') or exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|    example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|    https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|    $route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|    $route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|    $route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:    my-controller/index    -> my_controller/index
|        my-controller/my-method    -> my_controller/my_method
 */
$route['default_controller']   = 'welcome';
$route['404_override']         = '';
$route['translate_uri_dashes'] = false;
$route['hello']                = 'Hello_test/test_get_hello';

/**
 * Fundoo app API's
 */
$route['Registration']   = 'AccountController/Registration';
$route['Loginpage']      = 'AccountController/Login';
$route['verifyJWT']      = 'AccountController/verifyJWT';
$route['forgotpassword'] = 'AccountController/forgotpassword';
$route['resetpassword']  = 'AccountController/resetpassword';
$route['getmailid']      = 'AccountController/getmailid';
$route['SocialLogin']    = 'AccountController/SocialLogin';

$route['createnotes']   = 'NotesController/createnotes';
$route['all_notes']     = 'NotesController/all_notes';
$route['updateNotes']   = 'NotesController/updateNotes';
$route['changeColor']   = 'NotesController/changeColor';
$route['noteSaveImage'] = 'NotesController/noteSaveImage';

$route['deleteNotes']           = 'TrashController/deleteNotes';
$route['getDeletedNotes']       = 'TrashController/getDeletedNotes';
$route['restoreNote']           = 'TrashController/restoreNote';
$route['deleteNotePermanently'] = 'TrashController/deleteNotePermanently';

$route['archiveNote']      = 'ArchiveController/archiveNote';
$route['getArchivedNotes'] = 'ArchiveController/getArchivedNotes';
$route['unArchiveNote']    = 'ArchiveController/unArchiveNote';

$route['getReminders']    = 'RemindersController/getReminders';
$route['saveNote']        = 'RemindersController/saveNote';
$route['setRemainder']    = 'RemindersController/setRemainder';
$route['deleteRemainder'] = 'RemindersController/deleteRemainder';

$route['NewLabel']            = 'LabelsController/NewLabel';
$route['getAllLabels']        = 'LabelsController/getAllLabels';
$route['editLabel']           = 'LabelsController/editLabel';
$route['deleteLabel']         = 'LabelsController/deleteLabel';
$route['setLabelToNote']      = 'LabelsController/setLabelToNote';
$route['notesWithLabels']     = 'LabelsController/notesWithLabels';
$route['deleteLabelFromNote'] = 'LabelsController/deleteLabelFromNote';
$route['allLabeledNotes']     = 'LabelsController/allLabeledNotes';

$route['collaboratorverifyemail'] = 'CollaboratorController/collaboratorverifyemail';
$route['notesCollaborator']       = 'CollaboratorController/notesCollaborator';
$route['addCollaborator']         = 'CollaboratorController/addCollaborator';
$route['deleteCollaborator']      = 'CollaboratorController/deleteCollaborator';

$route['saveImage']  = 'PicController/saveImage';
$route['fetchImage'] = 'PicController/fetchImage';

$route['DragAndDrop']   = 'DragAndDropController/DragAndDropNotes';
$route['fetchUserData'] = 'SendDataController/sendData';
