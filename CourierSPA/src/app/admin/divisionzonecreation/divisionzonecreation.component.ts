import { IDivision } from './../../models/IDivision';
import { DeliveryAddressService } from 'src/app/services/deliveryAddress.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Zone } from 'src/app/models/zone';

@Component({
  selector: 'app-divisionzonecreation',
  templateUrl: './divisionzonecreation.component.html',
  styleUrls: ['./divisionzonecreation.component.css']
})
export class DivisionzonecreationComponent implements OnInit {

  division: IDivision[];

  zone: Zone;
  zonesOfAivision;

  loadDivision;

  createDivFrom: FormGroup;

  createZoneFrom: FormGroup;

  constructor(private deliveryAddressService: DeliveryAddressService) { }

  ngOnInit() {

    this.getDivisions();

    this.createDivFrom = new FormGroup({
      divisionName: new FormControl(''),
    });

    this.createZoneFrom = new FormGroup({
      divisionid: new FormControl(''),
      zoneName: new FormControl('')
    });
  }
  createDivision() {
    if (this.createDivFrom.valid) {
      const formData = new FormData();
      const divisionName = this.createDivFrom.controls['divisionName'].value;
      formData.append('divisionName', divisionName);
      this.deliveryAddressService.CreateDivision(formData).subscribe(() => {
        console.log('created');
      }, error => {
        console.log('error');
      });
  }}

  getDivisions() {
    this.deliveryAddressService.GetDivisions().subscribe(d => this.division = d);
  }



  onSelect(event) {
    let value = event.target.value;
    let divisionId = value;
    console.log(divisionId);
    if (divisionId === 0) {
      this.zonesOfAivision  == null;
    } else {
      this.zonesOfAivision = this.deliveryAddressService.GetZonesOfADivison(value);
      //this.deliveryAddressService.GetZonesOfADivison(<Zone>).subscribe(data => this.zonesOfAivision = data)
      console.log(this.zonesOfAivision);
    }
  }

  CreateZone() {
    if (this.createZoneFrom.valid) {
      console.log(this.createZoneFrom.value);
      this.zone =  Object.assign({}, this.createZoneFrom.value);
      console.log(this.zone);
      this.deliveryAddressService.CreateZone(this.zone).subscribe(() => {
        console.log('ok');
      }, error => {
        console.log('error');
      });
    }
  }

}
