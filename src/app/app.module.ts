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
import { GroupsPanelComponent } from './sidebar/groups-panel/groups-panel.component';
import { SharedModule } from './shared/shared.module';
import { ArchivePanelComponent } from './sidebar/archive-panel/archive-panel.component';
import { CalendarPanelComponent } from './sidebar/calendar-panel/calendar-panel.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminService } from './admin/admin.service';
import { FormBrandBackgroundComponent } from "../memoflick-ui/form-brand-background/form-brand-background.component";
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { MobileMenuComponent } from './navbar/mobile-menu/mobile-menu.component';
import { HeroComponent } from './home/hero/hero.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';
import { FooterComponent } from './home/footer/footer.component';

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
    NavbarComponent,
    HowItWorksComponent,
    MobileMenuComponent,
    HeroComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
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
    FormBrandBackgroundComponent
],
  providers: [
    AuthService,
    BirthdayService,
    GroupService,
    AdminService,
    ConfirmationDialogService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
