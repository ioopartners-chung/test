import React, { useState } from 'react';
import { AppHeader } from '../components/layout/AppHeader';
import { Button, Input, Badge, Card } from '../components/ui/UIComponents';
import { Search, Plus, Filter, MoreHorizontal, Star, MapPin, LayoutGrid, List as ListIcon } from 'lucide-react';
import { Project, ProjectStatus, ProjectType } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const ProjectHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'office' | 'residential'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock Data
  const projects: Project[] = [
    {
      id: '1',
      name: 'Gangnam Station Office Tower A',
      address: 'Yeoksam-dong, Gangnam-gu, Seoul',
      type: ProjectType.OFFICE,
      status: ProjectStatus.IN_PROGRESS,
      updatedAt: '2 hours ago',
      kpi: { irr: 12.5, totalCost: 1250, profit: 156 },
    },
    {
      id: '2',
      name: 'Seongsu Mixed-Use Complex',
      address: 'Seongsu-dong, Seoul',
      type: ProjectType.MIXED,
      status: ProjectStatus.REVIEW,
      updatedAt: '1 day ago',
      kpi: { irr: 8.2, totalCost: 850, profit: 60 },
    },
    {
      id: '3',
      name: 'Pangyo Tech Valley Hub',
      address: 'Pangyo, Gyeonggi-do',
      type: ProjectType.OFFICE,
      status: ProjectStatus.DRAFT,
      updatedAt: '3 days ago',
      kpi: { irr: 15.1, totalCost: 450, profit: 80 },
    },
    {
      id: '4',
      name: 'Hannam Luxury Villas',
      address: 'Hannam-dong, Yongsan-gu',
      type: ProjectType.RESIDENTIAL,
      status: ProjectStatus.COMPLETED,
      updatedAt: '1 week ago',
      kpi: { irr: 18.4, totalCost: 320, profit: 85 },
    },
  ];

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.IN_PROGRESS: return <Badge variant="success">In Progress</Badge>;
      case ProjectStatus.REVIEW: return <Badge variant="warning">Under Review</Badge>;
      case ProjectStatus.COMPLETED: return <Badge variant="neutral">Completed</Badge>;
      default: return <Badge variant="outline">Draft</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 mt-16 max-w-[1400px]">
        
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Project Hub</h1>
            <p className="text-slate-500 text-sm mt-1">Manage, analyze and track your real estate portfolio.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:flex-none">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
               <Input placeholder="Search projects..." className="pl-9 w-full md:w-64" />
             </div>
             <Button onClick={() => navigate('/map')} icon={Plus} className="whitespace-nowrap">New Project</Button>
          </div>
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 border-b border-slate-200 overflow-x-auto no-scrollbar w-full md:w-auto">
            {['all', 'recent', 'office', 'residential', 'retail'].map((tab) => (
                <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
                >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
            </div>

            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 space-x-1">
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <ListIcon className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Project Content */}
        {viewMode === 'grid' ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="group hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full">
                    <div onClick={() => navigate(`/workspace/${project.id}`)} className="flex-1 flex flex-col">
                        {/* Card Header */}
                        <div className="p-5 border-b border-slate-100 flex-1">
                        <div className="flex justify-between items-start mb-3">
                            {getStatusBadge(project.status)}
                            <button className="text-slate-300 hover:text-yellow-400 transition-colors">
                            <Star className="w-5 h-5" />
                            </button>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                            {project.name}
                        </h3>
                        <div className="flex items-center text-slate-500 text-xs mt-2">
                            <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                            <span className="truncate">{project.address}</span>
                        </div>
                        </div>

                        {/* KPI Quick View */}
                        <div className="px-5 py-4 grid grid-cols-2 gap-4 bg-slate-50/50">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">IRR</span>
                            <p className={`text-lg font-bold mt-0.5 ${project.kpi.irr > 10 ? 'text-emerald-600' : 'text-slate-700'}`}>
                            {project.kpi.irr}%
                            </p>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cost</span>
                            <p className="text-lg font-bold text-slate-900 mt-0.5">
                            ₩{project.kpi.totalCost}B
                            </p>
                        </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 bg-white border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                        <span>Updated {project.updatedAt}</span>
                        <span className="font-medium text-slate-600">{project.type}</span>
                        </div>
                    </div>
                    </Card>
                ))}
                
                {/* New Project Placeholder */}
                <button 
                    onClick={() => navigate('/map')}
                    className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all min-h-[280px]"
                >
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 shadow-sm">
                    <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-sm">Create New Project</span>
                </button>
             </div>
        ) : (
            // List View
            <Card className="overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs text-slate-500 uppercase border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-medium w-1/3">Project Name</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Type</th>
                            <th className="px-6 py-3 font-medium text-right">IRR</th>
                            <th className="px-6 py-3 font-medium text-right">Total Cost</th>
                            <th className="px-6 py-3 font-medium text-right">Updated</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {projects.map((project) => (
                            <tr 
                                key={project.id} 
                                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                                onClick={() => navigate(`/workspace/${project.id}`)}
                            >
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900 group-hover:text-indigo-600">{project.name}</div>
                                    <div className="text-xs text-slate-500 mt-0.5 flex items-center">
                                        <MapPin className="w-3 h-3 mr-1" /> {project.address}
                                    </div>
                                </td>
                                <td className="px-6 py-4">{getStatusBadge(project.status)}</td>
                                <td className="px-6 py-4 text-slate-600">{project.type}</td>
                                <td className="px-6 py-4 text-right font-bold text-emerald-600">{project.kpi.irr}%</td>
                                <td className="px-6 py-4 text-right font-medium text-slate-900">₩{project.kpi.totalCost}B</td>
                                <td className="px-6 py-4 text-right text-slate-500 text-xs">{project.updatedAt}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        )}

      </main>
    </div>
  );
};

export default ProjectHub;
