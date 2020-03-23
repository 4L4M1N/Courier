import { Component, OnInit, ViewChild } from '@angular/core';
import { IDeliveryMan } from 'src/app/models/IDeliveryMan';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeliveryManService } from 'src/app/services/DeliveryMan.service';
import { ModalService } from 'src/app/services/Dialog/modal.service';
import { phoneValidator } from 'src/app/validators/custom.validators';
import { DeliveryAddressService } from 'src/app/services/deliveryAddress.service';
import { Division } from 'src/app/models/division';
import { Zone } from 'src/app/models/zone';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-deliveryManAdd',
  templateUrl: './deliveryManAdd.component.html',
  styleUrls: ['./deliveryManAdd.component.css']
})
export class DeliveryManAddComponent implements OnInit {

  deliveryMan: IDeliveryMan;
  deliveymanaddForm: FormGroup;
  allDeliveryMan: any;
  deliveryManIdentity: string;
  submitted = false;
  datasource:any;
  isSearch = false;
  searchText: any;
  isModify = false;
  _listFilter = '';
  p: number = 1;
  page = 0;
  size = 4; //displaying three cards each row
  pageSizeOptions: number[] = [3, 6, 9, 12];
  division: Division[]; // get all divisions and populate dropdown
  listZones: Zone[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private deliveryManService: DeliveryManService,
              private deliveryAddressservice: DeliveryAddressService,
              private modalService: ModalService) { 
                this.deliveryAddressservice.GetDivisions().subscribe(r => { this.division = r });
               
              }

  ngOnInit() {
    
    this.deliveymanaddForm = new FormGroup({
      name: new FormControl('',Validators.required),
      phone: new FormControl('',[Validators.required,phoneValidator]),
      password: new FormControl(''),
      nid: new FormControl('',Validators.required),
      zoneid: new FormControl('',Validators.required),
      divisionid: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      ecPhone: new FormControl('',[Validators.required,phoneValidator]),
      ecName: new FormControl('',Validators.required),
      ecAddress: new FormControl(''),
    });
    
    //this.getData({pageIndex: this.page, pageSize: this.size});
    //console.log(this.filteredDeliveryMan.length);
    this.getData();
  }
  get listFilter():string {
    return this._listFilter;
  }
  set listFilter(value:string) {
    this._listFilter = value;
    this.filteredDeliveryMan = this.listFilter ? this.performFilter(this.listFilter): this.allDeliveryMan;

  }
  performFilter(filterBy: string):IDeliveryMan[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.allDeliveryMan.filter((man:IDeliveryMan) =>man.name.toLocaleLowerCase().indexOf(filterBy)!=-1);
  }
  filteredDeliveryMan: any[];
    getData(){
      this.deliveryManService.GetAllDelivaryMan().subscribe(r=> {
        this.allDeliveryMan = r;
        this.filteredDeliveryMan = this.allDeliveryMan;
      })
    }
  get deliveryManForm() {return this.deliveymanaddForm.controls; }
  GetDivision()
  {
    this.deliveryAddressservice.GetDivisions().subscribe(r => { this.division = r });
  }
  onSelectDivision(event) {
    let value = event.target.value;
    let divId = value;
    this.deliveymanaddForm.controls['zoneid'].setValue('');
    //console.log(divId);
    this.GetZonesOnChange(divId);
  }
  GetZonesOnChange(divId)
  {
    console.log(divId);
    if (divId === 0) {
      this.listZones == null;
    } else {
      this.deliveryAddressservice.GetZonesOfADivison(divId).subscribe(data => {
        this.listZones = data;
      });
    }
  }
  Create() {
    this.submitted = true;
    if (this.deliveymanaddForm.invalid) {
      return ;
    }
    this.deliveryMan = Object.assign({}, this.deliveymanaddForm.value);

    this.deliveryManService.Create(this.deliveryMan).subscribe((response) => {
        this.modalService.openInfoModal(response);
        this.getData();
      }, error => {
        this.modalService.openErrorModal(error);
      });
  }
  onDeliveryManClick(deliveryMan)
  {
    this.isSearch = true;
    this.deliveryManIdentity = deliveryMan.delivManIdentity;
    console.log(this.deliveryManIdentity);
    this.deliveymanaddForm.controls['name'].setValue(deliveryMan.name);
    this.deliveymanaddForm.controls['phone'].setValue(deliveryMan.phone);
    this.deliveymanaddForm.controls['nid'].setValue(deliveryMan.nid);
    this.deliveymanaddForm.controls['address'].setValue(deliveryMan.address);
    this.deliveymanaddForm.controls['ecPhone'].setValue(deliveryMan.ecPhone);
    this.deliveymanaddForm.controls['ecName'].setValue(deliveryMan.ecName);
    this.deliveymanaddForm.controls['ecAddress'].setValue(deliveryMan.ecAddress);
    this.deliveymanaddForm.controls['divisionid'].setValue(deliveryMan.zone.divisionId);
    this.GetDivision();
    this.GetZonesOnChange(deliveryMan.zone.divisionId);
    this.deliveymanaddForm.controls['zoneid'].setValue(deliveryMan.zone.zoneId);
  }
  UpdateDeliveryMan()
  {
    this.submitted = true;
    if (this.deliveymanaddForm.invalid) {
      return ;
    }
    this.deliveryMan = Object.assign({}, this.deliveymanaddForm.value);
    this.deliveryMan.delivManIdentity = this.deliveryManIdentity;
    this.deliveryManService.Update(this.deliveryMan).subscribe((response) => {
      this.modalService.openInfoModal(response);
      this.getData();
    }, error => {
      this.modalService.openErrorModal(error);
    });
    console.log(this.deliveryMan);
  }
}

