# 🌱 CarbonCut – Track & Reduce Your Carbon Footprint

> Submission for **Code For Bharat – Season 2**  
> Team: **Byte By Bite**  
> Theme: **Sustainable Tech & Climate Innovation**

CarbonCut is a carbon footprint tracking web app tailored for the Indian lifestyle. It empowers users—especially urban youth—to calculate their daily carbon emissions based on transport, energy, food, and digital habits. The app gives a clear EcoScore, tree offset estimates, and actionable suggestions to reduce impact.

---

## Team Members

- Rajat Gupta  
- Animesh Sharma  
- Shiv Sharma  
- Ayush Kumar  

---

## Screenshots

### Dashboard Screens

| ![Dashboard 1](./dashboard1.png) | ![Dashboard 2](./dashboard2.png) | ![Dashboard 3](./dashboard3.png) |

### Result Screen

| ![Result](./result.png) |

---

## Key Features

- Tailored for Indian lifestyle (Metro, LPG, Dal, Veg/Non-Veg)
- Calculates CO₂ emissions from transport, electricity, food, and devices
- Estimates trees required for daily and annual offset
- Generates EcoScore and personalized suggestions
- Anonymous data logging using Supabase Edge Functions

---

## Tech Stack

- HTML, CSS, JavaScript
- Supabase Edge Functions (Deno)
- Supabase PostgreSQL
- Netlify (Frontend Hosting)

---

## API Endpoint

### `POST /calculate`

Stores user footprint data and returns emissions summary.

#### Example Request

```json
{
  "user_session_id": "xyz789",
  "timestamp": "2025-07-12T18:00:00Z",
  "commute_mode": "metro",
  "commute_distance": 5,
  "ac_type": "ac_1ton",
  "ac_hours": 3,
  "diet_type": "vegetarian",
  "phone_hours": 3,
  "laptop_hours": 5,
  "daily_steps": 8000,
  "total_emissions": 4.2,
  "eco_score": 67,
  "trees_daily": 54,
  "trees_annual": 19710
}

