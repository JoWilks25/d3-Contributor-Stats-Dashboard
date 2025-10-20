import BarChart from './components/BarChart';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <h1 className="text-2xl font-bold mb-4">d3 + Tailwind + React</h1>
      <BarChart data={[3, 7, 4, 9, 2, 6]} />
    </div>
  );
}
