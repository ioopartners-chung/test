import React from 'react';
import { AppHeader } from '../components/layout/AppHeader';
import { Badge, Button, Card, Input } from '../components/ui/UIComponents';
import { CheckCircle2, XCircle, AlertTriangle, Download, Scale } from 'lucide-react';

const StandaloneLegalReview: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container mx-auto px-6 py-8 mt-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Input Form */}
          <div className="w-full lg:w-1/3 space-y-6">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <div className="flex items-center space-x-2 mb-6 text-slate-900">
                  <Scale className="w-6 h-6 text-primary-600" />
                  <h2 className="text-lg font-bold">Input Parameters</h2>
               </div>
               
               <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Zoning Area</label>
                    <select className="block w-full rounded-md border-slate-300 border px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500 bg-white">
                      <option>General Commercial</option>
                      <option>Semi-Residential</option>
                      <option>General Residential (Type 3)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Site Area (㎡)</label>
                    <Input type="number" defaultValue={1000} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Building Area</label>
                        <Input type="number" defaultValue={550} />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Total Floor Area</label>
                        <Input type="number" defaultValue={7500} />
                     </div>
                  </div>
                  <Button className="w-full mt-4">Run Compliance Check</Button>
               </div>
             </div>
          </div>

          {/* Right: Results */}
          <div className="w-full lg:w-2/3 space-y-6">
             {/* Summary Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-5 flex flex-col items-center justify-center bg-white border-slate-200">
                   <div className="radial-progress text-primary-600 text-lg font-bold mb-2">92%</div>
                   <span className="text-sm text-slate-500">Compliance Score</span>
                </Card>
                <Card className="p-5 flex flex-col items-center justify-center bg-white border-slate-200">
                   <span className="text-3xl font-bold text-rose-500 mb-1">1</span>
                   <span className="text-sm text-slate-500">Critical Violations</span>
                </Card>
                <Card className="p-5 flex flex-col items-center justify-center bg-white border-slate-200">
                   <span className="text-3xl font-bold text-amber-500 mb-1">2</span>
                   <span className="text-sm text-slate-500">Warnings</span>
                </Card>
             </div>

             {/* Detail Checklist */}
             <Card className="overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                   <h3 className="font-bold text-slate-900">Detailed Report</h3>
                   <Button variant="outline" size="sm" icon={Download}>PDF Report</Button>
                </div>
                <div className="divide-y divide-slate-100">
                   
                   {/* Item 1: BCR - Pass */}
                   <div className="p-4 flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                         <div className="flex justify-between">
                            <h4 className="font-bold text-slate-900 text-sm">Building Coverage Ratio (BCR)</h4>
                            <Badge variant="success">PASS</Badge>
                         </div>
                         <p className="text-sm text-slate-600 mt-1">Current: 55.0% / Max Allowed: 60.0%</p>
                      </div>
                   </div>

                   {/* Item 2: FAR - Fail */}
                   <div className="p-4 flex items-start bg-rose-50/30">
                      <XCircle className="w-5 h-5 text-rose-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                         <div className="flex justify-between">
                            <h4 className="font-bold text-slate-900 text-sm">Floor Area Ratio (FAR)</h4>
                            <Badge variant="danger">VIOLATION</Badge>
                         </div>
                         <p className="text-sm text-slate-600 mt-1">Current: <span className="text-rose-600 font-bold">820%</span> / Max Allowed: 800%</p>
                         <p className="text-xs text-rose-700 mt-2 bg-rose-100 p-2 rounded">
                            Action: Reduce GFA by 200㎡ or check if incentives apply.
                         </p>
                      </div>
                   </div>

                   {/* Item 3: Parking - Warning */}
                   <div className="p-4 flex items-start">
                      <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                         <div className="flex justify-between">
                            <h4 className="font-bold text-slate-900 text-sm">Parking Requirement</h4>
                            <Badge variant="warning">WARNING</Badge>
                         </div>
                         <p className="text-sm text-slate-600 mt-1">Calculated: 120 slots / Planned: 120 slots</p>
                         <p className="text-xs text-slate-500 mt-1">No margin for error. Recommend adding 5% buffer.</p>
                      </div>
                   </div>

                </div>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StandaloneLegalReview;