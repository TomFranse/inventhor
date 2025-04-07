# Inventhor - Architecture Documentation

## Overview
This is a React application built with TypeScript and Vite. It follows the Google TypeScript Style Guide and uses Material UI for components. Inventhor is based on the mui-cursor-boilerplate repository but customized for specific needs.

## Project Structure

```
inventhor/
├── documentation/      # Project documentation
│   ├── architecture.md # This file
│   ├── changelog.md    # Record of changes
│   └── reference/      # Reference docs from original boilerplate
├── public/             # Static assets
├── src/                # Source code
│   ├── assets/         # Images, fonts, and other static assets
│   ├── components/     # Reusable React components
│   ├── theme/          # MUI theme configuration
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── vite-env.d.ts   # TypeScript declarations for Vite
├── node_modules/       # Dependencies (git-ignored)
├── .gitignore          # Git ignore file
├── .prettierrc         # Prettier configuration
├── eslint.config.js    # ESLint configuration
├── index.html          # Main HTML entry point
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Dependency lock file
├── tsconfig.json       # TypeScript configuration
├── tsconfig.app.json   # App-specific TypeScript config
├── tsconfig.node.json  # Node-specific TypeScript config
├── vite.config.ts      # Vite configuration
└── README.md           # Project readme
```

## Technology Stack

- **Frontend Framework**: React 19
- **UI Library**: Material UI 6
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: TBD

## Key Components

The application structure follows a standard React+TypeScript+Vite project with Material UI integration.

### Core Technology Details

- React with TypeScript for type-safe component development
- Material UI for consistent and responsive UI components
- Vite for fast development experience and optimized builds
- ESLint and Prettier for code quality and formatting

## Styling
The application uses Material UI for styling, which is based on Emotion (CSS-in-JS). The theme is customizable in the `src/theme` directory.

## Best Practices
- Follow the Google TypeScript Style Guide
- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for props and state
- Use ESLint and Prettier for code quality

## Architectural Patterns

To be expanded as the development progresses. 