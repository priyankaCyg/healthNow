
export class SupplierCategoryMaster {
   
    iCreatedBy: string;
    iStatusID: string;
    iSupCatID: string;
    sCreatedDate: string;
    sStatusName: string;
    sSupCName: string;
    iParentId:string;

    /**
     * Constructor
     *
     * @param SupplierCategoryMaster
     */
    constructor(SupplierCategoryMaster?) {
        SupplierCategoryMaster = SupplierCategoryMaster || {};

        this.iCreatedBy = SupplierCategoryMaster.iCreatedBy || '';
        this.iStatusID = SupplierCategoryMaster.iStatusID || '';
        this.iSupCatID = SupplierCategoryMaster.iSupCatID || '';
        this.sCreatedDate = SupplierCategoryMaster.sCreatedDate || '';
        this.sSupCName = SupplierCategoryMaster.sSupCName || '';
        this.sStatusName = SupplierCategoryMaster.sStatusName || '';
        this.iParentId = SupplierCategoryMaster.iParentId || '';

    }
}