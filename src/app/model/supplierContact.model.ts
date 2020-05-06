
export class SupplierContactMaster {
   
    iCreatedBy: string;
    iStatusID: string;
    iSupAddID: string;
    iSupContactID: string;
    iSupID: string;
    sAddress: string;
    sContactNo: string;
    sCreatedDate: string;
    sDesignation: string;
    sDirectNo: string;
    sEmailID: string;
    sFaxNo: string;
    sFullName: string;
    sMobileNo: string;
    sPOBox: string;
    sStatusName: string;
    sSupName: string;

    /**
     * Constructor
     *
     * @param SupplierContactMaster
     */
    constructor(SupplierContactMaster?) {
        SupplierContactMaster = SupplierContactMaster || {};

        this.iCreatedBy = SupplierContactMaster.iCreatedBy || '';
        this.iStatusID = SupplierContactMaster.iStatusID || '';
        this.iSupAddID = SupplierContactMaster.iSupAddID || '';
        this.iSupContactID = SupplierContactMaster.iSupContactID || '';
        this.iSupID = SupplierContactMaster.iSupID || '';
        this.sAddress = SupplierContactMaster.sAddress || '';
        this.sContactNo = SupplierContactMaster.sContactNo || '';
        this.sCreatedDate = SupplierContactMaster.sCreatedDate || '';
        this.sDesignation = SupplierContactMaster.sDesignation || '';
        this.sDirectNo = SupplierContactMaster.sDirectNo || '';
        this.sEmailID = SupplierContactMaster.sEmailID || '';
        this.sFaxNo = SupplierContactMaster.sFaxNo || '';
        this.sFullName = SupplierContactMaster.sFullName || '';
        this.sMobileNo = SupplierContactMaster.sMobileNo || '';
        this.sPOBox = SupplierContactMaster.sPOBox || '';
        this.sStatusName = SupplierContactMaster.sStatusName || '';
        this.sSupName = SupplierContactMaster.sSupName || '';



    }
}