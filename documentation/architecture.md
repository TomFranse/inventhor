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
│   │   ├── ChatComponent.tsx # Custom AI chat implementation with direct OpenAI API integration
│   │   ├── UserInstructionsForm.tsx # Form for custom AI instructions
│   │   ├── Card.tsx    # Card component for displaying content in a grid layout
│   │   └── FadeInImage.tsx # Component for smooth image loading with error handling
│   ├── theme/          # MUI theme configuration
│   │   ├── index.ts    # Theme entry point
│   │   └── inventor_dark_theme.ts # Comprehensive dark theme with component styling
│   ├── firebase-config.ts # Firebase configuration
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   ├── styles.css      # Consolidated global styles
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
- **AI Integration**: Direct OpenAI API integration
- **Database/Storage**: Firebase Firestore (optional)
- **State Management**: React Hooks
- **Error Handling**: Centralized with Material UI components
- **Routing**: React Router v6
- **Image Handling**: Custom FadeInImage component with error handling
- **Styling**: MUI theme system with CSS-in-JS approach

## Key Components

The application structure follows a standard React+TypeScript+Vite project with Material UI integration.

### Core Technology Details

- React with TypeScript for type-safe component development
- Material UI for consistent and responsive UI components
- Vite for fast development experience and optimized builds
- ESLint and Prettier for code quality and formatting
- Direct OpenAI API integration using fetch
- Firebase for conversation persistence with robust error handling
- Material UI Alert and Snackbar for user notifications and error feedback
- React Router for client-side navigation

### Styling System

The application uses a comprehensive styling approach centered around the Material UI theme system:

- **Theme Configuration**: Located in `src/theme/inventor_dark_theme.ts`, this is the central place for styling definitions
- **Component Styling**: Most component styling is defined in the theme's `components` property
- **Global Styles**: Applied through the theme's `CssBaseline` component
- **Minimal CSS**: A small amount of supplementary CSS in `styles.css` for utility classes and global resets
- **Consistent Design Language**: The dark theme follows a cohesive color scheme with Inventor Blue (#2979FF) as the primary color

The styling system follows these principles:
- Centralization of styles in the theme for consistent design
- Use of MUI's sx prop for component-specific styling
- Minimization of external CSS files and class names
- Typed styling through TypeScript interfaces
- Responsive design with proper breakpoints
- Dark theme optimized for readability and aesthetics

### AI Chat Integration

The application integrates a custom AI chat component at the top of the main page:

- **ChatComponent**: A direct integration with the OpenAI API
  - Custom implementation with real OpenAI API calls
  - No dependency on third-party chat packages for core functionality
  - Full control over request and response handling
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

### Content Cards

The application includes reusable card components for displaying content:

- **Card Component**: A customizable card that can be used to display various types of content
  - Uses MUI Card as a base with enhanced functionality
  - Features:
    - Responsive design that works in grid layouts
    - Image support with smooth loading
    - Title and subtitle with automatic text truncation
    - Active/inactive states with visual indicators
    - Hover effects for better user interaction
    - React Router integration for navigation
    - Fully typed props with TypeScript

- **FadeInImage Component**: A specialized image component with enhanced UX
  - Features:
    - Smooth fade-in effect when images load
    - Loading skeleton while images are loading
    - Error handling for missing or expired images
    - Caching of loaded images for better performance
    - Customizable aspect ratio and container dimensions
    - Support for object-fit and object-position
    - Optional gradient overlay

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

### Environment Configuration

The application uses environment variables for configuration:

- `.env.local`: Contains sensitive API keys and configuration (not committed to git)
  - `VITE_OPENAI_API_KEY`: API key for OpenAI integration (required)
  - `VITE_FIREBASE_*`: Firebase configuration variables for conversation persistence (optional)
  - `VITE_AIRTABLE_ACCESS_TOKEN`: Airtable access token
  - Includes step-by-step instructions for setting up Firebase

### Error Handling

The application implements a comprehensive error handling strategy:

- **API Key Validation**: Validates OpenAI API key on component initialization
- **Error Notifications**: Uses Material UI Alert and Snackbar components
- **Firebase Connection Errors**: Gracefully handled with fallback to non-persistent mode
- **API Communication Errors**: Captured and displayed to the user
- **Try-Catch Blocks**: Used for error-prone operations like message sending
- **Console Logging**: Detailed error information for debugging
- **Visual Feedback**: UI elements reflect error states

### Best Practices
- Follow the Google TypeScript Style Guide
- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for props and state
- Use ESLint and Prettier for code quality
- Secure API keys and sensitive data using environment variables
- Implement comprehensive error handling
- Provide clear visual feedback for user actions and system state
- Centralize styling in the MUI theme system
- Minimize use of CSS in separate files

### Architectural Patterns

- **Custom Hooks**: The application leverages the useChat hook from ai-chat-base for state management and AI communication
- **Conditional Rendering**: Used throughout the ChatComponent for loading states and empty states
- **Component Composition**: UI is built from composable Material UI components
- **Environment-based Configuration**: Application features adjust based on available environment variables
- **Error Boundary Pattern**: Centralized error handling prevents cascading failures
- **Service Initialization Pattern**: Firebase services are initialized safely with fallbacks
- **Feature Flagging**: Features like Firebase persistence are enabled/disabled based on configuration

Additional patterns will be added as development progresses. 