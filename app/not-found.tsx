"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PageNotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center">
        <h2 className="text-4xl font-bold pb-6">Oops! Page Not Found 🥲😥</h2>
        <p className="text-xl md:w-[50vw]">
          It looks like the page you{"'"}re looking for doesn{"'"}t exist. But
          don{"'"}t worry, we{"'"}re here to help you get back on track!
        </p>
        <div className="btn-container flex justify-center items-center gap-2 pt-6">
          <Button
            onClick={() => {
              router.back();
            }}
            className="text-white shadow-sm px-7 py-5 rounded-sm tracking-wider text-lg flex items-center dark:bg-secondary-800 dark:text-white"
          >
            Back
          </Button>
          <Link href="/">
            <p className="no-underline">
              <Button className="bg-primary text-white shadow-sm px-7 py-5 rounded-sm tracking-wider text-lg flex items-center dark:bg-primary-800">
                Home
              </Button>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
