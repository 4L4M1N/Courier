import { Component, OnInit } from '@angular/core';
import { IMerchants } from 'src/app/models/IMerchants';
import { HttpClient } from '@angular/common/http';
import { Merchants } from 'src/app/models/Merchants';
import { MerchantService } from 'src/app/services/Merchant.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  // merchants: IMerchants[]; // previous
  merchants: Merchants[];
  constructor(private merchantService: MerchantService) { }

  ngOnInit() {
    // this.getAllMerchants();
    this.loadMerchants();
  }

  loadMerchants() {
    this.merchantService.GetAllMerchants().subscribe((merchants: Merchants[]) => {
      this.merchants = merchants;
    }, error => {
      console.log('error');
    });
  }
/*
  getAllMerchants() {
    this.merchantService.getMerchants().subscribe(response => {
      this.merchants = response;
    }, error => {
      console.log('error');
    });
  }
  */
}
