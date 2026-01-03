import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MapLanding from './pages/MapLanding';
import ProjectHub from './pages/ProjectHub';
import AnalysisWorkspace from './pages/AnalysisWorkspace';
import DealosBackbone from './pages/DealosBackbone';
import StandaloneLegalReview from './pages/StandaloneLegalReview';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/map" replace />} />
        <Route path="/map" element={<MapLanding />} />
        <Route path="/projects" element={<ProjectHub />} />
        <Route path="/workspace/:id" element={<AnalysisWorkspace />} />
        <Route path="/workflow/:id" element={<DealosBackbone />} />
        <Route path="/legal" element={<StandaloneLegalReview />} />
      </Routes>
    </HashRouter>
  );
};

export default App;