import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { WindowService } from '../window.service';
import * as auth from 'firebase/auth';
import * as firebase from 'firebase/app'
import { environment } from 'src/environments/environment.prod';
import { RecaptchaVerifier } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { idToken } from '@angular/fire/auth';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'm-card';
  submitted = true;
  loading = false;
  loginForm!: FormGroup;
  phoneNumber: any;
  windowRef: any;
  user: any;
  otp: any ;
  showOtpComponent = true; 
  showOtpScreen = true;

  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 6, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "30px", height: "50px", }, }; 
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private win: WindowService
  ) { }




  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    // const new_fire = firebase.initializeApp(environment.firebase)
    // this.windowRef = this.win.windowRef;
    // this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    //   size: 'invisible',
    //   callback: (response: any) => {
    //     console.log(response);
    //   }
    // }, auth.getAuth());
    // this.windowRef.recaptchaVerifier.render();
  }

  get f() { return this.loginForm.controls; }

  // showOtpScreen() {

  //   this.router.navigateByUrl('/otp');
  // }

  getPhoneNumber(phone: any) {
     this.phoneNumber = phone;
    //  const appVerifier = this.windowRef.recaptchaVerifier;
     const num = '+256' + this.phoneNumber;
     this.createUserCardDetaildOnStart();

    // auth.signInWithPhoneNumber(getAuth(), num, appVerifier).then(result => {
    //   this.windowRef.confirmationResult = result;
    //   this.createUserCardDetaildOnStart();
    //   this.showOtpScreen = false;
    //   // this.verifyLoginCode();
    // }).catch(error => console.log(error));
  }

  //function that intiates the card creation and store user details
  createUserCardDetaildOnStart(){
    const accessNumber = '256' + this.phoneNumber;
    this.authService.login(this.phoneNumber).subscribe((response: any) => {
          this.showOtpScreen = false;
          console.log(response);
     //store phone number in local storage
      localStorage.setItem('phonenumber', accessNumber);
    }, error => {
      console.log(error);
    });
  }

  //get otp from user input
  onOtpChange(otp: string) {
    this.otp = otp; 
   // When all 4 digits are filled, trigger OTP validation method 
   if (otp.length == 6) { this.validateOtp(); } } 
   
   setVal(val: any) { this.ngOtpInput.setValue(val); } 

   onConfigChange() { 
    this.showOtpComponent = false; 
    this.otp = null; 
    setTimeout(() => { this.showOtpComponent = true; }, 0); 
  }
  
   validateOtp() {
    this.router.navigate(['/create']);
    // this.verifyLoginCode();
   }

  //verify the code for the user phone number
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.otp)
      .then((result: { user: any; }) => {
        this.user = result.user;
        this.router.navigate(['/create']);
        getAuth().currentUser?.getIdToken().then((idToken) => {
          console.log(idToken);
          this.authService.token = idToken;
          //store token in local storage
          localStorage.setItem('accessToken', idToken);
        });
      })
      .catch((error: any) => console.log(error, "Incorrect code entered?"));
  }
}
