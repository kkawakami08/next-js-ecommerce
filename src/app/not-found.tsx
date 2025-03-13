"use client";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src={"/images/logo.svg"}
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority
      />
      <div className="p-6 rounded-lg shadow-md text-center w-3/4 max-w-md">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Button
          variant={"outline"}
          className="mt-4 ml-2"
          onClick={() => redirect("/")}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
