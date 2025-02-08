# 📝 Serif Habit Tracker

A modern, elegant habit tracking application with a serif-styled interface that helps you build and maintain daily habits through an intuitive, emoji-based tracking system.

## ✨ Features

- **📊 Grid-Based Interface**: Visually track your habits with a clean, responsive calendar grid
- **🎯 Emoji Status Tracking**: Use meaningful emojis to represent different habit states and types
- **✏️ Inline Editing**: Quickly update habit status without leaving the main view
- **📱 Responsive Design**: Seamlessly works across desktop, tablet, and mobile devices
- **🎨 Serif Typography**: Beautiful, readable serif fonts for a classic, professional look

![Demo](https://raw.githubusercontent.com/rhysonate/serif-habit-tracker/main/attached_assets/image_1738302941148.png)
## 🛠️ Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query
- **Routing**: Wouter
- **Database**: PostgreSQL with Drizzle ORM
- **Backend**: Express.js
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```
   DATABASE_URL=your_postgresql_database_url
   ```
4. Push the database schema:
   ```bash
   npm run db:push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`.

## 💡 Usage

1. **Adding Habits**
   - Click the "Add Habit" button
   - Enter habit name and select an emoji type
   - Choose tracking frequency

2. **Tracking Progress**
   - Click on grid cells to toggle habit status
   - Different emojis represent different completion states
   - View progress in the calendar view

3. **Viewing Statistics**
   - Check your streak on the main dashboard
   - View detailed statistics for each habit
   - Track completion rates over time

## 🧑‍💻 Development

- **File Structure**
  ```
  ├── client/           # Frontend React application
  │   ├── src/
  │   │   ├── components/
  │   │   ├── hooks/
  │   │   ├── lib/
  │   │   └── pages/
  ├── db/              # Database schema and configuration
  └── server/          # Express backend
  ```

- **Key Components**
  - `CalendarView`: Grid-based habit tracking interface
  - `HabitRow`: Individual habit tracking row
  - Custom hooks for data management and UI state

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
