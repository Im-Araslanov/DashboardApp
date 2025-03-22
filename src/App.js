// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageTitleProvider } from './context/PageTitleContext';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AnalyticsPage from './pages/AnalyticsPage';
import CitizenCardPagePage from './pages/CitizenCardPage';

function App() {
  return (
    <Router>
      <PageTitleProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/citizen сard" element={<CitizenCardPagePage />} />
          </Routes>
        </Layout>
      </PageTitleProvider>
    </Router>
  );
}

export default App;