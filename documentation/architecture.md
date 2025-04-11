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
│   │   ├── Header.tsx  # Application header component
│   │   └── ChatComponent.tsx # Custom AI chat implementation
│   ├── theme/          # MUI theme configuration
│   ├── firebase-config.ts # Firebase configuration
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── vite-env.d.ts   # TypeScript declarations for Vite
├── node_modules/       # Dependencies (git-ignored)
├── .env                # Environment variables (sensitive data, git-ignored)
├── .env.local          # Local environment variables (git-ignored)
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
- **AI Integration**: ai-chat-base (using useChat hook)
- **Database/Storage**: Firebase Firestore (optional)
- **State Management**: React Hooks
- **Error Handling**: Centralized with Material UI components

## Key Components

The application structure follows a standard React+TypeScript+Vite project with Material UI integration.

### Core Technology Details

- React with TypeScript for type-safe component development
- Material UI for consistent and responsive UI components
- Vite for fast development experience and optimized builds
- ESLint and Prettier for code quality and formatting
- ai-chat-base for AI chat integration (using the useChat hook)
- Firebase for conversation persistence with robust error handling
- Material UI Alert and Snackbar for user notifications and error feedback

### AI Chat Integration

The application integrates a custom AI chat component at the top of the main page:

- **ChatComponent**: A direct integration with the OpenAI API
- Features include:
  - Custom Material UI styling for chat bubbles and interface
  - User and AI message display with timestamps
  - Loading indicators during AI response generation
  - Message input with support for multiline text and Enter key submission
  - New chat creation button
  - Empty state with welcome message
  - Fully responsive design
  - Error handling with visual feedback
  - Advanced API key validation (supports standard, project, and service account keys)
  - Status notifications
- Backend configuration:
  - Support for multiple OpenAI API key formats:
    - Standard API keys (`sk-...`)
    - Project API keys (`sk-proj-...`)
    - Service account API keys (`sk-svcacct-...`)
  - Model selection (default: gpt-4o)
  - Temperature and token settings
  - Firebase integration for conversation persistence
  - Error handling for API communication failures

### Firebase Integration

The application can optionally use Firebase for chat conversation persistence:

- **firebase-config.ts**: Type-safe initialization with proper error handling
  - Conditional initialization based on environment variables
  - Graceful fallback when configuration is missing
  - TypeScript types for better code safety
  - Console warnings and errors for debugging
- The useChat hook connects to Firebase if environment variables are configured
- Chat conversations can be saved and retrieved between sessions
- User interface indicators show Firebase connection status
- Robust error handling prevents crashes when Firebase is misconfigured

## Environment Configuration

The application uses environment variables for configuration:

- `.env.local`: Contains sensitive API keys and configuration (not committed to git)
  - `VITE_OPENAI_API_KEY`: API key for OpenAI integration (required)
  - `VITE_FIREBASE_*`: Firebase configuration variables for conversation persistence (optional)
  - `VITE_AIRTABLE_ACCESS_TOKEN`: Airtable access token
  - Includes step-by-step instructions for setting up Firebase

## Error Handling

The application implements a comprehensive error handling strategy:

- **API Key Validation**: Validates OpenAI API key on component initialization
- **Error Notifications**: Uses Material UI Alert and Snackbar components
- **Firebase Connection Errors**: Gracefully handled with fallback to non-persistent mode
- **API Communication Errors**: Captured and displayed to the user
- **Try-Catch Blocks**: Used for error-prone operations like message sending
- **Console Logging**: Detailed error information for debugging
- **Visual Feedback**: UI elements reflect error states

## Styling
The application uses Material UI for styling, which is based on Emotion (CSS-in-JS). The theme is customizable in the `src/theme` directory. The chat component is styled to match the overall Material UI theme.

## Best Practices
- Follow the Google TypeScript Style Guide
- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for props and state
- Use ESLint and Prettier for code quality
- Secure API keys and sensitive data using environment variables
- Implement comprehensive error handling
- Provide clear visual feedback for user actions and system state

## Architectural Patterns

- **Custom Hooks**: The application leverages the useChat hook from ai-chat-base for state management and AI communication
- **Conditional Rendering**: Used throughout the ChatComponent for loading states and empty states
- **Component Composition**: UI is built from composable Material UI components
- **Environment-based Configuration**: Application features adjust based on available environment variables
- **Error Boundary Pattern**: Centralized error handling prevents cascading failures
- **Service Initialization Pattern**: Firebase services are initialized safely with fallbacks
- **Feature Flagging**: Features like Firebase persistence are enabled/disabled based on configuration

Additional patterns will be added as development progresses. 