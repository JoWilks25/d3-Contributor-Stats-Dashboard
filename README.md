# D3 Contributor Stats Dashboard

A modern React TypeScript application with D3.js for data visualization and Tailwind CSS for styling.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **D3.js** - Data visualization
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── BarChart.tsx    # Example D3 bar chart component
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind directives
```

## Example Component

The `BarChart` component demonstrates how to integrate D3.js with React:

```tsx
import BarChart from './components/BarChart';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <h1 className="text-2xl font-bold mb-4">d3 + Tailwind + React</h1>
      <BarChart data={[3, 7, 4, 9, 2, 6]} />
    </div>
  );
}
```

## Features

- ⚡ Fast development with Vite
- 🎨 Beautiful UI with Tailwind CSS
- 📊 Data visualization with D3.js
- 🔒 Type safety with TypeScript
- 🧹 ESLint for code quality

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request