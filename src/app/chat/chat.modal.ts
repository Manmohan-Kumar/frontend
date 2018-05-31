export class Chat {
    constructor(
    public message?: string,
    public sender_id_fk?: string,
    public receiver_id_fk?: string,
    public chat_id?: string,
    public create_date?: Date,
    public update_date?: Date
    ) {}
}
