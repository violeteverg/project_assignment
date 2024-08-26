import { cookies } from "next/headers";
import { MyExpensesPage } from "./components/pages";
import { redirect } from "next/navigation";
import { verifyAuth } from "./utils/auth";

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("Authentication");

  if (!token) {
    return redirect("/login");
  }

  const verifiedToken = verifyAuth(token.value);
  if (!verifiedToken) {
    return redirect("/login");
  }
  return <MyExpensesPage />;
}
