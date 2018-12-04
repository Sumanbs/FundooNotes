import { BidiModule } from "@angular/cdk/bidi";
import { Auth1Guard } from "./auth1.guard";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AuthenticateService } from "./Services/authenticate.service";
import { DragDropModule } from "@angular/cdk/drag-drop";
import {
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatExpansionModule
} from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegistrationComponent } from "./registration/registration.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { RouterModule } from "@angular/router";
import { DataService } from "./Services/data.service";
import { CommonService } from "./Services/list-grid.service";
import { NotesService } from "./Services/notes.service";
import { ActivateAccountComponent } from "./activate-account/activate-account.component";
import { LayoutModule } from "@angular/cdk/layout";
import { FundooNotesComponent } from "./fundoo-notes/fundoo-notes.component";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { NotesComponent } from "./notes/notes.component";
import { CookieService } from "angular2-cookie";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthInterceptor } from "./Services/auth.interceptor";
import { EditnotesComponent } from "./editnotes/editnotes.component";
import { LabelsComponent } from "./labels/labels.component";
import { CreatelabelsService } from "./Services/createlabels.service";
import { RemindersComponent } from "./reminders/reminders.component";
import { RemindersService } from "./Services/reminders.service";
import { TrashComponent } from "./trash/trash.component";
import { TrashService } from "./Services/trash.service";
import { ArchiveService } from "./Services/archive.service";
import { ArchivenoteComponent } from "./archivenote/archivenote.component";
import { LabelsService } from "./Services/labels.service";
import { LabellednotesComponent } from "./labellednotes/labellednotes.component";
import { CollaboratorComponent } from "./collaborator/collaborator.component";
import { CollaboratorService } from "./Services/collaborator.service";
import { MatChipsModule } from "@angular/material/chips";
import { UpdatecollaboratorComponent } from "./updatecollaborator/updatecollaborator.component";
import { ImageService } from "./Services/image.service";
import { DragDropService } from "./Services/drag-drop.service";
import { NotesFilterPipe } from "./notes/notes-filter.pipe";
import { ServiceURL } from "./Services/ServiceURL";
// import { ServiceURL } from "./ServiceURL/ServiceUrl";
import { SocialLoginModule, AuthServiceConfig } from "angular-6-social-login";

import { getAuthServiceConfigs } from "./socialloginConfig";
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        ForgotPasswordComponent,
        ResetpasswordComponent,
        ActivateAccountComponent,
        FundooNotesComponent,
        NotesComponent,
        EditnotesComponent,
        LabelsComponent,
        RemindersComponent,
        TrashComponent,
        ArchivenoteComponent,
        LabellednotesComponent,
        CollaboratorComponent,
        UpdatecollaboratorComponent,
        NotesFilterPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        HttpClientModule,
        RouterModule,
        MatProgressBarModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatButtonToggleModule,
        MatMenuModule,
        BrowserModule,
        MatTooltipModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        NgxMaterialTimepickerModule.forRoot(),
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatDialogModule,
        MatChipsModule,
        BidiModule,
        DragDropModule,
        SocialLoginModule
    ],
    providers: [
        DataService,
        CookieService,
        NotesService,
        AuthenticateService,
        CommonService,
        Auth1Guard,
        ArchiveService,
        CollaboratorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        CreatelabelsService,
        RemindersService,
        TrashService,
        LabelsService,
        ImageService,
        DragDropService,
        ServiceURL,
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
