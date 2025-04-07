# Modern Features Reference

This document serves as a reference for modern features and APIs used in this project, with links to relevant changelogs and documentation.

## Quick Links to Latest Changelogs

- **React**: [https://github.com/facebook/react/releases](https://github.com/facebook/react/releases)
- **ESLint**: [https://github.com/eslint/eslint/blob/main/CHANGELOG.md](https://github.com/eslint/eslint/blob/main/CHANGELOG.md)
- **Vite**: [https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md)
- **Material UI (MUI)**: [https://github.com/mui/material-ui/releases](https://github.com/mui/material-ui/releases)
- **TypeScript 5.7**: [https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html)

## Changelogs

### Core Technologies

- **React**: [https://github.com/facebook/react/releases](https://github.com/facebook/react/releases)
- **TypeScript**: [https://github.com/microsoft/TypeScript/releases](https://github.com/microsoft/TypeScript/releases)
- **Vite**: [https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md)

### UI Libraries

- **Material UI (MUI)**: [https://github.com/mui/material-ui/releases](https://github.com/mui/material-ui/releases)
- **Emotion**: [https://github.com/emotion-js/emotion/releases](https://github.com/emotion-js/emotion/releases)

### Development Tools

- **ESLint**: [https://github.com/eslint/eslint/releases](https://github.com/eslint/eslint/releases)
- **Prettier**: [https://github.com/prettier/prettier/releases](https://github.com/prettier/prettier/releases)

## React 19 Features

React 19 introduces several significant new features and APIs:

### Actions and Transitions

- **`startTransition` with async functions**: Actions can now include side effects like `fetch()` in the pending state
  ```tsx
  startTransition(async () => {
    const data = await fetchData();
    setData(data);
  });
  ```

- **`useActionState`**: A new hook for ordering Actions inside Transitions
  ```tsx
  const [state, dispatch] = useActionState(
    async (state, action) => {
      // Handle action and return new state
    },
    initialState
  );
  ```

- **`useOptimistic`**: For optimistic UI updates during Transitions
  ```tsx
  const [optimisticState, addOptimistic] = useOptimistic(
    currentState,
    (state, optimisticValue) => {
      // Return optimistically updated state
    }
  );
  ```

### Resource Management

- **`use` API**: For reading resources in render
  ```tsx
  function Component() {
    const value = use(promise); // Suspends until promise resolves
    return <div>{value}</div>;
  }
  ```

- **Refs as props**: Refs can now be used directly as props without `forwardRef`
  ```tsx
  function ParentComponent() {
    const ref = useRef(null);
    return <ChildComponent ref={ref} />;
  }
  
  function ChildComponent({ref}) {
    // Use ref directly
  }
  ```

### Form Handling

- **Native form actions**: Form handling with automatic state management
  ```tsx
  <form action={async (formData) => {
    // Process form data
  }}>
    <input name="field" />
    <button type="submit">Submit</button>
  </form>
  ```

- **`useFormStatus`**: Access form submission status
  ```tsx
  function SubmitButton() {
    const { pending } = useFormStatus();
    return <button disabled={pending}>Submit</button>;
  }
  ```

## TypeScript 5.7+ Features

- **Decorator Metadata**: Enhanced decorator support
- **Using declarations**: Improved resource management
- **Improved type inference**: Better type inference in complex scenarios

## Vite 6+ Features

- **Lightning-fast HMR**: Enhanced hot module replacement
- **ESM-first approach**: Native ES modules support
- **Optimized build process**: Faster builds with improved caching

## MUI v6+ Features

- **Improved theming system**: Enhanced customization options
- **New components**: Latest Material Design components
- **Better performance**: Optimized rendering and reduced bundle size

## ESLint v9+ Features

- **Flat config format**: Using `eslint.config.js` instead of `.eslintrc.*`
  ```js
  // eslint.config.js
  export default [
    // config options
  ];
  ```

- **Improved TypeScript integration**: Better type-aware linting

## Modern CSS Approaches

- **CSS-in-JS with Emotion**: Scoped styling with JavaScript
  ```tsx
  const StyledComponent = styled.div`
    color: ${props => props.theme.colors.primary};
  `;
  ```

- **MUI's styled API**: Component-based styling
  ```tsx
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  }));
  ``` 