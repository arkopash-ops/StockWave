import bcrypt from "bcryptjs";
import UserModel from "../model/users.model.js";
import { RoleTypes } from "../types/users.types.js";

export const seedAdmin = async () => {
    try {
        const existingAdmin = await UserModel.findOne({ email: "admin@mail.com" });
        if (existingAdmin) {
            console.log("Admin user already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const adminUser = await UserModel.create({
            name: "admin",
            email: "admin@mail.com",
            password: hashedPassword,
            role: RoleTypes.ADMIN,
        });

        console.log("Admin user created:", {
            id: adminUser._id,
            name: adminUser.name,
            email: adminUser.email,
            role: adminUser.role,
        });
    } catch (error) {
        console.error("Error seeding admin:", error);
    }
};
