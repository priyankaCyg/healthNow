export class UnitMaster {
   
    iCreatedBy: string;
    iStatusID: string;
    iUnitID: string;
    sCreatedDate: string;
    sStatusName: string;
    sUnitName: string;

    /**
     * Constructor
     *
     * @param UnitMaster
     */
    constructor(UnitMaster?) {
        UnitMaster = UnitMaster || {};
        this.iCreatedBy = UnitMaster.iCreatedBy || '';
        this.iStatusID = UnitMaster.iStatusID || '';
        this.iUnitID = UnitMaster.iUnitID || '';
        this.sCreatedDate = UnitMaster.sCreatedDate || '';
        this.sUnitName = UnitMaster.sUnitName || '';
        this.sStatusName = UnitMaster.sStatusName || '';
    }
}