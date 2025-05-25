"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function GroceryListContent() {
  const searchParams = useSearchParams();
  const list = searchParams.get("list");
  const error = searchParams.get("error");

  if (error) {
    return (
      <div className="container max-w-2xl py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="container max-w-2xl py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">No List Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please generate a grocery list first.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Generated Grocery List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap">{decodeURIComponent(list)}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GroceryListPage() {
  return (
    <Suspense fallback={
      <div className="container max-w-2xl py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Loading grocery list...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <GroceryListContent />
    </Suspense>
  );
} 