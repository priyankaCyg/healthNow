
export class BrandMaster {
   
    iBrandID: string;
    iCreatedBy: string;
    iProducerID: string;
    iStatusID: string;
    sBrandName: string;
    sCreatedDate: string;
    sProducerName: string;
    sStatusName: string;

    /**
     * Constructor
     *
     * @param BrandMaster
     */
    constructor(BrandMaster?) {
        BrandMaster = BrandMaster || {};

        this.iBrandID = BrandMaster.iBrandID || '';
        this.iCreatedBy = BrandMaster.iCreatedBy || '';
        this.iProducerID = BrandMaster.iProducerID || '';
        this.iStatusID = BrandMaster.iStatusID || '';
        this.sBrandName = BrandMaster.sBrandName || '';
        this.sCreatedDate = BrandMaster.sCreatedDate || '';
        this.sProducerName = BrandMaster.sProducerName || '';
        this.sStatusName = BrandMaster.sStatusName || '';



    }
}