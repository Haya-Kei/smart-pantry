import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ item: string }> }
): Promise<NextResponse> {
  try {
    // Promise から展開
    const { item } = await params;
    console.log("Fetching nutrition info for:", item);

    // Firestore からクエリ
    const nutritionRef = collection(db, "nutrition");
    const q = query(nutritionRef, where("product_name", "==", item));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No nutrition data found for:", item);
      // ダミーデータを返却
      const dummyData = {
        product_name: item,
        brand: "Generic",
        image_url: `https://via.placeholder.com/300?text=${encodeURIComponent(item)}`,
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
        sodium_serving: 0.08,
      };
      return NextResponse.json(dummyData);
    }

    // 実データを返却
    const nutritionData = querySnapshot.docs[0].data();
    console.log("Found nutrition data:", nutritionData);
    return NextResponse.json(nutritionData);
  } catch (error) {
    console.error("Error fetching nutrition info:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch nutrition information",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
