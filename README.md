# 🧠 SmartPantry

**SmartPantry** is an AI-powered grocery planning system designed for co-living spaces, vertical villages, and coworking communities. It generates personalized, waste-reducing, and nutritionally-aware grocery lists based on resident preferences, inventory levels, and dietary needs.

---

## 🌱 Purpose

In many modern residential communities, food management is inefficient—leading to waste, mismatched diets, and poor planning. SmartPantry solves this by:

- Centralizing resident food preferences and schedules.
- Automatically generating weekly grocery lists for the building.
- Recommending healthy meals based on real-time pantry inventory.
- Sending weekly notifications and reminders via email or Slack.
- Encouraging sustainable, low-waste living.

---

## 🚀 Features

- **Resident Intake Form**  
  Collects dietary preferences, meal schedules, and lifestyle data via a user-friendly interface.

- **Inventory-Aware Grocery List Generator**  
  Creates weekly shopping lists based on current pantry stock and resident needs.

- **AI-Powered Recipe Recommendations**  
  Uses **Aparavi** and RAG techniques to suggest recipes based on what’s currently available in the pantry.

- **Notifications & Reminders (via Toolhouse)**  
  Weekly reminders are sent to residents via email or Slack. Building managers receive the generated grocery list and key updates.

- **Feedback-Driven Optimization**  
  Residents can submit food feedback to improve future recommendations using LLM integration (OpenAI or Gemini).

- **Nutrition Insights**  
  Retrieves nutritional data via the OpenFoodFacts dataset and offers healthy alternatives.

- **Admin Dashboard**  
  View resident data by floor, generate reports, and manage pantry inventory.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (React-based framework) with Tailwind CSS and dynamic form rendering  
- **Backend**: Python (FastAPI)  
- **Database**: Google Firestore  
- **LLM Integration**: OpenAI API / Gemini API  
- **Vector Search (Optional)**: Qdrant or Superlinked  
- **Data Processing**: Aparavi (for inventory-aware recipe suggestions and smart retrieval)  
- **Notifications**: Toolhouse (email + Slack integrations)  
- **Hosting & Deployment**: Vercel (frontend) + Uvicorn (backend) + AWS S3 (optional)  

---

## 📦 Dataset Sources

- **OpenFoodFacts Bulk JSON**  
  Nutritional data and product metadata (8.8 GB `.jsonl.gz` format)  
  [https://world.openfoodfacts.org/data](https://world.openfoodfacts.org/data)
