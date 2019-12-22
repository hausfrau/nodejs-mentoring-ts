import uuidv1 from 'uuid/v1';
import { Response, Router } from 'express';
import {
    createValidator,
    ValidatedRequest
} from 'express-joi-validation';

import { getAutosuggestUsers } from '../utils/users';

import { UsersApi } from '../types/users-api';

import * as schemes from '../schemes/users-api';

let users: UsersApi.User[] = [];

export const router = Router();
const validator = createValidator();

router
    .get(
        '/',
        validator.query(schemes.getUsersSchema),
        (req: ValidatedRequest<UsersApi.GetUsersSchema>, res: Response) => {
            if (req.query.login) {
                const limit = parseInt(req.query.limit, 10) || 1;
                const { login } = req.query;

                res.json(getAutosuggestUsers(users, login, limit));
            }

            res.json(users);
        }
    )
    .get(
        '/:id',
        validator.params(schemes.getUserByIdSchema),
        (req: ValidatedRequest<UsersApi.GetUsersByIdSchema>, res: Response) => {
            res.json(users
                .find((user) => user.id === req.params.id)
            );
        }
    )
    .post(
        '/',
        validator.body(schemes.postUserSchema),
        (req: ValidatedRequest<UsersApi.PostUserSchema>, res: Response) => {
            users.push({
                ...req.body,
                id: uuidv1(),
                isDeleted: false
            });

            res.json(users);
        }
    )
    .put(
        '/:id',
        validator.body(schemes.putUserBodySchema),
        validator.params(schemes.putUserParamsSchema),
        (req: ValidatedRequest<UsersApi.PutUserSchema>, res: Response) => {
            users = users.map((user): UsersApi.User => {
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    };
                }

                return user;
            });

            res.json(users);
        }
    )
    .delete(
        '/:id',
        validator.params(schemes.deleteUserSchema),
        (req: ValidatedRequest<UsersApi.DeleteUserSchema>, res: Response) => {
            users = users.map((user): UsersApi.User => {
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        isDeleted: true
                    };
                }

                return user;
            });

            res.json(users);
        }
    );
