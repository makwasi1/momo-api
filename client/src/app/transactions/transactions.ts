import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { VirtualCardService } from '../virtual-card.service';
declare var $:any;



@Component({
  selector: 'transactions',
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss']
})
export class TransactionsComponent implements OnInit{

 card: any;
  phone_number: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvv: any;
    
  constructor(private virtualCard : VirtualCardService){}

  links = ['Card', 'Transactions'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  ngOnInit(){
    this.phone_number = localStorage.getItem('phonenumber')!;
    this.getCardNoAndDetails();
  }

  //get the card details and transactions history for the logged in user
  getUserCardDetails(link: any){
    this.activeLink = link;
    console.log('get user card details', link);
    
  }

  getCardNoAndDetails(){
    this.virtualCard.getCardDetails(this.phone_number).subscribe(
      (response: any) => {
          this.card = response.cardholdername;
          this.cardNumber = response.cardnumber;
          this.cardExpiry = response.cardexpiry;
          this.cardCvv = response.cardcvv;
          console.log(this.card);
      });
  }
  

  ccAppend (data: { id: string; type: string; 
    number: string; month: string; 
    year: string; }) {
    $(".cc-select").append(
        '<div id="'+data.id+'" class="cc ' +
        data.type +
        '">\
        <div class="cc-img-main"></div>\
        <div class="cc-num">' +
        data.number +
        '</div>\
        <div class="cc-date">Valid Thru: ' +
        data.month +
        "/" +
        data.year +
        "</div>\
        </div>"
      )	
  }

    
}
