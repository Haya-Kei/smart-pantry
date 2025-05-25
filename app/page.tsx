"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGroceryListClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-grocery-list");
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // 生成されたリストをURLパラメータとして渡す
      const encodedList = encodeURIComponent(data.groceryList);
      router.push(`/grocery-list?list=${encodedList}`);
    } catch (error) {
      console.error("Error generating grocery list:", error);
      router.push("/grocery-list?error=Failed to generate grocery list");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md flex flex-col justify-between min-h-[40vh] sm:min-h-[40vh] md:min-h-[40vh]">
        <div className="flex flex-col items-center space-y-4 mb-8 sm:mb-10">
          <Image
            src="/smartPantryIcon.png"
            alt="Smart Pantry Logo"
            width={100}
            height={100}
            className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
            priority
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            Smart Pantry
          </h1>
        </div>
        <div className="flex flex-col justify-between space-y-3 sm:space-y-4 md:space-y-3 flex-grow">
          <Link href="/residents" className="w-full">
            <Button className="w-full h-12 sm:h-14 text-base sm:text-lg" size="lg">
              View Resident List
            </Button>
          </Link>
          <Link href="/form" className="w-full">
            <Button className="w-full h-12 sm:h-14 text-base sm:text-lg" size="lg">
              Submit New Form
            </Button>
          </Link>
          <Link href="/feedback" className="w-full">
            <Button className="w-full h-12 sm:h-14 text-base sm:text-lg" size="lg">
              Give Feedback
            </Button>
          </Link>
          <Link href="/recipe-maker" className="w-full">
            <Button className="w-full h-12 sm:h-14 text-base sm:text-lg" size="lg">
              Recipe Maker
            </Button>
          </Link>
          <Link href="/inventory">
            <Button className="w-full">View Inventory</Button>
          </Link>
          <Button
            className="w-full h-12 sm:h-14 text-base sm:text-lg"
            size="lg"
            onClick={handleGroceryListClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              "Generate Grocery List"
            )}
          </Button>
          <Button
            variant="destructive"
            className="w-full h-12 sm:h-14 text-base sm:text-lg"
            size="lg"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
