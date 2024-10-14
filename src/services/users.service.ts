import { db } from '../db/drizzle';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export const getAllUsers = async () => {
    try {
        const users = await db.select().from(usersTable);
        return users;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

export const getSingleUser = async (id: number) => {
    try {
        const user = await db.select().from(usersTable).where(eq(usersTable.user_id, id)).limit(1);

        if (user.length === 0) {
            return null;
        }

        return user[0];
    } catch (error) {
        throw new Error('Error fetching user');
    }
};

export const createUser = async () => {
    try {
        await db.insert(usersTable).values({
            email: 'test@test.com',
            firstname: 'test111',
            lastname: 'test2',
            password_hash: 'asfkahfkjas',
            phone: '1234567900',
        });
    } catch (error) {
        throw new Error('Failed to create user');
    }
};
