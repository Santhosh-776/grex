import { cookies } from "next/headers";

export const getSession = async () => {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    return session ? { session } : null;
};
