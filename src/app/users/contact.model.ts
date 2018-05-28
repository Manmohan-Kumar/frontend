export class Contact {
    constructor(
        public user_id?: number,
        public display_name?: string,
        public callback_url?: string,
        public phone_number?: number,
        public country_phone_code?: string,
        public create_date?: Date,
        public update_date?: Date
    ) {}
}
