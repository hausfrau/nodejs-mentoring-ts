import {
    ContainerTypes,
    ValidatedRequestSchema
} from 'express-joi-validation';

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

    export interface GetUsersSchema extends ValidatedRequestSchema {
        [ContainerTypes.Query]: {
            login: string;
            limit: string;
        };
    }

    export interface GetUsersByIdSchema extends ValidatedRequestSchema {
        [ContainerTypes.Params]: {
            id: string;
        };
    }

    export interface PostUserSchema extends ValidatedRequestSchema {
        [ContainerTypes.Body]: {
            login: string;
            password: string;
            age: number;
        };
    }

    export interface PutUserSchema extends PostUserSchema {
        [ContainerTypes.Params]: {
            id: string;
        };
    }

    export interface DeleteUserSchema extends ValidatedRequestSchema {
        [ContainerTypes.Params]: {
            id: string;
        };
    }
}
