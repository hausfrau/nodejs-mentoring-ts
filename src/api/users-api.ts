import { Request, Response, Router } from 'express';
import uuidv1 from 'uuid/v1';

import { UsersApi } from '../types/users-api';

let users: UsersApi.User[] = [];

export const router = Router();

router
    .get('/', (_REQ, res: Response) => {
        res.json(users);
    })
    .get('/:id', (req: Request<UsersApi.Params>, res: Response) => {
        res.json(users
            .find((user) => user.id === req.params.id)
        );
    })
    .post('/', (req: Request, res: Response) => {
        users.push({
            ...req.body,
            id: uuidv1(),
            isDeleted: false
        });

        res.json(users);
    })
    .put('/:id', (req: Request<UsersApi.Params>, res: Response) => {
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
    })
    .delete('/:id', (req: Request<UsersApi.Params>, res: Response) => {
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
    });
