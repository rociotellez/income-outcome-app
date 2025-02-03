export class IncomeOutcome {
    
    description: string;
    amount: number;
    type: string;
    uid?: string;

    constructor(description: string, amount: number, type: string, uid?: string) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.uid = uid;
    }
}