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
@Component({
  selector: 'app-new-partner',
  templateUrl: './new-partner.component.html',
  styleUrls: ['./new-partner.component.css']
})
export class NewPartnerComponent implements OnInit {
  items: MenuItem[];

  address: any[];

  contact: any[];

  //partner: any[];

  gst: any[];

  isEdit: boolean = false
  public PartnerForm: FormGroup;
  partnerData: PartnerMaster;
  bankData: companyBankMaster[];
  statusData;
  entityData;
  partner_id;
  selectedStatus;
  selectedEntity;

   constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService, private route: ActivatedRoute,
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
    localStorage.setItem('iPartnerID', this.route.snapshot.params['iPartnerID']);
    if (this.partner_id != null) {
      this.isEdit = true
      let partner_id = +this.route.snapshot.params['iPartnerID'];
      var dataToSendEdit = {
        "iRequestID": 2288,
        "iPartnerID":partner_id
      }
      this.apiService.callPostApi(dataToSendEdit).subscribe(
        data => {console.log(data.body,"check")
        this.partnerData = new PartnerMaster(data.body[0]);
        this.PartnerForm = this.createControl(this.partnerData);

        Promise.all([this.getstatusDrpDwn(),this.getEntityDrpDwn()]).then(values => {
          console.log(values);
          this.setDropDownVal()
        });
      });

    }
    else {
      this.isEdit = false
      Promise.all([this.getstatusDrpDwn(),this.getEntityDrpDwn()]).then(values => {
        console.log(values);
      });
    }
     this.bankSelectData();
    this.address = [
      {addressType:'Registered',	address1:'13, Gandhi Bhuvan Chunam Lane',	address2:'Db Road, Lamington Road, Grant Road, East, Mumabi.',	state:'Maharashtra',	city:'Mumbai',	landmark:'Db Road'},
      {addressType:'Registered',	address1:'| 319, Hariom Plaza,',	address2:'M.g Road, Borivali East,',	state:'Maharashtra',	city:'Mumabi',	landmark:'M.g Road'},
      { addressType: 'Warehouse', address1: 'Trishul, 3rd Floor, Opposite Samartheshwar Temple,', address2: 'Near Law Garden, Ellisbridge,Opposite Samartheshwar Temple', state: 'Gujarat', city:'AHMEDABAD',	landmark:'Samartheshwar Temple'}
    
    ];

    this.contact = [
      {fullName: 'Santosh Kadam',designation: 'Sales Executive',emailId: 'santosh@demo.com',partnerAdd: 'Mumbai',mobileNo:'9898989898',contactNo:'123456121',	directNo:'022245454',fax:'242424424' },
      {fullName: 'Pankaj Dubey',designation: 'Sales Executive',emailId: 'pankaj@test.com',partnerAdd: 'Thane',mobileNo:'8585858585',contactNo:'74174174',	directNo:'0222656565',fax:'565655656' },
      {fullName: 'Sanket Patil',designation: 'Sales Executive',emailId: 'sanket@test.com',partnerAdd: 'Gujrat',mobileNo:'878787878',contactNo:'85285285',	directNo:'022454545',fax:'4454545566' },
      {fullName: 'Snehal Jadhav',designation: 'Sales Executive',emailId: 'snehal@test.com',partnerAdd: 'Delhi',mobileNo:'868686868',contactNo:'96396399',	directNo:'0223565656',fax:'3666366336' },
      {fullName: 'Ravi Varma',designation: 'Sales Executive',emailId: 'ravi@test.com',partnerAdd: 'Pune',mobileNo:'97979779797',contactNo:'9879879778',	directNo:'0226969696',fax:'855855855' }
    ];

    
    this.gst= [
      {state:'Maharashtra', GST:'27ADUPH3114M'},
      {state:'Goa', GST:'66ADUPH37411G'},
      {state:'Gujrat', GST:'45ADUPH5824G'}
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
      sPAN: [partnerData.sPAN,[Validators.required,Validators.pattern('^[0-9a-zA-Z]+$')]],
      sFaxNo: [partnerData.sFaxNo,[Validators.required,Validators.pattern('^[0-9a-zA-Z]+$')]],
      sTelNo1: [partnerData.sTelNo1, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(13),Validators.pattern('^[0-9]*$')])],
      sTelNo2: [partnerData.sTelNo2,Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(13),Validators.pattern('^[0-9]*$')])],
      iStatusID: [partnerData.iStatusID],
      iCreatedBy: [partnerData.iCreatedBy],
      iPartnerID: [partnerData.iPartnerID],
      sShortCode: [partnerData.sShortCode,[Validators.required]],
      sStatusName: [partnerData.sStatusName,[Validators.required]],
      sCreatedDate: [partnerData.sCreatedDate],
      sPartnerName: [partnerData.sPartnerName,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
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
   // var temp = addPartnerData.sPAN;
    this.apiService.callPostApi(addPartnerData).subscribe(
      data => {
        console.log(data,"test");
        this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
        // const Partner_list_api =
        // {
        //   "iRequestID": 2287,
        // }
        // this.apiService.callPostApi(Partner_list_api).subscribe(
        //   data => {
        //     console.log(data);
           
        //     this.partner = data.body;
        //     var tempData = this.partner.filter(t => t.sPAN == temp);
        //     this.partner_id= localStorage.setItem('iPartnerID', tempData[0].iPartnerID);
        //     console.log(tempData,"new id")
        //   },
        //   error => console.log(error)
        // );
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
      "iPartnerID":+this.partner_id
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
      const ref = this.dialogService.open( AddressComponent  , {
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
      const ref = this.dialogService.open( ContactComponent  , {
        data: {
        },
        header: 'Add Contact',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          // this.toastService.addSingle("success", "Mail send successfully", "");
        }
      });
    }
    
  // Function for Bank table data
  bankSelectData() {
    const selectBank_data = {
      "iRequestID": 2314,
      "iPartnerID" :+this.partner_id
    };
    this.apiService.callPostApi(selectBank_data).subscribe(
      (data) => {
        console.log(data.body);
        this.bankData = data.body;
      },
      (error) => console.log(error)
    );
  }

  //Dialog box to add bank
  openDialogForBank() {
    const ref = this.dialogService.open(BankComponent, {
      data: {},
      header: "Add New Bank",
      width: "80%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.bankSelectData();
       } 
    });
  }

  // Dialog box to update bank
  updateBank(bank) {
    const ref = this.dialogService.open(BankComponent, {
      data: bank,
      header: "Edit Bank",
      width: "80%",
    });
   
    ref.onClose.subscribe((success: boolean) => {
      if (success) { 
        this.bankSelectData();
      } 
    });
  }

  // Delete function for bank
  deleteBank(bank) {
    let bank_id = bank.iBankID;
    let partner_id = bank.iPartnerID;
    console.log(bank,"test")
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteBank_data = {
          "iRequestID": 2313,
          "iPartnerID" :partner_id,
          "iBankID":bank_id
        };
        console.log(deleteBank_data,"123");
        this.apiService.callPostApi(deleteBank_data).subscribe(
          (data) => {
            console.log(data);
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
            this.bankSelectData();
          },
          (error) => console.log(error)
        );
     
      },
      reject: () => {
      //  this.toastService.addSingle("info", "Rejected", "Rejected");
      }
    });
  }
    openDialogForGST() {
      const ref = this.dialogService.open( GstComponent  , {
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


