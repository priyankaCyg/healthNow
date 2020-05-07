
export class SupplierBankMaster {
   
    iBankID:string;
    iCreatedBy: string;
    iStatusID: string;
    sAccountNo: string;
    sBankBranch: string;
    sBankName: string;
    sCreatedDate: string;
    sIFSC: string;
    sShortCode: string;


    /**
     * Constructor
     *
     * @param SupplierBankMaster
     */
    constructor(SupplierBankMaster?) {
        SupplierBankMaster = SupplierBankMaster || {};

        this.iBankID = SupplierBankMaster.iBankID || '';
        this.iCreatedBy = SupplierBankMaster.iCreatedBy || '';
        this.iStatusID = SupplierBankMaster.iStatusID || '';
        this.sAccountNo = SupplierBankMaster.sAccountNo || '';
        this.sBankBranch = SupplierBankMaster.sBankBranch || '';
        this.sBankName = SupplierBankMaster.sBankName || '';
        this.sCreatedDate = SupplierBankMaster.sCreatedDate || '';
        this.sIFSC = SupplierBankMaster.sIFSC || '';
        this.sShortCode = SupplierBankMaster.sShortCode || '';


    }
}