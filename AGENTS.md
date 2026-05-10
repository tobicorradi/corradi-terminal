# Engineering Preferences

These rules define how code should be written and organized in this repository.

## PR Instructions

- Always run `npm run lint` and `npm test` before committing.
- Do not open a PR with failing lint or tests.

## Architecture and Organization

- Keep the codebase clean and well-structured.
- Organize code by responsibility and domain (for example: `hooks`, `utils`, `components`, `services`, `lib`, feature folders).
- Use functional components with hooks as the primary React pattern.
- Prefer composition over inheritance.
- Keep presentational and container concerns clearly separated.
- Use custom hooks for reusable stateful logic.
- Build component hierarchies with clear one-way data flow.
- Avoid duplicated logic. Before implementing new logic, check existing modules and reuse when possible.

## Exports and Imports

- Prefer barrel exports. Add `index.ts` files and export public modules from there.
- Avoid default exports for project code.
- Use named exports for components and modules (for example: `export const MyComponent = ...`).

## Component Design

- Component names must use `CamelCase`.
- Follow the single responsibility principle.
- Keep components small and focused on one concern.
- If a component grows beyond ~250 lines, split UI or extract logic into utilities/custom hooks.
- Design components to be reusable, testable, and configurable.
- Use composition patterns when they improve clarity and reuse.
- Each component should have its own stylesheet module pair (for example: `MyComponent.tsx` and `MyComponent.module.css`).
- Use TypeScript props/interfaces for prop validation and contracts.

## State Management

- Use `useState` for simple local state.
- Use `useReducer` for complex local state transitions.
- Use `useContext` for shared state across component trees.
- Consider external state libraries (Redux Toolkit, Zustand) only when app complexity justifies it.
- Keep state normalized and use predictable data structures.
- For client-side server state, prefer React Query or SWR when needed.

## Hooks and Effects

- Follow the Rules of Hooks.
- Always use correct `useEffect` dependency arrays.
- Add cleanup functions in effects to prevent leaks.
- Use `useMemo` and `useCallback` only when they provide measurable clarity or performance value.
- Use `useRef` for DOM access and mutable values that should not trigger renders.
- Extract repeated stateful logic into custom hooks.

## Data Fetching

- Implement explicit loading, error, and success states.
- Handle network failures and degraded scenarios gracefully.
- Handle race conditions and request cancellation where relevant.
- Use caching strategies intentionally.
- Use optimistic updates when they improve UX and are safe for the domain.

## Error Handling

- Implement Error Boundaries for UI-level crash isolation.
- Handle async errors in effects and event handlers.
- Provide meaningful fallback UI and user-facing error messages.
- Log errors with enough context for debugging.

## Forms and Validation

- Use controlled inputs for forms.
- Use robust validation patterns and libraries when complexity warrants it.
- Handle submit, pending, success, and error states explicitly.
- Include accessibility support for forms (labels, ARIA, keyboard behavior).
- Use debounced validation only when it improves UX.

## Testing

- Always add unit tests for new logic and behavior changes.
- Update existing tests when behavior changes.
- Use React Testing Library and Jest.
- Test behavior and outcomes, not implementation details.
- Add integration tests for complex flows and interactions.
- Mock external dependencies and API calls appropriately.
- Include accessibility-oriented tests when relevant.

## Naming Conventions

- Use `snake-case` for `utils`, `assets`, and `lib` filenames.
- Keep naming consistent and predictable across the codebase.

## Language and Documentation

- Use English only in code, comments, docs, README files, UI labels, and any written project content.
- Do not introduce Spanish into the codebase.

## Readability Standard

- Prioritize clarity over cleverness.
- If code is hard to read, refactor it before considering the task complete.
