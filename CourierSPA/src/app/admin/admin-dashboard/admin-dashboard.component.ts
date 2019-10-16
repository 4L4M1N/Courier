import { Component, OnInit } from '@angular/core';
import { MerchantsService } from 'src/app/services/merchants.service';
import { IMerchants } from 'src/app/models/IMerchants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  merchants: IMerchants[];
  constructor(private merchantService: MerchantsService) { }

  ngOnInit() {
    this.getAllMerchants();
  }
  getAllMerchants()
  {
    this.merchantService.getMerchants().subscribe(response => { 
      this.merchants = response;
    });
  }
}
