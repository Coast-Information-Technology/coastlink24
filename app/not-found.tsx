"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PageNotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h2>Oops! Page Not Found 🥲😥</h2>
        <p>
          It looks like the page you{"'"}re looking for doesn{"'"}t exist. But
          don{"'"}t worry, we{"'"}re here to help you get back on track!
        </p>
        <div className="btn-container flex justify-center items-center gap-2 pt-2">
          <Button
            onClick={() => {
              router.back();
            }}
            className="bg-secondary0 text-white shadow-sm px-7 py-5 rounded-sm tracking-wider text-lg flex items-center dark:bg-secondary-800"
          >
            Back
          </Button>
          <Link href="/">
            <p className="no-underline">
              <Button className="bg-primary0 text-white shadow-sm px-7 py-5 rounded-sm tracking-wider text-lg flex items-center dark:bg-primary-800">
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
