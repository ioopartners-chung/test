import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Building, Calculator, Coins, Landmark, 
  LineChart as LineChartIcon, AlertTriangle, Scale, ChevronRight, LayoutGrid, 
  FileText, Share2, Save, Download, Printer, Lightbulb, 
  MoreHorizontal, Search, Settings, DollarSign, Hammer, RefreshCw, BarChart2, Table, Calendar, CheckSquare,
  Menu, X, Filter, SlidersHorizontal, Eye, PlusCircle, ArrowUpRight, ArrowDownRight, Briefcase, PieChart as PieChartIcon, Settings2, Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge, Card, KPICard, StatusBadge, ProgressBar, Input, DataMetric, SegmentedControl, TrendIndicator } from '../components/ui/UIComponents';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
    Line, ComposedChart, Cell, Pie, ReferenceLine, LineChart, Area, AreaChart, PieChart
} from 'recharts';

// --- Sidebar ---
const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 border-l-[3px] group ${
      active
        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
        : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon className={`w-4 h-4 transition-colors ${active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
    <span>{label}</span>
  </button>
);

// --- Tab Components (Deeply Refactored) ---

const OverviewTab = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        {/* Top KPI Section: Compact & High Contrast */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard label="Project IRR" value="102.7%" subLabel="Hurdle Rate 15%" status="PASS" trend={87.7} />
            <KPICard label="NPV" value="1,040 B" subLabel="Discount Rate 5%" status="PASS" trend={12.4} />
            <KPICard label="Equity Multiple" value="3.57x" subLabel="Target 2.0x" status="PASS" trend={0.5} />
            <KPICard label="Profit Margin" value="21.5%" subLabel="Gross Profit" status="PASS" trend={2.1} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart Area */}
            <Card className="lg:col-span-2 p-5 flex flex-col min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-slate-800 text-base">Cashflow Forecast</h3>
                        <p className="text-xs text-slate-500">Monthly Net Cashflow & Cumulative Balance</p>
                    </div>
                    <SegmentedControl 
                        options={[{value: 'm', label: 'Month'}, {value: 'q', label: 'Qtr'}, {value: 'y', label: 'Year'}]}
                        value="q"
                        onChange={() => {}}
                    />
                </div>
                <div className="flex-1 w-full min-h-[300px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={[
                            { name: 'Q1', net: -500, cum: -500 }, { name: 'Q2', net: -800, cum: -1300 },
                            { name: 'Q3', net: -200, cum: -1500 }, { name: 'Q4', net: 100, cum: -1400 },
                            { name: 'Q5', net: 600, cum: -800 }, { name: 'Q6', net: 1200, cum: 400 },
                            { name: 'Q7', net: 800, cum: 1200 }, { name: 'Q8', net: 400, cum: 1600 }
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: '12px' }}/>
                            <ReferenceLine y={0} stroke="#cbd5e1" />
                            <Bar dataKey="net" fill="#6366f1" name="Net Cashflow" barSize={32} radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="cum" stroke="#10b981" strokeWidth={3} dot={false} name="Cumulative Balance" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Right Side: Alerts & Insights */}
            <div className="space-y-6">
                {/* AI Insight */}
                <Card className="p-5 border-l-4 border-l-indigo-500 bg-indigo-50/50">
                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-white rounded-lg border border-indigo-100 text-indigo-600 shadow-sm">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-indigo-900">Optimization Opportunity</h4>
                            <p className="text-xs text-indigo-800 mt-1 leading-relaxed">
                                Increasing the retail proportion by 5% could potentially improve NPV by <span className="font-bold">₩45B</span> due to high demand in Euljiro area.
                            </p>
                            <Button size="xs" variant="secondary" className="mt-3 bg-white text-indigo-700 border-indigo-200">Simulate Scenario</Button>
                        </div>
                    </div>
                </Card>

                {/* Critical Alerts */}
                <Card className="p-5">
                    <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" /> Action Required
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-start p-3 bg-amber-50 rounded-md border border-amber-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0"></span>
                            <div>
                                <p className="text-xs font-bold text-slate-800">Legal Review Incomplete</p>
                                <p className="text-[10px] text-slate-500">2 critical violations found in parking regulation.</p>
                            </div>
                            <Button size="xs" variant="ghost" className="ml-auto text-amber-700 hover:bg-amber-100">View</Button>
                        </div>
                        <div className="flex items-start p-3 bg-slate-50 rounded-md border border-slate-100">
                             <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2 flex-shrink-0"></span>
                            <div>
                                <p className="text-xs font-bold text-slate-800">Update Land Price</p>
                                <p className="text-[10px] text-slate-500">Data is 3 months old.</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
);

const CostTab = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        {/* Top Summary Bar - High Contrast for Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <Card className="p-4 bg-slate-900 text-white flex flex-col justify-between border-slate-900">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Project Cost</span>
                    <Hammer className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                    <span className="text-2xl font-bold">1,218.5 B</span>
                    <span className="text-sm font-medium text-slate-400 ml-1">KRW</span>
                </div>
             </Card>
             <Card className="p-4 flex flex-col justify-between">
                <DataMetric label="Cost per Area (GFA)" value="9.24 M" subValue="per py" />
                <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{width: '75%'}}></div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                    <span>Low</span>
                    <span>Market Avg</span>
                    <span>High</span>
                </div>
             </Card>
             <Card className="p-4 flex flex-col justify-between">
                 <DataMetric label="Hard Cost Ratio" value="73.9%" subValue="of Total Budget" />
                 <TrendIndicator value={2.4} type="percentage" inverse />
             </Card>
             <Card className="p-4 flex flex-col justify-between">
                 <DataMetric label="Land Cost Ratio" value="6.5%" subValue="of Total Budget" />
                 <TrendIndicator value={-0.5} type="percentage" />
             </Card>
        </div>

        {/* Split View: Inputs & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            
            {/* Left: Cost Drivers & Sensitivity (Interactive) */}
            <div className="lg:col-span-4 space-y-6">
                <Card className="p-5 h-full border-l-4 border-l-indigo-600">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2">
                             <Settings2 className="w-4 h-4 text-slate-500" />
                             <h3 className="font-bold text-slate-800 text-sm">Sensitivity Drivers</h3>
                        </div>
                        <Button size="xs" variant="ghost" icon={RefreshCw}>Reset</Button>
                    </div>
                    
                    <div className="space-y-8">
                        {/* Land Price Driver */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-baseline">
                                <span className="text-xs font-bold text-slate-700 uppercase">Land Price</span>
                                <div className="text-right">
                                    <span className="font-bold text-indigo-600 text-lg">350.2 M</span>
                                    <span className="text-xs text-slate-400 ml-1">/ py</span>
                                </div>
                            </div>
                            <input type="range" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                                <span>-10%</span>
                                <span className="text-slate-900">Base Case</span>
                                <span>+10%</span>
                            </div>
                        </div>

                         {/* Hard Cost Driver */}
                         <div className="space-y-3">
                            <div className="flex justify-between items-baseline">
                                <span className="text-xs font-bold text-slate-700 uppercase">Hard Cost</span>
                                <div className="text-right">
                                    <span className="font-bold text-indigo-600 text-lg">9.24 M</span>
                                    <span className="text-xs text-slate-400 ml-1">/ py</span>
                                </div>
                            </div>
                            <input type="range" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                                <span>8.0M</span>
                                <span className="text-slate-900">Current</span>
                                <span>11.0M</span>
                            </div>
                        </div>

                        {/* Soft Cost Multiplier */}
                         <div className="space-y-3">
                            <div className="flex justify-between items-baseline">
                                <span className="text-xs font-bold text-slate-700 uppercase">Soft Cost Load</span>
                                <div className="text-right">
                                    <span className="font-bold text-indigo-600 text-lg">12.5%</span>
                                    <span className="text-xs text-slate-400 ml-1">of Hard Cost</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button size="xs" variant="outline" className="flex-1">Low (10%)</Button>
                                <Button size="xs" variant="primary" className="flex-1">Avg (12.5%)</Button>
                                <Button size="xs" variant="outline" className="flex-1">High (15%)</Button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-500">Est. Total Variance</span>
                                <span className="font-bold text-rose-600">+12.4 B KRW</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Impact on Profit</span>
                                <span className="font-bold text-rose-600">-0.8% p</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Right: Cost Breakdown Table (Dense & Benchmarked) */}
            <div className="lg:col-span-8 flex flex-col">
                <Card className="overflow-hidden flex-1 border border-slate-200 shadow-sm">
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <div className="flex items-center space-x-2">
                             <h3 className="font-bold text-slate-800 text-sm">Budget Breakdown</h3>
                             <Badge variant="outline">Detailed View</Badge>
                        </div>
                        <div className="flex space-x-2">
                            <Button size="xs" variant="outline" icon={Briefcase}>Load Template</Button>
                            <Button size="xs" variant="excel" icon={Download}>Excel</Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-white text-xs text-slate-500 uppercase font-semibold border-b-2 border-slate-100">
                                <tr>
                                    <th className="px-4 py-3 text-left w-1/3">Cost Category</th>
                                    <th className="px-4 py-3 text-right">Budget (B)</th>
                                    <th className="px-4 py-3 text-right">Per Py (M)</th>
                                    <th className="px-4 py-3 text-right">% of Total</th>
                                    <th className="px-4 py-3 text-right text-indigo-600 bg-indigo-50/30">Market Avg.</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {/* Land Group */}
                                <tr className="bg-slate-50/50 font-bold text-slate-800">
                                    <td className="px-4 py-2" colSpan={6}>1. Land Acquisition</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-2 pl-8 text-slate-600">Land Price</td>
                                    <td className="px-4 py-2 text-right font-medium">79.09</td>
                                    <td className="px-4 py-2 text-right text-slate-500">35.02</td>
                                    <td className="px-4 py-2 text-right text-slate-500">6.5%</td>
                                    <td className="px-4 py-2 text-right text-slate-500 bg-indigo-50/10">34.50</td>
                                    <td className="px-4 py-2 text-center"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span></td>
                                </tr>
                                 <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-2 pl-8 text-slate-600">Acquisition Tax & Fees</td>
                                    <td className="px-4 py-2 text-right font-medium">3.64</td>
                                    <td className="px-4 py-2 text-right text-slate-500">1.61</td>
                                    <td className="px-4 py-2 text-right text-slate-500">0.3%</td>
                                    <td className="px-4 py-2 text-right text-slate-500 bg-indigo-50/10">4.6% Rate</td>
                                    <td className="px-4 py-2 text-center"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span></td>
                                </tr>

                                {/* Hard Cost Group */}
                                <tr className="bg-slate-50/50 font-bold text-slate-800 border-t border-slate-200">
                                    <td className="px-4 py-2" colSpan={6}>2. Construction (Hard Cost)</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-2 pl-8 text-slate-600">Direct Construction</td>
                                    <td className="px-4 py-2 text-right font-bold text-slate-900">900.98</td>
                                    <td className="px-4 py-2 text-right text-slate-500">9.24</td>
                                    <td className="px-4 py-2 text-right text-slate-500">73.9%</td>
                                    <td className="px-4 py-2 text-right text-slate-500 bg-indigo-50/10">8.80</td>
                                    <td className="px-4 py-2 text-center"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-2 pl-8 text-slate-600">Demolition</td>
                                    <td className="px-4 py-2 text-right font-medium">5.20</td>
                                    <td className="px-4 py-2 text-right text-slate-500">0.05</td>
                                    <td className="px-4 py-2 text-right text-slate-500">0.4%</td>
                                    <td className="px-4 py-2 text-right text-slate-500 bg-indigo-50/10">-</td>
                                    <td className="px-4 py-2 text-center"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span></td>
                                </tr>

                                {/* Soft Cost Group */}
                                <tr className="bg-slate-50/50 font-bold text-slate-800 border-t border-slate-200">
                                    <td className="px-4 py-2" colSpan={6}>3. Soft Cost & Finance</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-2 pl-8 text-slate-600">Design & Supervision</td>
                                    <td className="px-4 py-2 text-right font-medium">54.06</td>
                                    <td className="px-4 py-2 text-right text-slate-500">0.55</td>
                                    <td className="px-4 py-2 text-right text-slate-500">4.4%</td>
                                    <td className="px-4 py-2 text-right text-slate-500 bg-indigo-50/10">4.0%</td>
                                    <td className="px-4 py-2 text-center"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span></td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-2 pl-8 text-slate-600">Finance Cost (Interest)</td>
                                    <td className="px-4 py-2 text-right font-medium">132.53</td>
                                    <td className="px-4 py-2 text-right text-slate-500">1.36</td>
                                    <td className="px-4 py-2 text-right text-slate-500">10.9%</td>
                                    <td className="px-4 py-2 text-right text-slate-500 bg-indigo-50/10">8.5%</td>
                                    <td className="px-4 py-2 text-center"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span></td>
                                </tr>
                            </tbody>
                            <tfoot className="bg-slate-900 text-white border-t-2 border-slate-800">
                                <tr>
                                    <td className="px-4 py-3 font-bold">Total Project Cost</td>
                                    <td className="px-4 py-3 text-right font-bold text-lg">1,218.47</td>
                                    <td className="px-4 py-3 text-right font-medium text-slate-400">12.49</td>
                                    <td className="px-4 py-3 text-right font-bold">100.0%</td>
                                    <td className="px-4 py-3 text-right text-slate-400">11.80</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    </div>
);

const RevenueTab = () => {
    // Mock Data for Stacking Plan (Visualizing Zones)
    const zones = [
        { id: 'off-h', name: 'Office High', floors: '20F - 35F', area: 15400, price: 125.0, type: 'Office', color: 'bg-blue-500' },
        { id: 'off-l', name: 'Office Low', floors: '4F - 19F', area: 16200, price: 110.0, type: 'Office', color: 'bg-blue-400' },
        { id: 'amenity', name: 'Amenity', floors: '3F', area: 1200, price: 0, type: 'Common', color: 'bg-slate-400' },
        { id: 'retail', name: 'Retail (Podium)', floors: '1F - 2F', area: 3500, price: 180.0, type: 'Retail', color: 'bg-emerald-500' },
        { id: 'retail-b', name: 'Retail (Bsmt)', floors: 'B1', area: 1800, price: 90.0, type: 'Retail', color: 'bg-emerald-600' },
        { id: 'parking', name: 'Parking', floors: 'B2 - B6', area: 12000, price: 0, type: 'Parking', color: 'bg-slate-300' },
    ];

    return (
    <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <Coins className="w-5 h-5 mr-2 text-indigo-600"/> Revenue Modeling
            </h2>
            <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
                <button className="px-3 py-1 bg-white shadow-sm rounded-md text-xs font-bold text-indigo-600">Sale (Bunyang)</button>
                <button className="px-3 py-1 text-slate-500 text-xs font-medium hover:text-slate-900">Lease (Imdae)</button>
                <button className="px-3 py-1 text-slate-500 text-xs font-medium hover:text-slate-900">Mixed</button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
            
            {/* Left Column: Visual Stacking Plan (Proptech Style) */}
            <div className="lg:col-span-4 flex flex-col h-full">
                <Card className="p-4 h-full flex flex-col bg-slate-50/50 border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 text-sm flex items-center">
                            <Layers className="w-4 h-4 mr-2 text-slate-500"/> MD Stacking Plan
                        </h3>
                        <Badge variant="outline">GFA 50,100 ㎡</Badge>
                    </div>
                    
                    {/* The Visual Stack */}
                    <div className="flex-1 flex flex-col-reverse gap-1 overflow-y-auto pr-2 custom-scrollbar border-l-2 border-dashed border-slate-300 pl-4 relative">
                        {/* Floor Height Markers */}
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200 hidden"></div>
                        
                        {zones.map((zone) => (
                            <div key={zone.id} className="w-full group relative transition-all hover:scale-[1.02] cursor-pointer">
                                {/* Floor Label */}
                                <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono w-10 text-right">
                                    {zone.floors}
                                </div>
                                
                                {/* The Block */}
                                <div className={`
                                    w-full rounded-md shadow-sm border border-white/20 p-3 flex justify-between items-center
                                    ${zone.color} text-white
                                    ${zone.type === 'Parking' ? 'h-12 opacity-50' : 'h-20'}
                                `}>
                                    <div>
                                        <div className="font-bold text-sm">{zone.name}</div>
                                        <div className="text-[10px] opacity-80">{zone.area.toLocaleString()} ㎡</div>
                                    </div>
                                    {zone.price > 0 && (
                                        <div className="text-right">
                                            <div className="font-bold text-sm">₩{zone.price} M</div>
                                            <div className="text-[10px] opacity-80">per py</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2 text-[10px] justify-center text-slate-500">
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span> Office</span>
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span> Retail</span>
                        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-slate-300 mr-1"></span> Parking</span>
                    </div>
                </Card>
            </div>

            {/* Right Column: Pricing & Revenue Detail */}
            <div className="lg:col-span-8 flex flex-col space-y-6 overflow-y-auto pr-1">
                
                {/* Summary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 border-l-4 border-l-emerald-500">
                        <DataMetric label="Total Revenue" value="3,396.2 B" subValue="Avg Price: 105.5M / py" />
                    </Card>
                    <Card className="p-4 border-l-4 border-l-blue-500">
                        <DataMetric label="Total Profit" value="2,177.7 B" subValue="Profit Margin: 64.1%" />
                    </Card>
                    <Card className="p-4 border-l-4 border-l-indigo-500">
                        <DataMetric label="Break-even Price" value="45.2 M" subValue="per py (Safety Margin 57%)" />
                    </Card>
                </div>

                {/* Interactive Pricing Grid */}
                <Card className="p-5 flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 text-sm">Zone Pricing Strategy</h3>
                        <Button size="xs" variant="secondary" icon={Settings}>Auto-Balance</Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3 text-left">Zone Name</th>
                                    <th className="px-4 py-3 text-right">Area (py)</th>
                                    <th className="px-4 py-3 text-right w-48">Target Price (M/py)</th>
                                    <th className="px-4 py-3 text-right">Revenue (B)</th>
                                    <th className="px-4 py-3 text-right">Share</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {zones.filter(z => z.price > 0).map((zone, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-4 py-3 font-medium text-slate-800 flex items-center">
                                            <div className={`w-2 h-2 rounded-full ${zone.color} mr-2`}></div>
                                            {zone.name}
                                        </td>
                                        <td className="px-4 py-3 text-right text-slate-600">{(zone.area / 3.3058).toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <input 
                                                    type="number" 
                                                    defaultValue={zone.price} 
                                                    className="w-20 text-right text-sm border-slate-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 font-bold text-slate-900 bg-slate-50 group-hover:bg-white"
                                                />
                                                <SlidersHorizontal className="w-3 h-3 text-slate-300 cursor-pointer hover:text-indigo-600"/>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right font-bold text-slate-900">
                                            {(zone.price * (zone.area / 3.3058) / 1000).toLocaleString(undefined, {maximumFractionDigits:1})}
                                        </td>
                                        <td className="px-4 py-3 text-right text-slate-500 text-xs">
                                            {((zone.price * (zone.area / 3.3058) / 33962) * 100).toFixed(1)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                             <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                                <tr>
                                    <td className="px-4 py-3 text-slate-900">Total / Avg</td>
                                    <td className="px-4 py-3 text-right text-slate-900">11,540</td>
                                    <td className="px-4 py-3 text-right text-indigo-600">105.5</td>
                                    <td className="px-4 py-3 text-right text-emerald-600">3,396.2</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </Card>

                 {/* Absorption / Sales Schedule */}
                 <Card className="p-5 h-64">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 text-sm">Sales Absorption Schedule</h3>
                        <div className="flex space-x-2 text-xs">
                            <span className="flex items-center"><div className="w-2 h-2 bg-indigo-500 rounded mr-1"></div> Cumulative Sales</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                            {m: 'M1', val: 10}, {m: 'M2', val: 25}, {m: 'M3', val: 40}, {m: 'M4', val: 60}, 
                            {m: 'M5', val: 75}, {m: 'M6', val: 85}, {m: 'M7', val: 92}, {m: 'M8', val: 98}, {m: 'M9', val: 100}
                        ]}>
                             <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                            <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize:10}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize:10}} unit="%" />
                            <Tooltip />
                            <Area type="monotone" dataKey="val" stroke="#6366f1" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                 </Card>
            </div>
        </div>
    </div>
    );
};

const FinanceTab = () => {
    // Mock Data for the Capital Stack Visualizer
    const tranches = [
        { id: 1, type: 'Senior', name: 'Sen. Loan A', amount: 450, rate: 5.2, fee: 1.0, color: 'bg-emerald-600', ltcStart: 0, ltcEnd: 33.6 },
        { id: 2, type: 'Senior', name: 'Sen. Loan B', amount: 158.5, rate: 5.8, fee: 1.2, color: 'bg-emerald-500', ltcStart: 33.6, ltcEnd: 45.5 },
        { id: 3, type: 'Mezzanine', name: 'Mezzanine A', amount: 243.4, rate: 12.0, fee: 2.0, color: 'bg-amber-500', ltcStart: 45.5, ltcEnd: 63.7 },
        { id: 4, type: 'Equity', name: 'Pref. Equity', amount: 200, rate: 0, fee: 0, color: 'bg-indigo-600', ltcStart: 63.7, ltcEnd: 78.6 },
        { id: 5, type: 'Equity', name: 'Common Eq.', amount: 286.8, rate: 0, fee: 0, color: 'bg-indigo-500', ltcStart: 78.6, ltcEnd: 100.0 },
    ].reverse(); // Stack from bottom up visually

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Covenants Bar (High-level summary like Juniper Square) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-slate-900 text-white flex flex-col justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Capitalization</span>
                    <div>
                        <span className="text-2xl font-bold">1,338.7 B</span>
                        <span className="text-sm font-medium text-slate-400 ml-1">KRW</span>
                    </div>
                </Card>
                <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col justify-center">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-slate-500 font-bold uppercase">LTC</span>
                        <span className="text-xl font-bold text-slate-900">63.7%</span>
                    </div>
                    <ProgressBar value={63.7} color="bg-rose-500" height="h-1.5" />
                    <span className="text-[10px] text-slate-400 mt-1 text-right">Debt Ratio</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col justify-center">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-slate-500 font-bold uppercase">WACC</span>
                        <span className="text-xl font-bold text-indigo-600">7.4%</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Weighted Avg Cost of Capital</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col justify-center">
                     <div className="flex justify-between items-end mb-1">
                        <span className="text-xs text-slate-500 font-bold uppercase">Est. Exit LTV</span>
                        <span className="text-xl font-bold text-emerald-600">45.2%</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Based on Cap Rate 4.5%</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Interactive Capital Stack Visualizer (Landbook Style) */}
                <div className="lg:col-span-4 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 text-sm flex items-center">
                            <Building className="w-4 h-4 mr-2 text-indigo-500"/> Capital Stack
                        </h3>
                        <Badge variant="neutral">LTC 100%</Badge>
                    </div>

                    <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 p-8 flex flex-col justify-end relative overflow-hidden shadow-inner min-h-[500px]">
                        {/* Background Grid Lines for LTC Scale */}
                        <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none z-0">
                            {[100, 80, 60, 40, 20, 0].map((tick) => (
                                <div key={tick} className="w-full border-t border-slate-300/50 relative">
                                    <span className="absolute -left-6 -top-2 text-[9px] text-slate-400 w-4 text-right">{tick}%</span>
                                </div>
                            ))}
                        </div>

                        {/* Stacked Tranches */}
                        <div className="w-full flex flex-col gap-1 z-10 w-2/3 mx-auto shadow-2xl">
                            {tranches.map((t) => (
                                <div 
                                    key={t.id}
                                    className={`${t.color} w-full transition-all duration-200 hover:brightness-110 hover:scale-[1.02] cursor-pointer relative group border border-white/20`}
                                    style={{ height: `${(t.amount / 1338.7) * 400}px` }} // Proportional Height
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-90">
                                        {t.name}
                                    </div>
                                    {/* Tooltip on Hover */}
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-slate-900 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                        <div className="font-bold mb-1">{t.name} ({t.type})</div>
                                        <div>Amount: {t.amount} B</div>
                                        <div>Rate: {t.rate > 0 ? t.rate + '%' : 'N/A'}</div>
                                        <div>LTC: {t.ltcStart.toFixed(1)}% - {t.ltcEnd.toFixed(1)}%</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Detailed Term Sheet (Carta/Excel Style) */}
                <div className="lg:col-span-8 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-slate-800 text-sm">Term Sheet Details</h3>
                            <Badge variant="brand">Draft v3</Badge>
                        </div>
                        <div className="flex space-x-2">
                             <Button size="xs" variant="secondary" icon={Settings2}>Configure Waterfall</Button>
                             <Button size="xs" variant="primary" icon={PlusCircle}>Add Tranche</Button>
                        </div>
                    </div>

                    <Card className="overflow-hidden border border-slate-200 shadow-sm flex-1">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 w-4">#</th>
                                        <th className="px-4 py-3">Tranche Name</th>
                                        <th className="px-4 py-3 text-right">Amount (B)</th>
                                        <th className="px-4 py-3 text-right">LTC Ratio</th>
                                        <th className="px-4 py-3 text-right">Interest Rate</th>
                                        <th className="px-4 py-3 text-right">Front-end Fee</th>
                                        <th className="px-4 py-3 text-right">Tenor (Mo)</th>
                                        <th className="px-4 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[...tranches].reverse().map((t, idx) => ( // Reverse back to list order (Senior first)
                                        <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-4 py-3 text-slate-400 text-xs">{idx + 1}</td>
                                            <td className="px-4 py-3 font-medium text-slate-900 flex items-center">
                                                <div className={`w-2 h-2 rounded-full ${t.color} mr-2`}></div>
                                                {t.name}
                                                {t.type === 'Equity' && <span className="ml-2 px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] border border-slate-200">Equity</span>}
                                            </td>
                                            <td className="px-4 py-3 text-right font-bold text-slate-900">{t.amount.toFixed(1)}</td>
                                            <td className="px-4 py-3 text-right text-slate-600">{((t.amount/1338.7)*100).toFixed(1)}%</td>
                                            <td className="px-4 py-3 text-right">
                                                {t.rate > 0 ? (
                                                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{t.rate.toFixed(2)}%</span>
                                                ) : <span className="text-slate-400">-</span>}
                                            </td>
                                            <td className="px-4 py-3 text-right text-slate-600">{t.fee > 0 ? t.fee.toFixed(1) + '%' : '-'}</td>
                                            <td className="px-4 py-3 text-right text-slate-600">36</td>
                                            <td className="px-4 py-3 text-center">
                                                <button className="text-slate-400 hover:text-slate-600"><Settings2 className="w-4 h-4"/></button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Summary Footer */}
                                    <tr className="bg-slate-50 border-t-2 border-slate-200">
                                        <td colSpan={2} className="px-4 py-3 font-bold text-slate-900 text-right">Total / W.Avg</td>
                                        <td className="px-4 py-3 text-right font-bold text-slate-900">1,338.7</td>
                                        <td className="px-4 py-3 text-right font-bold text-slate-900">100.0%</td>
                                        <td className="px-4 py-3 text-right font-bold text-indigo-700">7.42%</td>
                                        <td colSpan={3}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Equity Waterfall Visualization (GP/LP Split) */}
                    <div className="mt-8">
                        <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center">
                             <PieChartIcon className="w-4 h-4 mr-2 text-indigo-500"/> Equity Waterfall (Return Distribution)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Waterfall Steps */}
                             <Card className="p-4 bg-slate-50 border-dashed border-2 border-slate-200">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mr-3">1</div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold text-slate-700 uppercase">Return of Capital</div>
                                            <div className="text-xs text-slate-500">100% to Investors until Capital Returned</div>
                                        </div>
                                    </div>
                                    <div className="w-0.5 h-4 bg-slate-300 ml-4"></div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mr-3">2</div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold text-slate-700 uppercase">Preferred Return</div>
                                            <div className="text-xs text-slate-500">8% IRR Hurdle (100% to Investors)</div>
                                        </div>
                                    </div>
                                    <div className="w-0.5 h-4 bg-slate-300 ml-4"></div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs mr-3">3</div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold text-slate-700 uppercase">Promote (Catch-up)</div>
                                            <div className="text-xs text-slate-500">50/50 Split (GP/LP) after 15% IRR</div>
                                        </div>
                                    </div>
                                </div>
                             </Card>
                             
                             {/* Resulting Chart */}
                             <Card className="p-4 flex flex-col justify-center items-center">
                                 <div className="text-xs font-bold text-slate-500 uppercase mb-2">Profit Distribution</div>
                                 <div className="flex items-center justify-center w-full h-32">
                                     <PieChart width={200} height={120}>
                                        <Pie
                                            data={[{name: 'LP (Investors)', value: 82}, {name: 'GP (Developer)', value: 18}]}
                                            cx="50%" cy="100%" startAngle={180} endAngle={0}
                                            innerRadius={60} outerRadius={80} paddingAngle={5}
                                            dataKey="value"
                                        >
                                            <Cell fill="#3b82f6" />
                                            <Cell fill="#6366f1" />
                                        </Pie>
                                        <Tooltip />
                                     </PieChart>
                                 </div>
                                 <div className="flex justify-center space-x-6 mt-[-20px]">
                                     <div className="text-center">
                                         <div className="text-xl font-bold text-blue-600">82%</div>
                                         <div className="text-[10px] text-slate-400">Investors (LP)</div>
                                     </div>
                                     <div className="text-center">
                                         <div className="text-xl font-bold text-indigo-600">18%</div>
                                         <div className="text-[10px] text-slate-400">Developer (GP)</div>
                                     </div>
                                 </div>
                             </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CashflowTab = () => (/* Same as before but with better chart aspect ratio */
    <div className="space-y-6 animate-in fade-in duration-300">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             <KPICard label="Duration" value="36 Mos" subValue="Dev 24 + Ops 12" />
             <KPICard label="Peak Equity" value="-486 B" subValue="Month 4" status="REVIEW" />
             <KPICard label="Net Profit" value="494 B" subValue="Post-Tax" status="PASS" />
             <KPICard label="Min DSCR" value="1.6x" subValue="Month 28" status="PASS" />
        </div>
        <Card className="p-5 min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-slate-800 flex items-center"><BarChart2 className="w-4 h-4 mr-2"/> Cashflow Projection</h3>
                 <div className="flex space-x-2">
                     <Button size="xs" variant="outline" icon={Filter}>Filter</Button>
                     <Button size="xs" variant="excel" icon={Download}>Excel</Button>
                 </div>
            </div>
            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={[
                        { name: 'Y1', inflow: 0, outflow: -1000, net: -1000, cum: -1000 },
                        { name: 'Y2', inflow: 800, outflow: -500, net: 300, cum: -700 },
                        { name: 'Y3', inflow: 1500, outflow: -200, net: 1300, cum: 600 },
                    ]} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Legend />
                        <ReferenceLine y={0} stroke="#cbd5e1" />
                        <Bar dataKey="inflow" fill="#fbbf24" name="Inflow" barSize={40} stackId="a" />
                        <Bar dataKey="outflow" fill="#f87171" name="Outflow" barSize={40} stackId="a" />
                        <Line type="monotone" dataKey="cum" stroke="#3b82f6" strokeWidth={3} dot={{r:4}} name="Cumulative" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    </div>
);

// Reuse Risk & Legal from previous iteration, just ensure they are imported.
const RiskTab = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
         <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center text-sm"><RefreshCw className="w-4 h-4 mr-2 text-indigo-600"/> Scenario Comparison</h3>
            <Button size="xs" variant="secondary" icon={Settings}>Configure Variables</Button>
         </div>
        
        {/* Scenario Cards - Compact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-indigo-500 p-5 bg-indigo-50/20">
                 <div className="flex justify-between items-start mb-2">
                     <div className="font-bold text-indigo-900">Base Case</div>
                     <Badge variant="neutral">Current</Badge>
                 </div>
                 <div className="space-y-3 mt-4">
                     <div className="flex justify-between items-center border-b border-indigo-100 pb-2"><span className="text-xs text-slate-600 font-medium">IRR</span> <span className="font-bold text-emerald-700">102.7%</span></div>
                     <div className="flex justify-between items-center border-b border-indigo-100 pb-2"><span className="text-xs text-slate-600 font-medium">NPV</span> <span className="font-bold text-emerald-700">1,040 B</span></div>
                 </div>
            </Card>
             <Card className="border-t-4 border-t-amber-500 p-5 bg-white opacity-90 hover:opacity-100 transition-opacity">
                 <div className="flex justify-between items-start mb-2">
                     <div className="font-bold text-amber-900">Stress Test</div>
                     <span className="text-[10px] text-slate-400">Cost +10%, Rev -5%</span>
                 </div>
                 <div className="space-y-3 mt-4">
                     <div className="flex justify-between items-center border-b border-slate-100 pb-2"><span className="text-xs text-slate-600 font-medium">IRR</span> <span className="font-bold text-emerald-600">91.2%</span></div>
                     <div className="flex justify-between items-center border-b border-slate-100 pb-2"><span className="text-xs text-slate-600 font-medium">NPV</span> <span className="font-bold text-emerald-600">949.7 B</span></div>
                 </div>
            </Card>
             <Card className="border-t-4 border-t-rose-500 p-5 bg-white opacity-90 hover:opacity-100 transition-opacity">
                 <div className="flex justify-between items-start mb-2">
                     <div className="font-bold text-rose-900">Worst Case</div>
                     <span className="text-[10px] text-slate-400">Cost +20%, Rev -10%</span>
                 </div>
                 <div className="space-y-3 mt-4">
                     <div className="flex justify-between items-center border-b border-slate-100 pb-2"><span className="text-xs text-slate-600 font-medium">IRR</span> <span className="font-bold text-amber-600">63.3%</span></div>
                     <div className="flex justify-between items-center border-b border-slate-100 pb-2"><span className="text-xs text-slate-600 font-medium">NPV</span> <span className="font-bold text-amber-600">626.5 B</span></div>
                 </div>
            </Card>
        </div>
        
        {/* Tornado - Better Aspect */}
        <Card className="p-6">
             <h3 className="font-bold text-slate-800 mb-4 text-sm">Sensitivity (IRR Impact)</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={[
                        { name: 'Constr Cost +5%', value: -2.5 }, { name: 'Sales Price -5%', value: -4.2 },
                        { name: 'Interest +1%p', value: -1.8 }, { name: 'Cap Rate -0.5%p', value: 0 },
                        { name: 'Sales Price +10%', value: 8.5 }
                    ]} margin={{ top: 5, right: 30, left: 40, bottom: 5 }} stackOffset="sign">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={110} tick={{fontSize: 10, fill: '#64748b'}} />
                        <Tooltip />
                        <ReferenceLine x={0} stroke="#94a3b8" />
                        <Bar dataKey="value" fill="#8884d8" barSize={16}>
                             {/* Reusing existing logic for cell fill color would go here */}
                             <Cell fill="#ef4444" /> <Cell fill="#ef4444" /> <Cell fill="#ef4444" /> <Cell fill="#94a3b8" /> <Cell fill="#10b981" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
             </div>
        </Card>
    </div>
);

const LegalTab = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
            <div className="flex items-center space-x-3">
                <h2 className="text-lg font-bold text-slate-900">Legal Review</h2>
                <Badge variant="warning" className="px-3 py-1 text-xs">YELLOW - In Progress</Badge>
            </div>
            <span className="text-xs text-slate-400">Last reviewed: 2025. 12. 30.</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-rose-50 border border-rose-100 rounded-lg p-4">
                 <div className="text-xs font-bold text-rose-800 mb-1">Open Issues</div>
                 <div className="text-2xl font-bold text-rose-600">0 <span className="text-sm font-normal text-rose-400">/ 0</span></div>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                 <div className="text-xs font-bold text-orange-800 mb-1">High+ Issues</div>
                 <div className="text-2xl font-bold text-orange-600">0</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                 <div className="text-xs font-bold text-emerald-800 mb-1 flex justify-between">
                    <span>Finance Impact</span>
                    <DollarSign className="w-3 h-3"/>
                 </div>
                 <div className="text-2xl font-bold text-emerald-600">0</div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                 <div className="text-xs font-bold text-blue-800 mb-1 flex justify-between">
                    <span>Schedule Impact</span>
                    <Calendar className="w-3 h-3"/>
                 </div>
                 <div className="text-2xl font-bold text-blue-600">0</div>
            </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-2 rounded-lg border border-slate-200 gap-3">
             <div className="flex space-x-4 text-sm text-slate-500 px-2 overflow-x-auto w-full sm:w-auto">
                <button className="flex items-center space-x-1 text-blue-600 font-bold whitespace-nowrap"><AlertTriangle className="w-4 h-4"/> <span>Issues (16)</span></button>
                <button className="flex items-center space-x-1 hover:text-slate-800 whitespace-nowrap"><CheckSquare className="w-4 h-4"/> <span>Checklist</span></button>
                <button className="flex items-center space-x-1 hover:text-slate-800 whitespace-nowrap"><FileText className="w-4 h-4"/> <span>Documents</span></button>
             </div>
             <div className="flex items-center space-x-2 w-full sm:w-auto">
                 <Input placeholder="Search issues..." className="flex-1 sm:w-48 h-8 text-xs" />
                 <Button size="xs" icon={MoreHorizontal}>Add</Button>
             </div>
        </div>

        {/* Issues Table */}
        <Card className="overflow-hidden">
             <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm min-w-[700px]">
                     <thead className="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
                         <tr>
                             <th className="px-6 py-3 font-medium">Severity</th>
                             <th className="px-6 py-3 font-medium">Status</th>
                             <th className="px-6 py-3 font-medium w-1/3">Title</th>
                             <th className="px-6 py-3 font-medium">Impact</th>
                             <th className="px-6 py-3 font-medium">Updated</th>
                             <th className="px-6 py-3 font-medium"></th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         {[
                             { sev: 'Critical', title: 'BCR Exceeded', date: '2025. 12. 30.' },
                             { sev: 'Critical', title: 'Fire Resistance Rating', date: '2025. 12. 30.' },
                             { sev: 'Critical', title: 'Evacuation Stairs', date: '2025. 12. 30.' },
                             { sev: 'High', title: 'Parking Entrance Width', date: '2025. 12. 30.' },
                             { sev: 'High', title: 'Landscape Area Ratio', date: '2025. 12. 30.' },
                         ].map((item, i) => (
                             <tr key={i} className="hover:bg-slate-50 transition-colors">
                                 <td className="px-6 py-3">
                                     <Badge variant={item.sev.toLowerCase() as any}>{item.sev}</Badge>
                                 </td>
                                 <td className="px-6 py-3">
                                     <span className="text-rose-600 text-xs font-bold flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> Open</span>
                                 </td>
                                 <td className="px-6 py-3 font-medium text-slate-800">{item.title}</td>
                                 <td className="px-6 py-3">
                                     <div className="flex space-x-1">
                                         <FileText className="w-4 h-4 text-slate-300" />
                                         <DollarSign className="w-4 h-4 text-emerald-500" />
                                     </div>
                                 </td>
                                 <td className="px-6 py-3 text-slate-500 text-xs">{item.date}</td>
                                 <td className="px-6 py-3 text-right">
                                     <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-4 h-4"/></button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
        </Card>
    </div>
);

// --- Main Component ---

const AnalysisWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('finance'); 
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
      switch(activeTab) {
          case 'overview': return <OverviewTab />;
          case 'cost': return <CostTab />;
          case 'revenue': return <RevenueTab />;
          case 'finance': return <FinanceTab />;
          case 'cashflow': return <CashflowTab />;
          case 'risk': return <RiskTab />;
          case 'legal': return <LegalTab />;
          default: return <OverviewTab />;
      }
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans text-slate-900 relative">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 1. Left Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none
        lg:static lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white">
          <button onClick={() => navigate('/projects')} className="text-slate-400 hover:text-slate-600 mr-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-slate-800 tracking-tight text-base">Workspace</span>
          <button className="ml-auto lg:hidden text-slate-400 hover:text-slate-600" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-6 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Analysis Modules</div>
          <SidebarItem icon={LayoutGrid} label="Dashboard" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }} />
          <SidebarItem icon={Building} label="Building Spec" active={activeTab === 'building'} onClick={() => { setActiveTab('building'); setSidebarOpen(false); }} />
          <SidebarItem icon={Calculator} label="Cost Analysis" active={activeTab === 'cost'} onClick={() => { setActiveTab('cost'); setSidebarOpen(false); }} />
          <SidebarItem icon={Coins} label="Revenue Model" active={activeTab === 'revenue'} onClick={() => { setActiveTab('revenue'); setSidebarOpen(false); }} />
          <SidebarItem icon={Landmark} label="Capital Structure" active={activeTab === 'finance'} onClick={() => { setActiveTab('finance'); setSidebarOpen(false); }} />
          <SidebarItem icon={LineChartIcon} label="Cashflow" active={activeTab === 'cashflow'} onClick={() => { setActiveTab('cashflow'); setSidebarOpen(false); }} />
          <div className="px-6 mt-6 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Risk & Compliance</div>
          <SidebarItem icon={AlertTriangle} label="Sensitivity" active={activeTab === 'risk'} onClick={() => { setActiveTab('risk'); setSidebarOpen(false); }} />
          <SidebarItem icon={Scale} label="Legal Review" active={activeTab === 'legal'} onClick={() => { setActiveTab('legal'); setSidebarOpen(false); }} />
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
           <div className="flex items-center text-xs text-slate-500 mb-1 font-medium">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
             Auto-saved
           </div>
           <div className="text-[10px] text-slate-400">Last edit: 2 mins ago</div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        
        {/* Workspace Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 flex-shrink-0 z-10 sticky top-0">
           <div className="flex items-center min-w-0 flex-1 mr-4">
              <button className="lg:hidden mr-3 text-slate-500 hover:text-slate-700" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>

              <div className="w-8 h-8 bg-indigo-600 rounded-md hidden sm:flex items-center justify-center text-white mr-3 shadow-sm flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex flex-col">
                 <div className="flex items-center space-x-2">
                    <h1 className="text-sm lg:text-base font-bold text-slate-900 truncate">Jung-gu Euljiro 6-ga 21-23</h1>
                    <Badge variant="brand" className="hidden sm:inline-flex">Commercial</Badge>
                 </div>
                 <div className="flex items-center text-xs text-slate-500 space-x-2 truncate">
                    <span className="truncate max-w-[150px] md:max-w-none">Seoul, Jung-gu, Euljiro 6-ga 21-23</span>
                 </div>
              </div>
           </div>

           <div className="flex items-center space-x-3 ml-auto flex-shrink-0">
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-2">
                <Button variant="secondary" size="sm" icon={Eye}>Preview</Button>
                <Button variant="secondary" size="sm" icon={Share2}>Share</Button>
                <Button variant="primary" size="sm" icon={Save}>Save Version</Button>
              </div>
              
              {/* Mobile Actions */}
              <div className="lg:hidden flex items-center space-x-2">
                  <Button variant="primary" size="sm" icon={Save} className="w-8 h-8 p-0"><span className="sr-only">Save</span></Button>
              </div>

              <div className="h-6 w-px bg-slate-200 mx-1"></div>
              
              <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
           </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar bg-[#F8F9FA]">
          <div className="max-w-[1600px] mx-auto min-w-0">
             {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalysisWorkspace;