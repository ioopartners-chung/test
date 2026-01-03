import React, { useState } from 'react';
import { Search, Layers, Square, MousePointer, ZoomIn, ZoomOut, ArrowRight, Building2, Ruler } from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { Button, Card, Badge } from '../components/ui/UIComponents';
import { useNavigate } from 'react-router-dom';

const MapLanding: React.FC = () => {
  const navigate = useNavigate();
  const [selectedParcel, setSelectedParcel] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);

  // Mock Map Component (Visual Representation)
  const MockMap = () => (
    <div className="absolute inset-0 bg-[#e5e7eb] overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Fake Parcels */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] flex flex-wrap gap-1">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            onClick={() => setSelectedParcel(!selectedParcel)}
            className={`flex-grow h-32 border border-slate-400/50 cursor-pointer transition-all duration-300 relative group
              ${selectedParcel && i === 10 ? 'bg-primary-500/30 border-primary-600 border-2 z-10' : 'bg-white hover:bg-slate-50'}
              ${showOverlay ? (i % 3 === 0 ? 'bg-rose-100/50' : i % 2 === 0 ? 'bg-yellow-100/50' : 'bg-white') : ''}
            `}
            style={{ minWidth: '100px', flexBasis: `${Math.random() * 20 + 10}%` }}
          >
            <span className="absolute top-1 left-1 text-[10px] text-slate-400 group-hover:text-slate-600">
              {100 - i}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">
      <AppHeader />
      
      <div className="flex-1 relative mt-16">
        <MockMap />

        {/* Search Bar */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-lg">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-2 flex items-center">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder="Search by address, place, or coordinates..." 
              className="flex-1 border-none focus:ring-0 text-sm px-3 py-2 outline-none"
            />
            <Button size="sm">Search</Button>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-6 right-6 z-10 flex flex-col space-y-2">
          <div className="bg-white rounded-lg shadow-md border border-slate-200 p-1 flex flex-col">
            <button 
              className={`p-2 rounded-md transition-colors ${showOverlay ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50'}`}
              onClick={() => setShowOverlay(!showOverlay)}
              title="Toggle Zones"
            >
              <Layers className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-md mt-1" title="Select Multiple">
              <Square className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-slate-200 p-1 flex flex-col">
             <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-md">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-md mt-1">
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Info Panel (Slide-in) */}
        <div className={`absolute top-4 bottom-4 right-4 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 transform transition-transform duration-300 flex flex-col z-20 ${selectedParcel ? 'translate-x-0' : 'translate-x-[420px]'}`}>
          
          {/* Panel Header */}
          <div className="p-5 border-b border-slate-100 flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Seocho-gu, Seoul</h2>
              <p className="text-sm text-slate-500">1324-5, Seocho-dong</p>
            </div>
            <button onClick={() => setSelectedParcel(false)} className="text-slate-400 hover:text-slate-600">×</button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-500 block">Area</span>
                  <span className="font-semibold text-slate-900">1,250 ㎡</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-500 block">Price (Est.)</span>
                  <span className="font-semibold text-slate-900">₩ 25.4B</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500">Zoning</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Badge variant="warning">Commercial Area</Badge>
                  <Badge variant="outline">Fire District</Badge>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Quick Analysis */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-primary-500" />
                Development Potential
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Max FAR (Vol.)</span>
                  <span className="font-medium">800% <span className="text-green-600">(Target: 780%)</span></span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-slate-500">Max BCR</span>
                  <span className="font-medium">60%</span>
                </div>
                 <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

             <hr className="border-slate-100" />
             
             {/* Estimated Scale */}
             <div>
               <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center">
                <Ruler className="w-4 h-4 mr-2 text-primary-500" />
                Est. Scale
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-slate-500">GFA</span>
                <span className="text-right font-medium">9,750 ㎡</span>
                <span className="text-slate-500">Floors</span>
                <span className="text-right font-medium">B5 / 18F</span>
                <span className="text-slate-500">Parking</span>
                <span className="text-right font-medium">120 cars</span>
              </div>
             </div>
          </div>

          {/* Footer Action */}
          <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-xl">
            <Button 
              className="w-full justify-between group" 
              size="lg"
              onClick={() => navigate('/workflow/new')}
            >
              Start Analysis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLanding;