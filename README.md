# To-Do Manager

A task management application built with React, Redux, and Chakra UI. The ToDo Manager helps users organize tasks by priority, due date, and completion status. Users can add, edit, view, delete, and mark tasks as complete. The application supports task categories like "Upcoming Tasks," "Overdue Tasks," and "Completed Tasks" and provides a visually cohesive and responsive design.

Live Demo :
    https://elitefit-six.vercel.app/
## ✨ Features

- 📊 **Priority Management**
  - Organize tasks by High, Medium, and Low priority
  - Visual indicators for different priority levels
  - Quick priority updates via drag-and-drop

- 🔍 **Smart Search & Filtering**
  - Search tasks by title or description
  - Filter by priority level
  - Filter by completion status
  - Combination filters for precise task finding

- 💾 **Data Persistence**
  - Automatic saving to local storage
  - No data loss between sessions
  - Optional cloud sync (coming soon)

- 📱 **Responsive Design**
  - Mobile-first approach
  - Accessible on all devices
  - Touch-friendly interfaces

- ✏️ **Task Management**
  - Create, edit, and delete tasks
  - Rich text descriptions
  - Due date scheduling
  - Task categories and tags

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bikashsahh/EliteFit/
cd EliteFit
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Project Structure

```
todo-manager/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── TaskItem/       # Individual task component
│   │   ├── TaskList/       # Task list container
│   │   └── NoTask/         # Empty state component
│   ├── pages/              # Application pages
│   │   ├── UpcomingTasks/  # Upcoming tasks view
│   │   ├── OverdueTasks/   # Overdue tasks view
│   │   └── Completed/      # Completed tasks view
│   ├── redux-store/        # State management
│   │   ├── actions/        # Redux actions
│   │   ├── reducers/       # State reducers
│   │   └── todoSlice.js    # Todo feature slice
│   ├── utils/              # Helper functions
│   ├── assets/             # Static assets
│   ├── App.js              # Root component
│   └── index.js            # Entry point
├── public/                 # Static files
└── package.json            # Project metadata
```

## 📖 Usage

### Creating a Task

1. Click the "+" button in the bottom right corner
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Priority level
   - Due date (optional)
3. Click "Save" to create the task

### Managing Tasks

- **Edit**: Click the pencil icon on any task
- **Delete**: Click the trash icon
- **Complete**: Check the checkbox
- **Change Priority**: Use the priority dropdown
- **Filter**: Use the filter bar at the top
- **Search**: Type in the search box to find specific tasks


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.


## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Redux](https://redux.js.org/) - State Management
- [Chakra UI](https://chakra-ui.com/) - Component Library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library

## 📫 Contact

Project Link: [https://github.com/bikashsahh/EliteFit/](https://github.com/bikashsahh/EliteFit/)

---
Made with ❤️ by Bikash