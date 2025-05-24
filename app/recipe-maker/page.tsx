"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeOutput } from "./recipe-output";

export default function RecipeMakerPage() {
  const [ingredients, setIngredients] = useState<string[]>(["", "", "", "", ""]);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const submitIngredients = async () => {
    const validIngredients = ingredients.filter(val => val.trim() !== "");
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: validIngredients }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json();
      setRecipe(data.recipeText);
    } catch (error) {
      console.error("Error generating recipe:", error);
      alert("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setRecipe(null);
  };

  if (recipe) {
    return (
      <div className="container max-w-2xl py-8">
        <RecipeOutput recipeText={recipe} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recipe Maker</CardTitle>
          <CardDescription>
            Enter your ingredients and we'll suggest a recipe for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <Input
                  key={index}
                  type="text"
                  placeholder="Enter an ingredient"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={addIngredientField}
              className="w-full"
            >
              Add More Ingredients
            </Button>

            <div className="flex justify-end">
              <Button
                onClick={submitIngredients}
                className="w-full sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? "Generating Recipe..." : "Give Me a Recipe!"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
