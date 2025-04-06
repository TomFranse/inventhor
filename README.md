# React + TypeScript + Vite + MUI Boilerplate

This is a boilerplate for React applications using TypeScript, Vite, and Material UI. It follows the Google TypeScript Style Guide and includes ESLint and Prettier for code quality.

## Features

- **React 19**: The latest version of React
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **Material UI**: Component library with a clean, modern design
- **ESLint**: Code linting with Google TypeScript Style Guide rules
- **Prettier**: Code formatting
- **Documentation**: Architecture documentation and changelog

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/mui-cursor-boilerplate.git
   cd mui-cursor-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
project/
├── docs/                  # Documentation files
│   ├── architecture.md    # Application architecture
│   └── changelog.md       # Tracks changes to the application
├── public/                # Static assets
├── src/                   # Source code
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable React components
│   ├── theme/             # MUI theme configuration
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
└── ...                    # Configuration files
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## Styling

This boilerplate uses Material UI for styling, which is based on Emotion (CSS-in-JS). The theme is customizable in the `src/theme` directory.

## Best Practices

- Follow the Google TypeScript Style Guide
- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for props and state
- Use ESLint and Prettier for code quality

## License

MIT

## Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
