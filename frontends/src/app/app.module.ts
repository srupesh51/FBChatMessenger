import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor} from './helpers/jwt.interceptor';
import { ErrorInterceptor} from './helpers/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { AlertComponent } from './directives/alert.component';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { SocketioService } from './services/socketio.service';
import { AuthenticationService } from './services/authentication.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SenderComponent } from './sender/sender.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    SenderComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [
    UserService,
    AlertService,
    AuthGuard,
    AuthenticationService,
    MessageService,
    SocketioService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
