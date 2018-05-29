export class Contact {
    constructor(
        public user_id?: string,
        public contact_id?:string,
        public display_name?: string,
        public callback_url?: string,
        public phone_number?: string,
        public country_phone_code?: string,
        public create_date?: Date,
        public update_date?: Date
    ) {}
}
