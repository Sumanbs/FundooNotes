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
$route['Registration']   = 'AccountAPI/Registration';
$route['Loginpage']      = 'AccountAPI/Login';
$route['verifyJWT']      = 'AccountAPI/verifyJWT';
$route['forgotpassword'] = 'AccountAPI/forgotpassword';
$route['resetpassword']  = 'AccountAPI/resetpassword';
$route['getmailid']      = 'AccountAPI/getmailid';
$route['facebookLogin']  = 'AccountAPI/facebookLogin';

$route['createnotes'] = 'NotesAPI/createnotes';
$route['all_notes']   = 'NotesAPI/all_notes';
$route['updateNotes'] = 'NotesAPI/updateNotes';
$route['changeColor'] = 'NotesAPI/changeColor';

$route['deleteNotes']           = 'TrashAPI/deleteNotes';
$route['getDeletedNotes']       = 'TrashAPI/getDeletedNotes';
$route['restoreNote']           = 'TrashAPI/restoreNote';
$route['deleteNotePermanently'] = 'TrashAPI/deleteNotePermanently';

$route['archiveNote']      = 'ArchiveAPI/archiveNote';
$route['getArchivedNotes'] = 'ArchiveAPI/getArchivedNotes';
$route['unArchiveNote']    = 'ArchiveAPI/unArchiveNote';
/**
 * Previosly
 */
$route['getReminders']    = 'RemindersAPI/getReminders';
$route['saveNote']        = 'RemindersAPI/saveNote';
$route['setRemainder']    = 'RemindersAPI/setRemainder';
$route['deleteRemainder'] = 'RemindersAPI/deleteRemainder';

$route['NewLabel']            = 'LabelsAPI/NewLabel';
$route['getAllLabels']        = 'LabelsAPI/getAllLabels';
$route['editLabel']           = 'LabelsAPI/editLabel';
$route['deleteLabel']         = 'LabelsAPI/deleteLabel';
$route['setLabelToNote']      = 'LabelsAPI/setLabelToNote';
$route['notesWithLabels']     = 'LabelsAPI/notesWithLabels';
$route['deleteLabelFromNote'] = 'LabelsAPI/deleteLabelFromNote';
$route['allLabeledNotes']     = 'LabelsAPI/allLabeledNotes';

$route['collaboratorverifyemail'] = 'Collaborator/collaboratorverifyemail';
$route['notesCollaborator']       = 'Collaborator/notesCollaborator';
$route['addCollaborator']         = 'Collaborator/addCollaborator';
$route['deleteCollaborator']      = 'Collaborator/deleteCollaborator';

$route['saveImage']  = 'ProfilePic/saveImage';
$route['fetchImage'] = 'ProfilePic/fetchImage';

$route['DragAndDrop'] = 'DragAndDrop/DragAndDropNotes';
