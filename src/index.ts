import express, { json } from 'express';

import { Routes } from './types/routes';

import { router } from './api/users-api';

export const app = express();

const { PORT = 3000 } = process.env;

app.use(json());
app.use(Routes.USERS, router);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
