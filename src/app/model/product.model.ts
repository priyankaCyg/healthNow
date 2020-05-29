
export class ProductMaster {

    iPrdID: number;
    iFoodCulture: number;
    sFoodCulture: string;
    iUnitID: number;
    sUnitName: string;
    sPrdName: string;
    iStatusID: number;
    iCreatedBy: number;
    sShortName: string;
    iProducerID: number;
    sStatusName: string;
    sCreatedDate: string;
    sProducerName: string;

    /**
     * Constructor
     *
     * @param SupplierContactMaster
     */
    constructor(ProductMaster?) {
        ProductMaster = ProductMaster || {};

        this.iPrdID = ProductMaster.iPrdID || '';
        this.iFoodCulture = ProductMaster.iFoodCulture || '';
        this.sFoodCulture = ProductMaster.sFoodCulture || '';
        this.iUnitID = ProductMaster.iUnitID || '';
        this.sUnitName = ProductMaster.sUnitName || '';
        this.sPrdName = ProductMaster.sPrdName || '';
        this.iStatusID = ProductMaster.iStatusID || '';
        this.iCreatedBy = ProductMaster.sAddress || '';
        this.sShortName = ProductMaster.sShortName || '';
        this.iProducerID = ProductMaster.iProducerID || '';
        this.sStatusName = ProductMaster.sStatusName || '';
        this.sCreatedDate = ProductMaster.sCreatedDate || '';
        this.sProducerName = ProductMaster.sProducerName || '';

    }
}