import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const syncUser = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return null;
        }

        const existingUser = await db.user.findUnique({
            where: {
                email: user.emailAddresses[0].emailAddress,
            },
        });

        if (existingUser) {
            return existingUser;
        }

        const dbUser = await db.user.create({
            data: {
                id: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName} ${user.lastName}`,
                role: "user",
            },
        });

        return dbUser;
    } catch (error) {
        console.error("Failed to sync user:", error);
        // Return null so the app can continue loading even if DB is down
        return null;
    }
};
