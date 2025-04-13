import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const User = async () => {
  const { getUser } = getKindeServerSession();
  const userGivenName = (await getUser())?.given_name || "";

  const user = await getUser();

  if (!user) {
    return null;
  }

  const _ = await db
    .insert(usersTable)
    .values([
      {
        id: user.id,
        name: user.given_name ?? "",
        email: user.email ?? "",
      },
    ])
    .onConflictDoNothing()
    .returning();

  return (
    <h1 className="text-2xl font-bold -tracking-wider sm:text-3xl">
      Hola, {userGivenName}
    </h1>
  );
};

export default User;
