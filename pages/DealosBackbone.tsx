import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { Button, Card, Input } from '../components/ui/UIComponents';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 1, title: 'Site Selection', status: 'completed' },
  { id: 2, title: 'Regulation', status: 'completed' },
  { id: 3, title: 'Dev Scenario', status: 'current' },
  { id: 4, title: 'Cost Analysis', status: 'pending' },
  { id: 5, title: 'Revenue Model', status: 'pending' },
  { id: 6, title: 'Financial Structure', status: 'pending' },
  { id: 7, title: 'Risk/Sensitivity', status: 'pending' },
  { id: 8, title: 'Report', status: 'pending' },
];

const DealosBackbone: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(3);
  const [isStale, setIsStale] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Wizard Header */}
      <header className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white z-20">
        <div className="flex items-center space-x-4">
           <span className="font-bold text-xl text-slate-900">New Analysis</span>
           <span className="text-slate-300">|</span>
           <span className="text-sm text-slate-500">Project ID: PRJ-2024-001</span>
        </div>
        <div className="flex items-center space-x-4">
           <Button variant="ghost" onClick={() => navigate('/map')}>Exit</Button>
           <Button variant="outline" onClick={() => setIsStale(!isStale)}>Simulate Change</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Step Navigator */}
        <nav className="w-64 border-r border-slate-200 bg-slate-50 p-6 overflow-y-auto hidden md:block">
           <div className="space-y-6 relative">
              {/* Vertical Line */}
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-200 -z-10"></div>

              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start group cursor-pointer" onClick={() => setCurrentStep(step.id)}>
                   <div className={`
                      w-7 h-7 rounded-full flex items-center justify-center border-2 z-10 bg-white
                      ${step.id === currentStep ? 'border-primary-600 text-primary-600' : 
                        step.id < currentStep ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300 text-slate-300'}
                   `}>
                      {step.id < currentStep ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{step.id}</span>}
                   </div>
                   <div className="ml-3 pt-0.5">
                      <p className={`text-sm font-medium ${step.id === currentStep ? 'text-primary-700' : 'text-slate-600'}`}>
                        {step.title}
                      </p>
                      {step.id === currentStep && <p className="text-xs text-slate-400 mt-0.5">In Progress...</p>}
                   </div>
                </div>
              ))}
           </div>
        </nav>

        {/* Center Content */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-white relative">
          
          {/* Stale Data Warning Banner */}
          {isStale && (
            <div className="bg-amber-50 border-b border-amber-200 p-3 flex items-center justify-center space-x-3 sticky top-0 z-10">
               <RefreshCw className="w-4 h-4 text-amber-600 animate-spin-slow" />
               <span className="text-sm font-medium text-amber-800">Parameters changed in previous steps. Recalculation required.</span>
               <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white border-none">Update Results</Button>
            </div>
          )}

          <div className="max-w-2xl mx-auto w-full py-12 px-6">
             <div className="mb-8">
               <h2 className="text-2xl font-bold text-slate-900">Development Scenario</h2>
               <p className="text-slate-500 mt-2">Define the scale and program mix of your project.</p>
             </div>

             <div className="space-y-6">
                <Card className="p-6">
                   <h3 className="font-semibold text-slate-900 mb-4">Building Scale</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Floors (Above)</label>
                        <Input type="number" defaultValue={15} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Floors (Underground)</label>
                        <Input type="number" defaultValue={5} />
                      </div>
                      <div className="col-span-2">
                         <label className="block text-sm font-medium text-slate-700 mb-1">Target FAR (%)</label>
                         <div className="flex items-center space-x-2">
                           <input type="range" min="100" max="1000" defaultValue="800" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                           <span className="text-sm font-bold w-12 text-right">800%</span>
                         </div>
                      </div>
                   </div>
                </Card>

                <Card className="p-6">
                   <h3 className="font-semibold text-slate-900 mb-4">Usage Mix</h3>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                         <span className="font-medium text-sm">Office</span>
                         <div className="flex items-center space-x-2">
                            <Input className="w-20 text-right" defaultValue="70" />
                            <span className="text-slate-500 text-sm">%</span>
                         </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                         <span className="font-medium text-sm">Retail</span>
                         <div className="flex items-center space-x-2">
                            <Input className="w-20 text-right" defaultValue="30" />
                            <span className="text-slate-500 text-sm">%</span>
                         </div>
                      </div>
                   </div>
                </Card>
             </div>

             <div className="mt-10 flex justify-between">
                <Button variant="secondary" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}>Previous</Button>
                <Button onClick={() => setCurrentStep(Math.min(8, currentStep + 1))}>
                   Next Step <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
             </div>
          </div>
        </main>

        {/* Right Preview Panel */}
        <aside className="w-80 border-l border-slate-200 bg-slate-50 p-6 hidden lg:block">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Live Preview</h3>
           
           <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <p className="text-xs text-slate-500 mb-1">Est. Total Cost</p>
                 <p className="text-2xl font-bold text-slate-900">₩1,250B</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <p className="text-xs text-slate-500 mb-1">Est. GFA</p>
                 <p className="text-xl font-bold text-slate-900">25,400 ㎡</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                 <div className="flex items-center mb-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-bold text-blue-900 text-sm">AI Insight</span>
                 </div>
                 <p className="text-xs text-blue-800 leading-relaxed">
                    Based on recent data in Gangnam, increasing Retail mix to 35% could improve NOI by 4.2%.
                 </p>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
};

export default DealosBackbone;