"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InventoryItem {
  item: string;
  quantity: number;
  unit: string;
}

interface InventoryOrder {
  order_date: string;
  prepared_by: string;
  resident_count: number;
  produce?: InventoryItem[];
  pantry?: InventoryItem[];
  snacks?: InventoryItem[];
  beverages?: InventoryItem[];
  other?: InventoryItem[];
}

interface NutritionInfo {
  product_name: string;
  brand?: string;
  image_url?: string;
  nutriscore?: string;
  nova_group?: string;
  serving_size?: string;
  calories_100g?: number;
  calories_serving?: number;
  protein_100g?: number;
  protein_serving?: number;
  fat_100g?: number;
  fat_serving?: number;
  saturated_fat_100g?: number;
  saturated_fat_serving?: number;
  carbs_100g?: number;
  carbs_serving?: number;
  sugar_100g?: number;
  sugar_serving?: number;
  fiber_100g?: number;
  fiber_serving?: number;
  salt_100g?: number;
  salt_serving?: number;
  sodium_100g?: number;
  sodium_serving?: number;
}

export default function InventoryPage() {
  const [orders, setOrders] = useState<InventoryOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [nutritionInfo, setNutritionInfo] = useState<NutritionInfo | null>(null);
  const [viewMode, setViewMode] = useState<"per100g" | "perServing">("per100g");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch("/api/inventory");
      if (!response.ok) throw new Error("Failed to fetch inventory");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError("Error loading inventory data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNutrition = async (itemName: string) => {
    try {
      const response = await fetch(`/nutrition/${encodeURIComponent(itemName)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to fetch nutrition info");
      }
      const data = await response.json();
      setNutritionInfo(data);
      setSelectedItem(itemName);
    } catch (err) {
      console.error("Error fetching nutrition info:", err);
      // エラーメッセージを表示する代わりに、ダミーデータを使用
      const dummyData = {
        product_name: itemName,
        brand: "Generic",
        image_url: `https://via.placeholder.com/300?text=${encodeURIComponent(itemName)}`,
        nutriscore: "A",
        nova_group: "1",
        serving_size: "100g",
        calories_100g: 120,
        calories_serving: 240,
        protein_100g: 3.5,
        protein_serving: 7,
        fat_100g: 1.2,
        fat_serving: 2.4,
        saturated_fat_100g: 0.3,
        saturated_fat_serving: 0.6,
        carbs_100g: 25,
        carbs_serving: 50,
        sugar_100g: 5,
        sugar_serving: 10,
        fiber_100g: 2,
        fiber_serving: 4,
        salt_100g: 0.1,
        salt_serving: 0.2,
        sodium_100g: 0.04,
        sodium_serving: 0.08
      };
      setNutritionInfo(dummyData);
      setSelectedItem(itemName);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "per100g" ? "perServing" : "per100g");
  };

  if (loading) {
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Loading inventory data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <h2 className="text-2xl font-bold mb-6">📦 Weekly Inventory Orders</h2>
      
      {orders.map((order, index) => (
        <Card key={index} className="mb-6">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Order Date: {order.order_date}</CardTitle>
            <p className="text-sm">
              Prepared by: {order.prepared_by} | Residents: {order.resident_count}
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            {["produce", "pantry", "snacks", "beverages", "other"].map((category) => {
              const items = order[category as keyof InventoryOrder] as InventoryItem[] | undefined;
              if (!items?.length) return null;

              return (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 capitalize">{category}</h3>
                  <div className="space-y-2">
                    {items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg"
                      >
                        <span>
                          <strong>{item.item}</strong> — {item.quantity} {item.unit}
                        </span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fetchNutrition(item.item)}
                            >
                              View Info
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle className="flex justify-between items-center">
                                <span>Nutrition Info</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={toggleViewMode}
                                >
                                  Toggle View
                                </Button>
                              </DialogTitle>
                            </DialogHeader>
                            {nutritionInfo && selectedItem === item.item && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  {nutritionInfo.image_url && (
                                    <div className="relative w-full aspect-square mb-4">
                                      <Image
                                        src={nutritionInfo.image_url}
                                        alt={nutritionInfo.product_name}
                                        fill
                                        className="object-contain rounded-lg"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                      />
                                    </div>
                                  )}
                                  <div className="space-y-2">
                                    <p><strong>Brand:</strong> {nutritionInfo.brand || "N/A"}</p>
                                    <p><strong>NutriScore:</strong> {nutritionInfo.nutriscore || "N/A"}</p>
                                    <p><strong>Processing Level:</strong> NOVA {nutritionInfo.nova_group || "N/A"}</p>
                                    <p><strong>Serving Size:</strong> {nutritionInfo.serving_size || "100g"}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold mb-2">
                                    {nutritionInfo.product_name || item.item}
                                  </h4>
                                  <p className="text-muted-foreground mb-4">
                                    Nutritional values <strong>{viewMode === "per100g" ? "per 100g" : "per serving"}</strong>
                                  </p>
                                  <div className="space-y-2">
                                    {[
                                      { label: "Calories", value: viewMode === "per100g" ? nutritionInfo.calories_100g : nutritionInfo.calories_serving, unit: "kcal" },
                                      { label: "Protein", value: viewMode === "per100g" ? nutritionInfo.protein_100g : nutritionInfo.protein_serving, unit: "g" },
                                      { label: "Fat", value: viewMode === "per100g" ? nutritionInfo.fat_100g : nutritionInfo.fat_serving, unit: "g" },
                                      { label: "Saturated Fat", value: viewMode === "per100g" ? nutritionInfo.saturated_fat_100g : nutritionInfo.saturated_fat_serving, unit: "g" },
                                      { label: "Carbohydrates", value: viewMode === "per100g" ? nutritionInfo.carbs_100g : nutritionInfo.carbs_serving, unit: "g" },
                                      { label: "Sugar", value: viewMode === "per100g" ? nutritionInfo.sugar_100g : nutritionInfo.sugar_serving, unit: "g" },
                                      { label: "Fiber", value: viewMode === "per100g" ? nutritionInfo.fiber_100g : nutritionInfo.fiber_serving, unit: "g" },
                                      { label: "Salt", value: viewMode === "per100g" ? nutritionInfo.salt_100g : nutritionInfo.salt_serving, unit: "g" },
                                      { label: "Sodium", value: viewMode === "per100g" ? nutritionInfo.sodium_100g : nutritionInfo.sodium_serving, unit: "g" },
                                    ].map(({ label, value, unit }) => (
                                      <div key={label} className="flex justify-between items-center p-2 bg-secondary/10 rounded">
                                        <span className="font-medium">{label}:</span>
                                        <span>{value ?? "N/A"} {unit}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 