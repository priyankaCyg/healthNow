
export class ProductInfoMaster {
   
    iSeq: number;
    sInfo: string;
    
    /**
     * Constructor
     *
     * @param ProductInfoMaster
     */
    constructor(ProductInfoMaster?) {
        ProductInfoMaster = ProductInfoMaster || {};

        this.iSeq = ProductInfoMaster.iSeq || '';
        this.sInfo = ProductInfoMaster.sInfo || '';
       
    }
}