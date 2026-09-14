# ♟️ Chess

A browser-based chess game built with **React, TypeScript and Vite**.

### 🎮 [Play Chess online →](https://toocleverfox.github.io/Chess/)

## ✨ Features

* Standard chess board and piece movement
* Capturing pieces
* Check and checkmate detection
* Stalemate detection
* King-safety validation
* Pawn promotion
* Player timer
* Game saving and restoring

## 🛠️ Tech Stack

* React
* TypeScript
* Vite

## 🏗️ Architecture

The chess logic is separated from the React UI.

The `Board` class manages the game state and rules, while each chess piece has its own class with movement and attack logic.

```text
Board
 ├── Cell
 └── Figures
      ├── Pawn
      ├── Rook
      ├── Knight
      ├── Bishop
      ├── Queen
      └── King
```

React components handle rendering and user interaction.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Run tests:

```bash
npm run test
```

Build the project:

```bash
npm run build
```

## 📌 Future Improvements

* Castling
* En passant
* Threefold repetition
* Fifty-move rule
* Online multiplayer
---

## 📸 Preview
<img width="1466" height="779" alt="image" src="https://github.com/user-attachments/assets/b0867c70-7cda-4469-b118-9e9d953c22e9"
/>

