
export class SuppMaster {

    iCreatedBy: string;
    iLegalEntityID: string;
    iStatusID: string;
    iSupID: string;
    sCreatedDate: string;
    sFaxNo: string;
    sPAN: string;
    sShortCode: string;
    sStatusName: string;
    sSupName: string;
    sTelNo1: string;
    sTelNo2: string;
    sWebsite: string;



    /**
     * Constructor
     *
     * @param UnitMaster
     */
    constructor(SuppMaster?) {
        SuppMaster = SuppMaster || {};

        this.iCreatedBy = SuppMaster.iCreatedBy || '';
        this.iStatusID = SuppMaster.iStatusID || '';
        this.iLegalEntityID = SuppMaster.iLegalEntityID || '';
        this.sCreatedDate = SuppMaster.sCreatedDate || '';
        this.iSupID = SuppMaster.iSupID || '';
        this.sStatusName = SuppMaster.sStatusName || '';
        this.sFaxNo = SuppMaster.sFaxNo || '';
        this.sPAN = SuppMaster.sPAN || '';
        this.sSupName = SuppMaster.sSupName || '';
        this.sTelNo1 = SuppMaster.sTelNo1 || '';
        this.sTelNo2 = SuppMaster.sTelNo2 || '';
        this.sWebsite = SuppMaster.sWebsite || '';
        this.sShortCode = SuppMaster.sShortCode || '';

    }
}