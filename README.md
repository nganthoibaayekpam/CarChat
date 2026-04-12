# Know Your Car | AI Expert 🏎️

A glassy, responsive web dashboard that acts as a technical automotive assistant. Users can ask natural language questions about classic and modern cars to instantly retrieve detailed specifications, engine layouts, and chassis configurations.

**Live Demo:** https://nganthoibaayekpam.github.io/CarChat/

### Dashboard Preview
![Desktop View]


![Mobile View](Leave this exactly as GitHub generated it when you dragged and dropped)

## Features
* **Interactive AI Chat:** Directly queries an isolated backend to retrieve exact technical data or generate fallback knowledge.
* **Glassmorphism UI:** A modern, dark-themed dashboard with dynamic blur effects and gradient typography.
* **Fully Responsive:** Adapts seamlessly across desktop, tablet, and mobile breakpoints with collapsing sidebars.
* **Dynamic UI States:** Includes interactive suggestion cards, automated scrolling, and animated "searching" indicators.

## Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend Integration:** Connects to a Vercel-hosted Node.js/Express API (which handles Gemini AI and API-Ninjas interactions securely).

## Running Locally
Because this is a pure vanilla frontend, no complex installation is required.
1. Clone this repository.
2. Open `index.html` in your browser. 
*(Note: For the best experience and to avoid local CORS restrictions, it is recommended to open the project using a local server like the VS Code Live Server extension).*

## Note on Architecture
This repository contains the **Frontend** only. To ensure security, all API keys and data extraction logic are housed in a separate, private backend repository hosted on Vercel.
