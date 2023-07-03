import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { TopUpComponent } from '../topup/top-up.component';
import { VirtualCardService } from '../virtual-card.service';

export interface UserAmount{
    amount: string;
    phone: string;
}
@Component({
    selector: 'main-name',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

     amount!: string;
     phone!: string;

    closeResult = '';
    dialog: any;
    phone_number: any;
    cardDetails: any;
    prePaidCardBalance: any;
    constructor(
        private matDialog: MatDialog,
        private authService: AuthService,
        private modalService: NgbModal,
        private router: Router,
        private virtualCardService: VirtualCardService
        ) { }

    openDialog(): void {
        const dialogConfig =  new MatDialogConfig();
        dialogConfig.data = "Some data";
        const dialogRef = this.matDialog.open(TopUpComponent, {
            data: {phone: this.phone, amount: this.amount}
        
            
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            this.amount = result;
            if(this.amount != undefined){
                this.addFundsToCard();
            }
            
          });
    }

    ngOnInit(): void { 
        //get user phone number from local storage
        this.phone_number = localStorage.getItem('phonenumber')!;
        this.getCardDetails();
        
    }

    //get card details
    getCardDetails(){
        this.virtualCardService.getCardDetails(this.phone_number).subscribe(
            (response: any) => {
                this.cardDetails = response.cardbalance;
                this.prePaidCardBalance = response.cardprefund_balance;
                console.log(response);
            });
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.getCardDetails();
    }

    addFundsToCard(){  
        this.virtualCardService.topUpCard(this.phone_number, +this.amount).subscribe(
            (response: any) => {
                console.log(response);
                this.getCardDetails();
            });
            
     }
      
    //fuction to top up credit card with momo api
    topUpFromMomo(){
        console.log('top up from momo');    
    }
}
