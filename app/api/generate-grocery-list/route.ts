import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    // ダミーデータを使用（実際の実装ではFirebaseからデータを取得）
    const summarizedData = {
      "Floor 1": {
        "floor_residents": 10,
        "average_hours_per_day": 8.5,
        "average_days_on_site_per_week": 4.2,
        "top_dietary_restrictions": [["vegetarian", 5], ["vegan", 3], ["gluten-free", 2]],
        "top_snack_preferences": [["protein bars", 8], ["nuts", 6], ["fruit", 5]],
        "top_beverage_preferences": [["coffee", 9], ["tea", 7], ["water", 10]]
      },
      "Floor 2": {
        "floor_residents": 8,
        "average_hours_per_day": 7.8,
        "average_days_on_site_per_week": 3.5,
        "top_dietary_restrictions": [["vegan", 4], ["vegetarian", 3], ["dairy-free", 2]],
        "top_snack_preferences": [["trail mix", 6], ["protein bars", 5], ["chips", 4]],
        "top_beverage_preferences": [["coffee", 7], ["water", 8], ["green tea", 5]]
      }
    };

    const prompt = `You are helping stock a shared kitchen for a multi-floor coworking and coliving building in San Francisco.

Each resident is assigned to a specific floor, and each floor has slightly different preferences and dietary needs.

Here is a breakdown of resident data by floor:
${JSON.stringify(summarizedData, null, 2)}

Your task is to generate a **weekly bulk grocery list** for the **entire building** that:

- Captures the **top 80% of preferences across all floors**
- Groups similar needs and avoids rare or individual-specific items
- Prioritizes **bulk-friendly, cost-effective, low-waste items**
- Includes:
  - Snacks and beverages for on-site consumption
  - Basic groceries to take home
- Uses estimates based on:
  - Number of residents on each floor
  - Their average days and hours on-site

Please return the grocery list in structured format, grouped by:
**Produce**, **Pantry**, **Snacks**, **Beverages**, **Other**

Each item must include:
- Quantity and unit (e.g., "40 protein bars", "25 lbs of apples")
- Item name
- (Optional) Note which floor(s) prefer this item, if relevant

Avoid vague terms like "some", "a few", or "many". This is for a real ordering system, so be specific.

The final list should support about **80% of everyone's needs**, not 100%, to reduce waste and cost.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const groceryList = response.choices[0].message.content;

    return NextResponse.json({ groceryList });
  } catch (error) {
    console.error("Error generating grocery list:", error);
    return NextResponse.json(
      { error: "Failed to generate grocery list" },
      { status: 500 }
    );
  }
} 