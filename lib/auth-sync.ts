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
                id: user.id,
            },
        });

        if (!existingUser) {
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.emailAddresses[0]?.emailAddress || "",
                    name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
                    role: "user",
                },
            });
            console.log(`✅ User synced: ${user.id}`);
        } else {
            // Optional: Update user details if they changed
            // await db.user.update({...})
        }

        return user;
    } catch (error) {
        console.error("Error syncing user:", error);
        return null;
    }
};
