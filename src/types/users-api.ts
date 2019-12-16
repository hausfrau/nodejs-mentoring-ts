export namespace UsersApi {
    export type User = {
        id: string;
        login: string;
        password: string;
        age: number;
        isDeleted: boolean;
    };

    export type Params = {
        id: string;
    };
}
