import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const User = async () => {
  const { getUser } = getKindeServerSession();
  const userGivenName = (await getUser())?.given_name || "";

  const user = await getUser();

  // database call to neon to add user if not exists
  //
  if (!user) {
    return (
      <h1 className="text-2xl font-bold -tracking-wider sm:text-3xl">
        No user
      </h1>
    );
  }

  const _ = await db
    .insert(usersTable)
    .values({
      id: user.id,
      name: user.given_name,
      email: user.email,
    })
    .onConflictDoNothing()
    .returning();

  await new Promise((res) => {
    setTimeout(() => {
      res("resolved");
    }, 1000);
  });
  return (
    <h1 className="text-2xl font-bold -tracking-wider sm:text-3xl">
      Hola, {userGivenName}
    </h1>
  );
};

export default User;
