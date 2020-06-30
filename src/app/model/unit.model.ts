
export class UnitMaster {

    iCreatedBy: number;
    iStatusID: number;
    iUnitID: number;
    sCreatedDate: string;
    sStatusName: string;
    sUnitName: string;
    sSymbol: string;

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
        this.sSymbol = UnitMaster.sSymbol || '';
    }
}