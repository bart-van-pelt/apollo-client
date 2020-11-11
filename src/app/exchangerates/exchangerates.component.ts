import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-exchangerates',
  templateUrl: './exchangerates.component.html',
  styleUrls: ['./exchangerates.component.css']
})
export class ExchangeratesComponent implements OnInit {
  rates: any[];
  loading = true;
  error: any;
  
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        var data = result == null ? null: data;
        this.rates = data == null ? null: data.rates;
        //this.rates = result?.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

}
