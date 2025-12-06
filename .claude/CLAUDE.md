# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Simple Japanese-language TODO application built with React 19, TypeScript, and Vite. Features include task categorization, due dates, filtering, and localStorage persistence.

## Development Commands

```bash
# Start development server (http://localhost:5173 by default)
npm run dev

# Build for production (TypeScript check + Vite build)
npm run build

# Preview production build
npm run preview
```

## Architecture

### State Management

**No external state library** - Uses React hooks and localStorage persistence:

- **useLocalStorage hook** (`src/hooks/useLocalStorage.ts`): Custom hook that syncs state with localStorage
  - Automatically saves to localStorage on every state update
  - Handles JSON serialization/deserialization
  - Provides fallback to initial value on errors

### Data Model

**Todo Interface** (`src/types.ts:1-9`):

```typescript
{
  id: string;              // Generated with crypto.randomUUID()
  title: string;
  completed: boolean;
  category: string;
  dueDate?: string;        // ISO string format
  createdAt: string;       // ISO string format
  updatedAt: string;       // ISO string format
}
```

### Component Structure

**App.tsx** - Root component with all business logic:

- `addTodo()` - Creates new todo with UUID and timestamps
- `toggleTodo()` - Toggles completed status and updates timestamp
- `deleteTodo()` - Removes todo by ID
- `updateTodo()` - Updates todo with partial fields and timestamp
- All state management happens here, passed down as props

**TodoForm.tsx** - Add new todos:

- Controlled form with title (required), category (default: "一般"), and optional due date
- Resets form after submission

**TodoItem.tsx** - Individual todo display and editing:

- Inline editing mode with save/cancel
- Overdue detection (highlights if past due date and not completed)
- Checkbox for completion, edit/delete buttons

**TodoList.tsx** - Simple mapping component that renders TodoItem array

**TodoFilters.tsx** - Filter controls for status (all/active/completed) and category

### Filtering and Sorting

**Implementation** (`src/App.tsx:55-74`):

1. **Status filter**: 'all' | 'active' | 'completed'
2. **Category filter**: Dropdown of unique categories from existing todos
3. **Automatic sorting**: By due date (ascending), items without due dates appear last
4. Both filters work together (AND logic)

### Language

All UI text is in Japanese. Key terms:

- TODO = TODO (same in Japanese)
- 一般 = "General" (default category)
- 期限 = "Due date"
- カテゴリ = "Category"

## TypeScript Configuration

- Strict mode enabled
- Target: ES2020
- Module resolution: bundler
- JSX: react-jsx (new JSX transform)
- noEmit: true (Vite handles builds)

##テストコード作成時の厳守事項

###絶対に守ってください！

####テストコードの品質

- テストは必ず実際の機能を検証すること
- `except(true).toBe(true)`のような意味のないアサーテーションは絶対に書かない
- 各テストケースは具体的な入力と期待される出力を検証すること
- モックは必要最小限に留め、実際の動作に近い形でテストすること
