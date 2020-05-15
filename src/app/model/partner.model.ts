
export class PartnerMaster {

    sPAN: string;
    sFaxNo: string;
    sTelNo1: string;
    sTelNo2: string;
    iStatusID: number;
    iCreatedBy: number;
    iPartnerID: number;
    sShortCode: string;
    sStatusName: string;
    sCreatedDate: string;
    sPartnerName: string;
    iLegalEntityID: string;

    /**
     * Constructor
     *
     * @param SupplierContactMaster
     */
    constructor(PartnerMaster?) {
        PartnerMaster = PartnerMaster || {};

        this.sPAN = PartnerMaster.sPAN || '';
        this.sFaxNo = PartnerMaster.sFaxNo || '';
        this.sTelNo1 = PartnerMaster.sTelNo1 || '';
        this.sTelNo2 = PartnerMaster.sTelNo2 || '';
        this.iStatusID = PartnerMaster.iStatusID || '';
        this.iCreatedBy = PartnerMaster.iCreatedBy || '';
        this.iPartnerID = PartnerMaster.iPartnerID || '';
        this.sShortCode = PartnerMaster.sShortCode || '';
        this.sStatusName = PartnerMaster.sStatusName || '';
        this.sCreatedDate = PartnerMaster.sCreatedDate || '';
        this.sPartnerName = PartnerMaster.sPartnerName || '';
        this.iLegalEntityID = PartnerMaster.iLegalEntityID || '';
    
    }
}