import crypto from "crypto";
import User from "../models/user.modal.js";

const users = [
    {
        name: 'John Doe',
        bio: 'Software Developer',
        email: 'john.doe@example.com',
        password: 'hashedpassword1',
    },
    {
        name: 'Jane Smith',
        bio: 'Project Manager',
        email: 'jane.smith@example.com',
        password: 'hashedpassword2',
    }
];

export async function seedUsers() {
    await User.insertMany(users);
}