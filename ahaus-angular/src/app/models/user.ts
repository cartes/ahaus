export class User {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public tax_id: string,
        public email: string,
        public birthDate: string,
        public profesion: string,
        public institute: string,
        public password: string,
        public role_id: number,
        public community_id: number,
        public unit_id: number,
        public picture: string
    ) {}
}