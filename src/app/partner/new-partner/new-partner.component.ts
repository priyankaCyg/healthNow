import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { CountryService } from '../../demo/service/countryservice';
import { SelectItem, MenuItem, ConfirmationService } from 'primeng/api';
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
import { companyBankMaster } from 'src/app/model/companyBank.model';
import { gstData } from 'src/app/model/gst';
import { PartnerAddress } from 'src/app/model/partner_address.model';

@Component({
  selector: 'app-new-partner',
  templateUrl: './new-partner.component.html',
  styleUrls: ['./new-partner.component.css']
})

export class NewPartnerComponent implements OnInit {

  items: MenuItem[];
  contact: any[];
  gst: gstData[];
  isEdit: boolean = false;
  tabDisabled: boolean = true;
  public PartnerForm: FormGroup;
  partnerData: PartnerMaster;
  bankData: companyBankMaster[];
  partnerAdressData: PartnerAddress;
  entityData;
  partner_id;
  selectedEntity;
  index: number = 0;

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService, private route: ActivatedRoute,
    private httpService: ApiService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Partner', routerLink: ['/partner'] }
    ]);
  }

  ngOnInit(): void {

    this.defaultDropDwnValue()
    this.partnerData = new PartnerMaster();
    this.PartnerForm = this.createControl(this.partnerData);
    // this.partner_id = +this.route.snapshot.params['iPartnerID'];
    // localStorage.setItem('iPartnerID', this.partner_id);
    if(this.route.snapshot.params['iPartnerID']){
      this.partner_id = +this.route.snapshot.params['iPartnerID'];
      localStorage.setItem('iPartnerID', this.partner_id)
      }
      else{
        this.partner_id = +localStorage.getItem("iPartnerID");
      }
    if (this.partner_id) {
      this.isEdit = true;
      this.tabDisabled = false;
      var dataToSendEdit = {
        "iRequestID": 2288,
        "iPartnerID": this.partner_id
      }
      this.httpService.callPostApi(dataToSendEdit).subscribe(
        data => {
          this.partnerData = new PartnerMaster(data.body[0]);
          this.PartnerForm = this.createControl(this.partnerData);
          Promise.all([this.getEntityDrpDwn()]).then(values => {
            console.log(values);
            this.setDropDownVal()
          });
          this.getPartnerAddressList();
          this.bankSelectData();
          this.getPartnerContactList();
          this.gstList();
        });
    }
    else {
      this.isEdit = false;
      Promise.all([this.getEntityDrpDwn()]).then(values => {
        console.log(values);
      });
    }
  }

  // Function to Set Default dropdown value
  defaultDropDwnValue() {
    this.selectedEntity = { iKVID: "", sKVValue: "Select Legal Entity" }
  }

  //Function to set dropdown value on edit
  setDropDownVal() {

    // Legal ENtity Dropdown Select
    let selectedEntityObj = this.entityData.find(x => x.iKVID == this.partnerData.iLegalEntityID);
    if (selectedEntityObj !== undefined) {
      this.selectedEntity = selectedEntityObj;
    }
  }

  //Function to check Dropdown Validation
  dropDownValidityCheck() {
    if (this.selectedEntity.iKVID == '') {
      return true;
    }
    else {
      return false;
    }
  }


  //Function to call Legal Entity dropdown API
  getEntityDrpDwn() {
    return new Promise((resolve, reject) => {
      var dataToSend = {
        "iRequestID": 2071,
        "sKVName": "LegalEntity"
      }
      this.httpService.getDropDownData(dataToSend).then(response => {
        this.entityData = response
        this.entityData.splice(0, 0, { iKVID: "", sKVValue: "Select Legal Entity" })
        this.selectedEntity = { iKVID: "", sKVValue: "Select Legal Entity" }
        resolve(this.entityData)
      });
    })
  }

  createControl(partnerData?: PartnerMaster): FormGroup {
    this.PartnerForm = this.fb.group({
      sPAN: [partnerData.sPAN, [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]],
      sFaxNo: [partnerData.sFaxNo, [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]],
      sTelNo1: [partnerData.sTelNo1, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')])],
      sTelNo2: [partnerData.sTelNo2, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')])],
      iCreatedBy: [partnerData.iCreatedBy],
      iPartnerID: [partnerData.iPartnerID],
      sShortCode: [partnerData.sShortCode, [Validators.required]],
      sCreatedDate: [partnerData.sCreatedDate],
      sPartnerName: [partnerData.sPartnerName, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      iLegalEntityID: [partnerData.iLegalEntityID, [Validators.required]],
    });
    return this.PartnerForm;
  }

  // Function to add partnet details
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
    }
    this.httpService.callPostApi(addPartnerData).subscribe(
      data => {
        this.partner_id = data.body[0].iPartnerID;
        localStorage.setItem('iPartnerID', this.partner_id);
        this.getPartnerAddressList();
        this.bankSelectData();
        this.getPartnerContactList();
        this.gstList();
        this.tabDisabled = false;
        this.index = 1;
        let msg = "Partner "+ formData.sPartnerName + " Added Successfully"
        this.toastService.displayApiMessage(msg, data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }

  // Function to update partner details
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
      "iPartnerID": this.partner_id
    }
    this.httpService.callPostApi(editPartnerData).subscribe(
      data => {
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }

  //Function to display Address list 
  getPartnerAddressList() {
    const partnerAddressAPI = {
      "iRequestID": 2294,
      "iPartnerID": this.partner_id
    }
    this.httpService.callPostApi(partnerAddressAPI).subscribe(
      data => { this.partnerAdressData = data.body },
      error => { console.log(error) }
    )
  }

  // Dialog box to add address
  openDialogForaddAddress() {
    const ref = this.dialogService.open(AddressComponent, {
      data: {},
      header: 'Add New Address',
      width: '80%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getPartnerAddressList();
      }
    });
  }

  // Dialog box to edit address
  editPartnerAddress(partnerAddID) {
    const ref = this.dialogService.open(AddressComponent, {
      data: {
        "iPartnerAddID": partnerAddID
      },
      header: 'Edit Address',
      width: '80%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getPartnerAddressList();
      }
    });
  }

  // Dialog box to delete Address
  deletePartnerAddress(partnerAddID) {
    console.log(partnerAddID);
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete this Record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var deleteAddressAPI = {
          "iRequestID": 2293,
          "iPartnerAddID": partnerAddID
        }
        this.httpService.callPostApi(deleteAddressAPI).subscribe(
          data => {
            this.getPartnerAddressList();
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          },
          error => { console.log(error) }
        );
      }
    });
  }

  // Function for Bank table data
  bankSelectData() {
    const selectBank_data = {
      "iRequestID": 2314,
      "iPartnerID": this.partner_id
    };
    this.httpService.callPostApi(selectBank_data).subscribe(
      (data) => {
        this.bankData = data.body;
      },
      (error) => console.log(error)
    );
  }

  //Function to open dialog box to Add bank details
  openDialogForBank() {
    const ref = this.dialogService.open(BankComponent, {
      data: {},
      header: "Add New Bank",
      width: "50%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.bankSelectData();
      }
    });
  }

  // Function to open dialog box to Update bank details
  updateBank(bank) {
    const ref = this.dialogService.open(BankComponent, {
      data: bank,
      header: "Edit Bank",
      width: "50%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.bankSelectData();
      }
    });
  }

  // Function to delete Bank details
  deleteBank(bank) {
    let bank_id = bank.iBankID;
    let partner_id = bank.iPartnerID;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteBank_data = {
          "iRequestID": 2313,
          "iPartnerID": partner_id,
          "iBankID": bank_id
        };
        this.httpService.callPostApi(deleteBank_data).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.bankSelectData();
          },
          (error) => console.log(error)
        );
      },
      reject: () => { }
    });
  }

  openDialogForaddContact() {
    const ref = this.dialogService.open(ContactComponent, {
      data: {
      },
      header: 'Add Contact',
      width: '80%'
    });
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
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            console.log(data);
            this.getPartnerContactList();
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          },
          (error) => console.log(error)
        );
      }
    });
  }
  getPartnerContactList() {
    const Partner_contact_list_api = {
      "iRequestID": 2304,
      "iPartnerID": this.partner_id
    }
    this.httpService.callPostApi(Partner_contact_list_api).subscribe(
      data => {
        console.log(data);
        this.contact = data.body;
      },
      error => console.log(error)
    );
  }

  // code for open dialog for add gst
  openDialogForGST() {
    const ref = this.dialogService.open(GstComponent, {
      data: {},
      header: 'Add New GST',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.gstList();
      }
    });
  }

  // code for open dialog for edit gst
  editDialogForGST(gst) {
    const ref = this.dialogService.open(GstComponent, {
      data: gst,
      header: 'Edit GST',
      width: '28%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.gstList();
      }
    });
  }

  //code for delete gst data
  deletesupgst(gst_id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let delete_data_api = {
          "iRequestID": 2325,
          "iLocID": gst_id,
          "iPartnerID": this.partner_id
        };
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.gstList();
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //code for show all gst list 
  gstList() {
    const sup_gst_data = {
      "iRequestID": 2323,
      "iPartnerID": this.partner_id
    }
    this.httpService.callPostApi(sup_gst_data).subscribe(
      (data) => {
        this.gst = data.body;
      },
      (error) => console.log(error)
    );
  }
}
