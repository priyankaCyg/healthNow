
export class PartnerContactMaster {

    iCreatedBy: string;
    iStatusID: string;
    iPartnerAddID: string;
    iPartnerContactID: string;
    iPartnerID: string;
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
    sPartnerName: string;

    /**
     * Constructor
     *
     * @param SupplierContactMaster
     */
    constructor(PartnerContactMaster?) {
        PartnerContactMaster = PartnerContactMaster || {};

        this.iCreatedBy = PartnerContactMaster.iCreatedBy || '';
        this.iStatusID = PartnerContactMaster.iStatusID || '';
        this.iPartnerAddID = PartnerContactMaster.iPartnerAddID || '';
        this.iPartnerContactID = PartnerContactMaster.iPartnerContactID || '';
        this.iPartnerID = PartnerContactMaster.iPartnerID || '';
        this.sAddress = PartnerContactMaster.sAddress || '';
        this.sContactNo = PartnerContactMaster.sContactNo || '';
        this.sCreatedDate = PartnerContactMaster.sCreatedDate || '';
        this.sDesignation = PartnerContactMaster.sDesignation || '';
        this.sDirectNo = PartnerContactMaster.sDirectNo || '';
        this.sEmailID = PartnerContactMaster.sEmailID || '';
        this.sFaxNo = PartnerContactMaster.sFaxNo || '';
        this.sFullName = PartnerContactMaster.sFullName || '';
        this.sMobileNo = PartnerContactMaster.sMobileNo || '';
        this.sPOBox = PartnerContactMaster.sPOBox || '';
        this.sStatusName = PartnerContactMaster.sStatusName || '';
        this.sPartnerName = PartnerContactMaster.sPartnerName || '';



    }
}