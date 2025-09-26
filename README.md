# Pokémon Episode Tracker

A companion web app for tracking Pokémon appearances throughout the **Pokémon anime**.  
Easily log Pokémon, mark their first appearance, and see how many total episodes they’ve appeared in.  
Built with **React + TypeScript** and styled with custom CSS.

---

## ✨ Features

- 📖 **Pokédex Integration**  
  Auto-completes Pokémon by name or Pokédex number using the [PokéAPI](https://pokeapi.co).

- 🎬 **Episode Tracking**  
  Record a Pokémon’s **first appearance** and track how many times it shows up.

- 🖼️ **Pokémon Cards & Modals**  
  Clean card view with images, types, first appearance, and total episode count.  
  Detailed modal view with stats and evolution chain.

- 🔍 **Filters**

  - Filter Pokémon by **type**
  - Filter Pokémon by **season**
  - Clear filters with one click

- 🧹 **Form Controls**

  - Add new Pokémon
  - Update Pokémon
  - Clear form with a dedicated button

- 💾 **Local Persistence**  
  Your Pokémon list is saved in **localStorage** so it’s still there after refreshing.

---

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/ZNeill23/pokemon-episode-tracker.git
cd pokemon-episode-tracker

### 2. Install Dependencies

npm install

### 3. Start the Development Server

npm start

## 📂 Project Structure

src/

├─ components/ # React components (Form, Cards, Modal, Filters)

├─ data/ # Episodes list, Pokemon types, sample data

├─ services/ # API helpers (PokéAPI calls)

├─ index.css # Global styling

└─ App.tsx # Main entry

## 🛠️ Tech Stack

React (with Hooks)

TypeScript

PokéAPI (for Pokémon data)

CSS (custom styling)

## 📜 License

This project is for educational and fan purposes.
Pokémon content and assets are © Nintendo / Game Freak / Creatures / The Pokémon Company.
