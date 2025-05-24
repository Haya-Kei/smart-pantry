"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecipeOutputProps {
  recipeText: string;
  onBack: () => void;
}

export function RecipeOutput({ recipeText, onBack }: RecipeOutputProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Generated Recipe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="prose max-w-none">
            {recipeText.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={onBack}>
              Generate Another Recipe
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 