import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center gap-0">
          <div className="flex justify-center">
            <AlertTriangleIcon className="size-24 animate-pulse text-amber-500" />
          </div>
          <h1 className="text-7xl font-bold md:text-9xl">404</h1>
        </div>

        <h2 className="text-2xl font-semibold md:text-3xl">
          Página no encontrada
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been
          removed
        </p>

        <Button asChild size={"lg"}>
          <Link href={"/"}>
            <ArrowLeftIcon size={20} />
            <span className="font-bold -tracking-wider">Back to home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
