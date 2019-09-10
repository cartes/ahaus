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
        public roleId: number,
        public community: number,
        public unitId: number,
        public picture: string
    ) {}
}