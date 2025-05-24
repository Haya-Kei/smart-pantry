"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function GroceryList() {
  const searchParams = useSearchParams();
  const [groceryList, setGroceryList] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const list = searchParams.get("list");
    const error = searchParams.get("error");
    
    if (list) {
      setGroceryList(decodeURIComponent(list));
    }
    if (error) {
      setError(decodeURIComponent(error));
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Smart Pantry Grocery List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {error && (
              <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            {groceryList && (
              <div className="prose max-w-none">
                <div
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: groceryList.replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 