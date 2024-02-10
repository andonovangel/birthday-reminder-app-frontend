import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './home/welcome.component';
import { AuthService } from './auth/auth.service';
import { BirthdayService } from './birthday/birthday.service';
import { GroupService } from './group/group.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GroupsPanelComponent } from './sidebar/child-componenets/groups-panel/groups-panel.component';
import { SharedModule } from './shared/shared.module';
import { ArchivePanelComponent } from './sidebar/child-componenets/archive-panel/archive-panel.component';
import { CalendarPanelComponent } from './sidebar/child-componenets/calendar-panel/calendar-panel.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    WelcomeComponent,
    ErrorComponent,
    SidebarComponent,
    GroupsPanelComponent,
    ArchivePanelComponent,
    CalendarPanelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    BirthdayService,
    GroupService,
    ConfirmationDialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
