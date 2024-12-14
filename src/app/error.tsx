"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { BiSupport } from "react-icons/bi";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { IoArrowBackCircleSharp, IoReloadCircleSharp } from "react-icons/io5";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="text-center space-y-6">
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, yoyo: Infinity }}
        >
          <div className="bg-rose-100 p-4 rounded-full shadow-md">
            <TbAlertTriangleFilled className="text-rose-600 text-5xl" />
          </div>
        </motion.div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">
            Oh no! Something went wrong
          </h2>
          <p className="text-gray-600 text-lg">
            {error.message ||
              "An unexpected error has occurred. Please try again."}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-10 w-full max-w-md">
        <Button
          onClick={reset}
          className="font-medium bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600"
        >
          <IoReloadCircleSharp className="!size-6" />
          Try Again
        </Button>
        <Button
          className="font-medium text-rose-500 border border-rose-500 py-3 rounded-lg hover:bg-rose-100"
          variant="ghost"
          asChild
        >
          <Link href="/">
            {" "}
            <IoArrowBackCircleSharp className="!size-6" /> Go Back to Home
          </Link>
        </Button>
        <Button variant="help">
          <BiSupport />
          Need help? Contact Support
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
