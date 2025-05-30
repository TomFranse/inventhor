# Inventhor - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.16] - 2025-04-17

### Changed
- Implemented new Inventhor Material Theme design system based on JSON configuration
- Replaced inventor_dark_theme.ts with inventor_theme.ts for more flexible theming
- Added support for both light and dark themes based on Material Design 3 guidelines
- Enhanced color system with primary, secondary, and error color palettes from the JSON theme
- Improved component styling with theme-consistent colors from the Material Theme
- Updated typography to follow Inventhor styling guide using Montserrat font
- Enhanced accessibility with proper contrast in both light and dark modes

### Added
- Added Inventhor-material-theme.json file with Material Design 3 color system
- Added light and dark theme exports for future theme switching capability
- Enhanced theme index to expose both light and dark themes

### Removed
- Removed old theme implementation in favor of Material Theme JSON approach

## [0.1.15] - 2024-06-10

### Changed
- Switched Airtable integration from Tasks to Projects table
- Updated types to match Projects table structure
- Modified AirtableService to support Projects API
- Updated UI to display Projects instead of Tasks
- Added Projects-specific fallback data for API failure cases

## [0.1.14] - 2024-06-09

### Changed
- Removed explicit borders and outlines from all components except text inputs
- Updated theme configuration to eliminate unwanted shadows and borders
- Enhanced visual consistency by removing border from UserInstructionsForm
- Removed box-shadows from chat message bubbles
- Updated card hover effects to maintain borderless design
- Set Paper components to elevation=0 to remove shadows

## [0.1.13] - 2024-06-09

### Changed
- Harmonized all component colors with the theme palette
- Updated FadeInImage to use theme-consistent colors
- Changed ChatComponent to use dynamic theme colors for all UI elements
- Replaced hardcoded hex color values with theme-based color references
- Improved consistency of dark theme appearance across all components
- Added useTheme hook in components for dynamic theme access

## [0.1.12] - 2024-06-09

### Changed
- Consolidated styling approach by enhancing the MUI theme configuration
- Replaced multiple CSS files with a single consolidated styles.css
- Integrated global styles into the theme's CssBaseline
- Enhanced theme with comprehensive component style overrides
- Simplified Card component to leverage theme styling
- Added custom scrollbar styling for better dark theme experience
- Improved responsive design with utility classes

### Removed
- Eliminated redundant CSS files (index.css, App.css)
- Removed duplicate styling code from components

## [0.1.11] - 2024-06-09

### Added
- Integrated Card component for displaying content in a visually appealing way
- Added FadeInImage component for smooth image loading with error handling
- Added react-router-dom for navigation support
- Created a grid layout with dummy card data for innovation tools

### Changed
- Replaced counter button with a grid of cards in the main application
- Updated App component to use BrowserRouter for routing
- Enhanced UI with better visual hierarchy and layout

## [0.1.10] - 2024-04-07

### Changed
- Simplified codebase by removing unnecessary debug logging
- Improved TypeScript typing for headers and API requests
- Fixed TypeScript errors in conversation history view
- Updated architecture documentation to reflect direct OpenAI API integration

### Fixed
- Resolved Material UI ListItem TypeScript error

## [0.1.9] - 2024-04-07

### Fixed
- Added support for service account API keys (keys starting with `sk-svcacct-`)
- Enhanced API key validation to recognize multiple key formats
- Improved error handling and logging for API requests
- Fixed "OpenAI-Organization header should match organization for API key" error for service account keys

## [0.1.8] - 2024-04-07

### Fixed
- Resolved "OpenAI-Organization header should match organization for API key" error
- Fixed API integration for project-based API keys by removing the OpenAI-Organization header
- Improved API call handling for different types of OpenAI API keys

## [0.1.7] - 2024-04-07

### Changed
- Replaced ai-chat-base package with direct OpenAI API integration in ChatComponent
- Implemented proper message handling with direct API calls to OpenAI
- Enhanced error handling for API failures
- Improved message transmission and conversation synchronization

### Fixed
- Resolved issue with simulated responses by bypassing the ai-chat-base package
- Fixed API key handling for project-based OpenAI credentials

## [0.1.6] - 2024-04-07

### Added
- Created UserInstructionsForm component for custom AI instructions
- Added Firestore helper functions for saving and retrieving conversations
- Implemented conversation history with Firebase Firestore
- Added UUID generation for unique conversation tracking
- Added conversation menu with history viewing capability
- Enhanced AI behavior with custom user instructions support

### Changed
- Extended Firebase configuration with Firestore helper functions
- Updated ChatComponent to support conversation persistence
- Improved error handling for Firestore operations

## [0.1.5] - 2024-04-07

### Added
- Enhanced error handling for API key and service integrations
- Added status notifications via Snackbar
- Implemented API key validation
- Added error banner for API configuration issues
- Added Firebase connection status indicator

### Changed
- Improved Firebase initialization with proper error handling
- Enhanced .env.local with clearer Firebase setup instructions
- Enhanced ChatComponent with better error states and user feedback
- Updated Firebase configuration to handle initialization failures gracefully

## [0.1.4] - 2024-04-07

### Changed
- Replaced ChatContainer with a custom chat implementation using the useChat hook
- Implemented a fully custom UI for the chat interface with Material UI components
- Enhanced chat UI with message bubbles, timestamps, and loading indicators
- Improved environment variable instructions for better developer experience
- Streamlined application content for more professional appearance

## [0.1.3] - 2024-04-07

### Added
- Added Firebase integration for chat conversation persistence
- Created firebase-config.ts file for Firebase services initialization
- Added Firebase as a dependency in package.json
- Enhanced environment variable templates with clearer instructions

### Changed
- Improved AI Chat component with proper configuration based on documentation
- Updated UI layout to give more prominence to the chat interface
- Added welcoming initial message to the chat
- Updated application content to better reflect Inventhor branding

## [0.1.2] - 2024-04-07

### Added
- Integrated AI Chat component at the top of the main page
- Created ChatComponent to wrap the ai-chat-base package
- Added environment variable configuration for OpenAI API integration
- Updated documentation to reflect AI chat integration

### Changed
- Updated App component to display the ChatComponent
- Changed app title from "MUI Cursor Boilerplate" to "Inventhor"

## [0.1.1] - 2024-04-07

### Changed
- Consolidated documentation structure: merged docs and documentation folders
- Relocated reference documentation to documentation/reference
- Updated architecture and changelog documentation

### Removed
- Eliminated redundant docs folder

## [0.1.0] - 2024-04-06

### Added
- Initial project setup based on mui-cursor-boilerplate
- Created documentation structure
- Created architecture.md and changelog.md files
- Renamed project from mui-cursor-boilerplate to inventhor
- Installed all dependencies
- Initialized Git repository
- Connected to GitHub remote repository (https://github.com/TomFranse/inventhor.git)
- Inherited from boilerplate:
  - Material UI integration
  - ESLint configuration with Google TypeScript Style Guide
  - Prettier for code formatting
  - Modern features reference with links to relevant changelogs and examples

### Changed
- Package name updated in package.json

### Removed
- N/A

## [Unreleased]

### Added
- Airtable integration to fetch and display tasks
- Types for Airtable data structures
- AirtableService for API communication
- Error handling for failed API requests
- Loading state for data fetching
- Default fallback for images that fail to load
- Fallback data for when API requests fail 