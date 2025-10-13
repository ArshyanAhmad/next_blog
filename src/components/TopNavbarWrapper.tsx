// components/TopNavbarWrapper.tsx (Server Component)
import { cookies } from "next/headers";
import TopNavbar from "./navbar";

export default async function TopNavbarWrapper() {
    const cookieStore = await cookies();
    const token = cookieStore.get("authorization")?.value;
    const isLoggedIn = !!token;

    return <TopNavbar isLoggedIn={isLoggedIn} />;
}
