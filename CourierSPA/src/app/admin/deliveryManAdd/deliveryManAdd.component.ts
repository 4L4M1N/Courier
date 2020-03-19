import { Component, OnInit } from '@angular/core';
import { IDeliveryMan } from 'src/app/models/IDeliveryMan';
import { FormGroup, FormControl } from '@angular/forms';
import { DeliveryManService } from 'src/app/services/DeliveryMan.service';
import { ModalService } from 'src/app/services/Dialog/modal.service';
import { phoneValidator } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-deliveryManAdd',
  templateUrl: './deliveryManAdd.component.html',
  styleUrls: ['./deliveryManAdd.component.css']
})
export class DeliveryManAddComponent implements OnInit {

  deliveryMan: IDeliveryMan;
  deliveymanaddForm: FormGroup;

  constructor(private deliveryManService: DeliveryManService, private modalService: ModalService) { }

  ngOnInit() {
    this.deliveymanaddForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
    });
  }
  Create() {
    if (this.deliveymanaddForm.valid) {
      this.deliveryMan = Object.assign({}, this.deliveymanaddForm.value);

      this.deliveryManService.Create(this.deliveryMan).subscribe(() => {
        console.log('created');
        this.openInfoModal();
      }, error => {
        console.log('error');
      });
  }}
  openInfoModal() {
    this.modalService.openInfoModal('Delivery Man added');
  }

}
