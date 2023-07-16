import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DemoPageComponent } from './pages/demo/demo.component';
import { DemoComponent } from './components/demo/demo.component';
import { DemoPipe } from './pipes/demo.pipe';
import { DemoDirective } from './directives/demo.directive';
import { SecurityPageComponent } from './pages/security/security-page/security-page.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, DemoPageComponent, DemoComponent, DemoPipe, DemoDirective, SecurityPageComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
