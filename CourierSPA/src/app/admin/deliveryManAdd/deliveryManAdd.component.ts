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
  submitted = false;
  datasource:any;
  isSearch = false;
  searchText: any;
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
  // getData(obj) {
  //   console.log(this._listFilter);
    
  //     this.deliveryManService.GetAllDelivaryMan().subscribe(r => 
  //       { this.allDeliveryMan = r;
  //         let index=0,
  //         startingIndex=obj.pageIndex * obj.pageSize,
  //         endingIndex=startingIndex + obj.pageSize;
      
  //         this.filteredDeliveryMan = this.allDeliveryMan.filter(() => {
  //           index++;
  //           return (index > startingIndex && index <= endingIndex) ? true : false;
  //         });
  //       }
  //       );
    
    
  // }
  get deliveryManForm() {return this.deliveymanaddForm.controls; }
  GetDivision()
  {
    this.deliveryAddressservice.GetDivisions().subscribe(r => { this.division = r });
  }
  onSelectDivision(event) {
    let value = event.target.value;
    let divId = value;
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
      }, error => {
        this.modalService.openErrorModal(error);
      });
  }
}
