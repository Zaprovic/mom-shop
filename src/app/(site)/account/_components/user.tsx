import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const User = async () => {
  const { getUser } = getKindeServerSession();
  const user = (await getUser())?.given_name || "";

  await new Promise((res) => {
    setTimeout(() => {
      res("resolved");
    }, 1000);
  });
  return (
    <h1 className="text-2xl font-bold -tracking-wider sm:text-3xl">
      Hola, {user}
    </h1>
  );
};

export default User;
