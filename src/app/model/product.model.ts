
export class ProductMaster {

    iPrdID: number;
    iFoodCulture: string;
    sFoodtags: string;
    iUnitID: number;
    sUnitName: string;
    sPrdName: string;
    iStatusID: number;
    iCreatedBy: number;
    sVariant: string;
    iProducerID: number;
    sParentPrdName: string;
    sCreatedDate: string;
    sProducerName: string;
    iParentID: number;
    iFCID: number;
    sFCImageURL: string;
    sFCName: string;
    sTaxName: string;
    iTaxID: number;
    sHSN: string;
    sPrdDesc: string;
    /**
     * Constructor
     *
     * @param SupplierContactMaster
     */
    constructor(ProductMaster?) {
        ProductMaster = ProductMaster || {};

        this.iPrdID = ProductMaster.iPrdID || '';
        this.iFoodCulture = ProductMaster.iFoodCulture || '';
        this.sFoodtags = ProductMaster.sFoodtags || '';
        this.iUnitID = ProductMaster.iUnitID || '';
        this.sUnitName = ProductMaster.sUnitName || '';
        this.sPrdName = ProductMaster.sPrdName || '';
        this.iStatusID = ProductMaster.iStatusID || '';
        this.iCreatedBy = ProductMaster.sAddress || '';
        this.sVariant = ProductMaster.sVariant || '';
        this.iProducerID = ProductMaster.iProducerID || '';
        this.sParentPrdName = ProductMaster.sParentPrdName || '';
        this.sCreatedDate = ProductMaster.sCreatedDate || '';
        this.sProducerName = ProductMaster.sProducerName || '';
        this.iFCID = ProductMaster.iFCID || '';
        this.sFCImageURL = ProductMaster.sFCImageURL || '';
        this.sFCName = ProductMaster.sFCName || '';
        this.sTaxName = ProductMaster.sTaxName || '';
        this.iTaxID = ProductMaster.iTaxID || '';
        this.sHSN = ProductMaster.sHSN || '';
        this.sPrdDesc = ProductMaster.sPrdDesc || '';





    }
}