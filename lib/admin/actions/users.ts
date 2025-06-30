'use server'

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq, desc } from "drizzle-orm"


export const approveuser = async (id: string) => {
    try {
        const approve = await db.update(users).set({ status: 'APPROVED' })
        .where(eq(users.id, id))

        if (approve?.error) {
            return { success: false, error: approve.error };
        }

        return { success: true };
    } catch (error) {
        console.log(error, "Approve user error")
        return { success: false, error: "Approve user error" };
    }
}

export async function getUsers() {
    const rawUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(10);
  
    const result: User[] = rawUsers.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        universityId: user.universityId,
        password: user.password,
        universityCard: user.universityCard,
        status: user.status,
        role: user.role,
        lastActivityDate: user.lastActivityDate,
        createdAt: user.createdAt,
    }));
  
    return result;
  }

export const deleteUser = async (id: string) => {
    try {
        const deletedUser = await db.delete(users).where(eq(users.id, id))

        if (deletedUser?.error) {
            return { success: false, error: deletedUser.error };
        }

        return { success: true };
    } catch (error) {
        console.log(error, "Delete user error")
        return { success: false, error: "Delete user error" };
    }
}