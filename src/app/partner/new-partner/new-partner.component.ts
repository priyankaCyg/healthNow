import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { PartnerRoutingModule } from '../partner-routing.module';
import { AddressComponent } from '../address/address.component';
import { ContactComponent } from '../contact/contact.component';
import { BankComponent } from '../bank/bank.component';
import { GstComponent } from '../gst/gst.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { PartnerMaster } from 'src/app/model/partner.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-new-partner',
  templateUrl: './new-partner.component.html',
  styleUrls: ['./new-partner.component.css']
})
export class NewPartnerComponent implements OnInit {
  items: MenuItem[];

  address: any[];

  contact: any[];

  bank: any[];

  gst: any[];

  isEdit: boolean = false
  public PartnerForm: FormGroup;
  partnerData: PartnerMaster;
  statusData;
  entityData;
  partner_id;
  selectedStatus;
  selectedEntity;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Partner', routerLink: ['/app/partner'] }
    ]);
  }

  ngOnInit(): void {

    this.defaultDropDwnValue()
    this.partnerData = new PartnerMaster();
    this.PartnerForm = this.createControl(this.partnerData);
    this.partner_id = this.route.snapshot.params['iPartnerID'];

    if (this.partner_id != null) {
      this.isEdit = true
      let partner_id = +this.route.snapshot.params['iPartnerID'];
      var dataToSendEdit = {
        "iRequestID": 2288,
        "iPartnerID": partner_id
      }
      // this.apiService.getDropDownData(dataToSendEdit).then(response => {
      //   this.partnerData = new PartnerMaster(response[0]);
      //   this.PartnerForm = this.createControl(this.partnerData);

      //   Promise.all([this.getstatusDrpDwn(),this.getEntityDrpDwn()]).then(values => {
      //     console.log(values);
      //     this.setDropDownVal()
      //   });

      // });
      this.apiService.callPostApi(dataToSendEdit).subscribe(
        data => {
          console.log(data.body, "check")
          this.partnerData = new PartnerMaster(data.body[0]);
          this.PartnerForm = this.createControl(this.partnerData);

          Promise.all([this.getstatusDrpDwn(), this.getEntityDrpDwn()]).then(values => {
            console.log(values);
            this.setDropDownVal()
          });
        });

    }
    else {
      this.isEdit = false
      Promise.all([this.getstatusDrpDwn(), this.getEntityDrpDwn()]).then(values => {
        console.log(values);
      });
    }

    this.address = [
      { addressType: 'Registered', address1: '13, Gandhi Bhuvan Chunam Lane', address2: 'Db Road, Lamington Road, Grant Road, East, Mumabi.', state: 'Maharashtra', city: 'Mumbai', landmark: 'Db Road' },
      { addressType: 'Registered', address1: '| 319, Hariom Plaza,', address2: 'M.g Road, Borivali East,', state: 'Maharashtra', city: 'Mumabi', landmark: 'M.g Road' },
      { addressType: 'Warehouse', address1: 'Trishul, 3rd Floor, Opposite Samartheshwar Temple,', address2: 'Near Law Garden, Ellisbridge,Opposite Samartheshwar Temple', state: 'Gujarat', city: 'AHMEDABAD', landmark: 'Samartheshwar Temple' }

    ];
    this.getPartnerContactList();

    this.bank = [
      { bankName: 'ICICI', shortCode: 'ICI', accountNo: '12335568998', ifsc: 'ICICI00022', branch: 'Borivali' },
      { bankName: 'Kotak Mahindra', shortCode: 'KKM', accountNo: '45671471474122', ifsc: 'KKM45454', branch: 'Thane' },
      { bankName: 'SBI', shortCode: 'SBI', accountNo: '874411011477', ifsc: 'SBI000477', branch: 'Pune' },
      { bankName: 'HDFC', shortCode: 'HDFC', accountNo: '41214122445', ifsc: 'HDF000078', branch: 'Kandivali' },
      { bankName: 'Axis', shortCode: 'AX', accountNo: '658989878998', ifsc: 'AX7009987', branch: 'Bhiwandi' }
    ];

    this.gst = [
      { state: 'Maharashtra', GST: '27ADUPH3114M' },
      { state: 'Goa', GST: '66ADUPH37411G' },
      { state: 'Gujrat', GST: '45ADUPH5824G' }
    ];

  }


  defaultDropDwnValue() {
    this.selectedStatus = { iStatusID: "", sStatusName: "Select Status" }
    this.selectedEntity = { iKVID: "", sKVValue: "Select Legal Entity" }
  }

  setDropDownVal() {
    // Status Dropdown Selet
    let selectedStatusObj = this.statusData.find(x => x.iStatusID == this.partnerData.iStatusID);
    if (selectedStatusObj !== undefined) {
      this.selectedStatus = selectedStatusObj;
    }

    // Legal ENtity Dropdown Select
    let selectedEntityObj = this.entityData.find(x => x.iKVID == this.partnerData.iLegalEntityID);
    if (selectedEntityObj !== undefined) {
      this.selectedEntity = selectedEntityObj;
    }
  }

  //Dropdown Validity
  dropDownValidityCheck() {
    if (this.selectedStatus.iStatusID == '') {
      return true
    }
    if (this.selectedEntity.iKVID == '') {
      return true
    }
    else {
      return false
    }
  }

  //Status dropdown
  getstatusDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend4 = {
        "iRequestID": 2271,
        "sProcessName": "Partner"
      }
      this.apiService.getDropDownData(dataToSend4).then(response => {
        this.statusData = response
        this.statusData.splice(0, 0, { iStatusID: "", sStatusName: "Select Status" })
        this.selectedStatus = { iStatusID: "", sStatusName: "Select Status" }
        resolve(this.statusData)
      });
    })
  }

  //Legal Entity dropdown
  getEntityDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend = {
        "iRequestID": 2071,
        "sKVName": "LegalEntity"
      }
      this.apiService.getDropDownData(dataToSend).then(response => {
        this.entityData = response
        this.entityData.splice(0, 0, { iKVID: "", sKVValue: "Select Legal Entity" })
        this.selectedEntity = { iKVID: "", sKVValue: "Select Legal Entity" }
        resolve(this.entityData)
      });
    })
  }


  createControl(partnerData?: PartnerMaster): FormGroup {
    this.PartnerForm = this.fb.group({
      sPAN: [partnerData.sPAN, [Validators.required]],
      sFaxNo: [partnerData.sFaxNo, [Validators.required]],
      sTelNo1: [partnerData.sTelNo1, [Validators.required]],
      sTelNo2: [partnerData.sTelNo2, [Validators.required]],
      iStatusID: [partnerData.iStatusID, [Validators.required]],
      iCreatedBy: [partnerData.iCreatedBy],
      iPartnerID: [partnerData.iPartnerID],
      sShortCode: [partnerData.sShortCode, [Validators.required]],
      sStatusName: [partnerData.sStatusName, [Validators.required]],
      sCreatedDate: [partnerData.sCreatedDate, [Validators.required]],
      sPartnerName: [partnerData.sPartnerName],
      iLegalEntityID: [partnerData.iLegalEntityID, [Validators.required]],
    });
    return this.PartnerForm;
  }

  // Add Partner form
  addPartnerForm() {
    var formData = this.PartnerForm.getRawValue();
    const addPartnerData = {
      "iRequestID": 2281,
      "sPartnerName": formData.sPartnerName,
      "iLegalEntityID": formData.iLegalEntityID.iKVID,
      "sPAN": formData.sPAN,
      "sShortCode": formData.sShortCode,
      "sTelNo1": formData.sTelNo1,
      "sTelNo2": formData.sTelNo2,
      "sFaxNo": formData.sFaxNo,
      "iStatusID": formData.sStatusName.iStatusID
    }
    console.log(addPartnerData)
    this.apiService.callPostApi(addPartnerData).subscribe(
      data => {
        console.log(data);
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      },
      error => console.log(error)
    );
    this.PartnerForm.reset();
  }

  // Edit Partner Form
  editPartnerForm() {
    var formData = this.PartnerForm.getRawValue();
    const editPartnerData = {
      "iRequestID": 2282,
      "sPartnerName": formData.sPartnerName,
      "iLegalEntityID": formData.iLegalEntityID.iKVID,
      "sPAN": formData.sPAN,
      "sShortCode": formData.sShortCode,
      "sTelNo1": formData.sTelNo1,
      "sTelNo2": formData.sTelNo2,
      "sFaxNo": formData.sFaxNo,
      "iStatusID": formData.sStatusName.iStatusID,
      "iPartnerID": +this.partner_id
    }
    console.log(editPartnerData)
    this.apiService.callPostApi(editPartnerData).subscribe(
      data => {
        console.log(data);
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
      },
      error => console.log(error)
    );
  }

  openDialogForaddAddress() {
    const ref = this.dialogService.open(AddressComponent, {
      data: {
      },
      header: 'Add Address',
      width: '80%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForaddContact() {
    const ref = this.dialogService.open(ContactComponent, {
      data: {
      },
      header: 'Add Contact',
      width: '80%'
    });
    localStorage.setItem('iPartnerID', this.route.snapshot.params['iPartnerID'])
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getPartnerContactList();
      }
    });
  }

  openDialogForeditContact(contact: any) {
    const ref = this.dialogService.open(ContactComponent, {
      data: contact,
      header: 'Edit Contact',
      width: '80%'
    });
    localStorage.setItem('iPartnerID', this.route.snapshot.params['iPartnerID'])
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getPartnerContactList();
      }
    });
  }

  deletepartnerContact(iPartnerContactID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let delete_data_api = {
          "iRequestID": 2303,
          "iPartnerContactID": iPartnerContactID
        };
        this.apiService.callPostApi(delete_data_api).subscribe(
          (data) => {
            console.log(data);

            this.getPartnerContactList();
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
          },
          (error) => console.log(error)
        );
      }

    });
  }

  getPartnerContactList() {
    const Partner_contact_list_api =
    {
      "iRequestID": 2304,
      "iPartnerID": +this.partner_id
    }
    this.apiService.callPostApi(Partner_contact_list_api).subscribe(
      data => {
        console.log(data);
        this.contact = data.body;
      },
      error => console.log(error)
    );
  }
  openDialogForBank() {
    const ref = this.dialogService.open(BankComponent, {
      data: {
      },
      header: 'Add Bank',
      width: '80%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForGST() {
    const ref = this.dialogService.open(GstComponent, {
      data: {
      },
      header: 'Add GST',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
}


