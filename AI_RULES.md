# AI Development Rules

This document outlines the technical stack and coding conventions to be followed by the AI editor when modifying this application. The goal is to ensure consistency, maintainability, and adherence to best practices.

## Tech Stack

This is a modern web application built with the following technologies:

-   **Framework**: React (v19) using TypeScript for type safety.
-   **Build Tool**: Vite for fast development and optimized builds.
-   **Styling**: Tailwind CSS is used exclusively for styling. All styles should be applied via utility classes.
-   **UI Components**: The application uses a set of custom-built components. The `shadcn/ui` component library is available and should be the first choice for any new UI elements.
-   **Icons**: `lucide-react` is the designated icon library to ensure visual consistency.
-   **Routing**: A simple, custom client-side routing mechanism is implemented in `App.tsx` using React state. No external routing libraries are used.
-   **Fonts**: The UI uses the 'Inter' font family, configured in `index.html`.
-   **Architecture**: The application follows a component-based architecture, with a main `App.tsx` component orchestrating the views.

## Development & Library Rules

### 1. UI and Component Development

-   **Use `shadcn/ui` First**: When adding new UI elements (buttons, forms, dialogs, etc.), you MUST use the pre-existing `shadcn/ui` components.
-   **Custom Components**: If a `shadcn/ui` component is not suitable, create new, small, single-purpose components in the `src/components/` directory.
-   **Styling**: All styling MUST be done with Tailwind CSS utility classes. Do not add custom CSS files or use inline `style` attributes.
-   **No New UI Libraries**: Do not introduce other UI libraries like Material-UI, Ant Design, or Bootstrap.

### 2. Icons

-   **Use `lucide-react`**: All icons MUST come from the `lucide-react` package. This is non-negotiable for consistency.
-   **Custom SVGs**: Only create a custom SVG icon as a React component if an appropriate icon is absolutely not available in `lucide-react`, as demonstrated with the `FacebookIcon` in `App.tsx`.

### 3. State Management

-   **Local State**: Use `useState` and `useEffect` for component-level state.
-   **Global State**: The application's global state and view management are handled in `App.tsx`. Continue this pattern of lifting state up. Do not introduce libraries like Redux or Zustand.

### 4. Routing

-   **Use Existing Router**: The app uses a state variable (`currentView`) in `App.tsx` to manage which page is displayed. All navigation changes should manipulate this state.
-   **No `react-router-dom`**: Do not install or use `react-router-dom` or any other routing library.

### 5. File Structure

-   **Pages**: Full-page views should be created as components and placed in the `src/pages/` directory.
-   **Components**: Reusable, smaller components should be placed in the `src/components/` directory.
-   **Types**: Shared TypeScript types should be defined in `src/types.ts`.

By following these rules, we can ensure the application remains clean, consistent, and easy to manage.