export class ProductCategory {
    iPCID: number;
    sPCName: string;
    iStatusID: number;
    sStatusName: string;
    iParentID: number;
    sParentCategoryName:string


    constructor(ProductCategory?){
        ProductCategory = ProductCategory || {};
        
        this.iPCID = ProductCategory.iPCID || '';
        this.sPCName = ProductCategory.sPCName || '';
        this.iStatusID = ProductCategory.iStatusID || '';
        this.sStatusName = ProductCategory.sStatusName || '';
        this.iParentID = ProductCategory.iParentID || '';
        this.sParentCategoryName = ProductCategory.sParentCategoryName;
    }
}
