import bcrypt from "bcryptjs";

type HashResult = {
    success: boolean;
    hashedPassword?: string;
    error?: string;
};

export const hashPassword = async (password: string): Promise<HashResult> => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return { success: true, hashedPassword };
    } catch (err) {
        console.log(err);
        return { success: false, error: "Password hashing failed" };
    }
};

export const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<HashResult> => {
    try {
        if (await bcrypt.compare(password, hashedPassword)) {
            return { success: true };
        } else {
            return { success: false, error: "Password Not Matched" };
        }
    } catch (err) {
        console.log(err);
        return { success: false, error: "Password comparison failed" };
    }
};
