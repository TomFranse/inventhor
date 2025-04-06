# Application Architecture

## Overview
This is a React application built with TypeScript and Vite. It follows the Google TypeScript Style Guide and uses Material UI for components.

## Directory Structure
```
mui-cursor-boilerplate/
├── docs/                  # Documentation files
│   ├── architecture.md    # This file - describes the application architecture
│   └── changelog.md       # Tracks changes to the application
├── public/                # Static assets that will be served directly
├── src/                   # Source code
│   ├── assets/            # Images, fonts, and other static assets
│   ├── components/        # Reusable React components
│   ├── theme/             # MUI theme configuration
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # TypeScript declarations for Vite
├── .gitignore             # Specifies files to be ignored by Git
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # TypeScript configuration for the app
├── tsconfig.node.json     # TypeScript configuration for Node.js
└── vite.config.ts         # Vite configuration
```

## Technology Stack
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **Material UI**: Component library
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Styling
The application uses Material UI for styling, which is based on Emotion (CSS-in-JS). The theme is customizable in the `src/theme` directory.

## Best Practices
- Follow the Google TypeScript Style Guide
- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for props and state
- Use ESLint and Prettier for code quality 