import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative min-h-screen">
        <header className="border-b border-blue-500/20 bg-slate-900/50 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/flame-icon.svg" alt="Flames" className="w-8 h-8" />
              <h1 className="text-xl font-semibold text-white">Tour Operator CRM</h1>
            </div>
            <div className="text-blue-200 text-sm">Build as you go</div>
          </div>
        </header>
        <main className="py-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App
