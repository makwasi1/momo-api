import { Component,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'otp',
  templateUrl: './otp.html',
  styleUrls: ['./otp.css']
})
export class OtpComponent {
 
  otp: any ;
  showOtpComponent = true; 

@ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 6, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "30px", height: "50px", }, }; 

constructor(private router: Router) {} 
 onOtpChange(otp: string) {
   this.otp = otp; 
  // When all 4 digits are filled, trigger OTP validation method 
  if (otp.length == 6) { this.validateOtp(); } } 
  
  setVal(val: any) { this.ngOtpInput.setValue(val); } 
  onConfigChange() { this.showOtpComponent = false; this.otp = null; setTimeout(() => { this.showOtpComponent = true; }, 0); } 
  validateOtp() {
    console.log('validateOtp');
    this.router.navigate(['/create']);
  }
  

  

    ngOnInit() {
        console.log('ngOnInit');
        
    }

  
 
  handleOtpChange(value: string) {
    console.log(value);
  }


  //get the otp from the user input and make firebase request
  handleFillEvent(value: string) {
    if(value.length >= 4) {
      setTimeout(() => {
        alert('OTP is filled');
        this.router.navigate(['/create']);
      }, 1000);
    }
    console.log(value);
  }

}
