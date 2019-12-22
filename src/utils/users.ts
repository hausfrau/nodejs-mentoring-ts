import { UsersApi } from 'src/types/users-api';

export function getAutosuggestUsers(
    users: UsersApi.User[],
    loginSubstring: string,
    limit: number = 1
): UsersApi.User[] {
    return users
        .filter((user) => user.login.search(loginSubstring) !== -1)
        .sort((a, b) => {
            if (a.login > b.login) {
                return 1;
            }
            if (a.login < b.login) {
                return -1;
            }

            return 0;
        })
        .slice(0, limit);
}
