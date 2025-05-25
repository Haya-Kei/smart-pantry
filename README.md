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
  Collects dietary preferences, meal schedules, and lifestyle data via a user-friendly FastAPI web form.

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

- **Frontend**: HTML + Bootstrap (Jinja2 templates via FastAPI)  
- **Backend**: Python (FastAPI)  
- **Database**: Google Firestore  
- **LLM Integration**: OpenAI API / Gemini API  
- **Vector Search (Optional)**: Qdrant or Superlinked  
- **Data Processing**: Aparavi (for inventory-aware recipe suggestions and smart retrieval)  
- **Notifications**: Toolhouse (email + Slack integrations)  
- **Hosting & Deployment**: Uvicorn + S3 (optional)  

---

## 📦 Dataset Sources

- **OpenFoodFacts Bulk JSON**  
  Nutritional data and product metadata (8.8 GB `.jsonl.gz` format)  
  [https://world.openfoodfacts.org/data](https://world.openfoodfacts.org/data)

---

## 🧩 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/smartpantry.git
cd smartpantry
2. Create a virtual environment and install dependencies
bash
Copy
Edit
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
3. Set up Firebase
Add your Firebase credentials JSON file to the root folder.

Update the Firebase initialization line in residents.py accordingly.

4. Run the server
bash
Copy
Edit
uvicorn main:app --reload
🧠 AI Usage
Prompts are sent to LLMs (OpenAI or Gemini) to generate:

Grocery lists

Resident-specific recipe suggestions

Weekly order forecasts

LLM input is contextualized using form submissions and pantry inventory (via Qdrant or Aparavi-powered vector recall). Smart recipe suggestions are dynamically matched to what’s already in stock using Aparavi’s RAG pipeline.

📈 Future Features
Resident-facing mobile app

QR-code pantry scanning

Dynamic inventory tracking

Integration with local grocers or bulk suppliers

🤝 Contributing
Interested in sustainability, AI, or UX? Open an issue, fork the repo, or reach out via Discord, Slack, or LinkedIn!

📜 License
MIT License — feel free to use, modify, or contribute!

vbnet
Copy
Edit

Let me know if you want to link to Toolhouse’s service or expand the setup instructions for Toolhouse or Aparavi.






You said:
for forntend we are using next.js


ChatGPT said:
Thanks! Here’s the updated README.md with Next.js reflected in the tech stack, and the frontend section revised accordingly:

markdown
Copy
Edit
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
