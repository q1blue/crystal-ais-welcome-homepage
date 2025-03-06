import React from 'react';
import { Activity, Shield, Database, Cpu, Brain, Network, Zap, Sparkles } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { QuantumVisualizer } from './components/QuantumVisualizer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-400" />
              Crystal AI Brain
            </h1>
            <nav className="flex items-center gap-6">
              <a href="#metrics" className="text-gray-300 hover:text-white transition">Metrics</a>
              <a href="#visualization" className="text-gray-300 hover:text-white transition">Visualization</a>
              <a href="#security" className="text-gray-300 hover:text-white transition">Security</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Quantum Visualizer */}
        <section id="visualization" className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Network className="h-6 w-6 text-blue-400" />
            Quantum Neural Network Visualization
          </h2>
          <QuantumVisualizer />
        </section>

        {/* Metrics Grid */}
        <section id="metrics" className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-400" />
            System Metrics
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Quantum Coherence"
              value="94.3%"
              icon={<Activity size={24} />}
              description="Neural network stability"
              trend={{ value: 2.5, direction: 'up' }}
              color="blue"
            />
            <MetricCard
              title="Security Status"
              value="99.8%"
              icon={<Shield size={24} />}
              description="Quantum encryption active"
              trend={{ value: 0.2, direction: 'up' }}
              color="green"
            />
            <MetricCard
              title="Data Pipelines"
              value="8"
              icon={<Database size={24} />}
              description="Active quantum channels"
              color="purple"
            />
            <MetricCard
              title="Processing Load"
              value="42.7%"
              icon={<Cpu size={24} />}
              description="Quantum processor utilization"
              trend={{ value: 1.3, direction: 'down' }}
              color="yellow"
            />
          </div>
        </section>

        {/* Activity Feed */}
        <section id="security" className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-400" />
            System Activity
          </h2>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 p-6">
            <div className="space-y-4">
              {[
                { time: '2 min ago', event: 'Quantum state optimization completed', status: 'success' },
                { time: '15 min ago', event: 'Neural pathway enhancement', status: 'success' },
                { time: '1 hour ago', event: 'Security protocols updated', status: 'success' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-white">{activity.event}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium text-green-400 bg-green-400/20 rounded-full">
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;