import { Auth1Guard } from "./auth1.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { ActivateAccountComponent } from "./activate-account/activate-account.component";
import { FundooNotesComponent } from "./fundoo-notes/fundoo-notes.component";
import { EditnotesComponent } from "./editnotes/editnotes.component";
import { NotesComponent } from "./notes/notes.component";

import { LabelsComponent } from "./labels/labels.component";
import { RemindersComponent } from "./reminders/reminders.component";
import { TrashComponent } from "./trash/trash.component";
import { ArchivenoteComponent } from "./archivenote/archivenote.component";
import { LabellednotesComponent } from "./labellednotes/labellednotes.component";
import { CollaboratorComponent } from "./collaborator/collaborator.component";
import { UpdatecollaboratorComponent } from "./updatecollaborator/updatecollaborator.component";

const routes: Routes = [
  /**
   * Default path
   */
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  /**
   * All other paths
   */
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "forgotpassword", component: ForgotPasswordComponent },
  { path: "resetPassword", component: ResetpasswordComponent },
  { path: "account_activate", component: ActivateAccountComponent },

  {
    /**
     * Parent component
     */
    path: "fundoo",
    component: FundooNotesComponent,
    canActivate: [Auth1Guard],
    /**
     * All child components
     */
    children: [
      { path: "notes", component: NotesComponent },
      { path: "reminders", component: RemindersComponent },
      { path: "Trash", component: TrashComponent },
      { path: "Archive", component: ArchivenoteComponent },
      { path: "labellednotes", component: LabellednotesComponent }
    ]
  },

  { path: "editNotes", component: EditnotesComponent },
  { path: "CreateLabels", component: LabelsComponent },
  { path: "collaborator", component: CollaboratorComponent },
  { path: "Updatecollaborator", component: UpdatecollaboratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
