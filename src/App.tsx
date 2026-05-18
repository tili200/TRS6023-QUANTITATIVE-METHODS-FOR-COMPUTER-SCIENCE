/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import CourseSummary from './pages/CourseSummary';
import OfficialFiles from './pages/OfficialFiles';
import CourseGuide from './pages/CourseGuide';
import Syllabus from './pages/Syllabus';
import ETutorial from './pages/ETutorial';
import Forum from './pages/Forum';
import CourseReadingList from './pages/CourseReadingList';
import MyProfile from './pages/MyProfile';
import GradingDashboard from './pages/GradingDashboard';
import { useAppContext } from './context/AppContext';

function RouteTracker() {
  const location = useLocation();
  const { setLastVisitedPage } = useAppContext();

  useEffect(() => {
    setLastVisitedPage(location.pathname);
  }, [location, setLastVisitedPage]);

  return null;
}

export default function App() {
  const { role } = useAppContext();

  return (
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="summary" element={<CourseSummary />} />
          <Route path="guide" element={<CourseGuide />} />
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="files" element={<OfficialFiles />} />
          <Route path="tutorial" element={<ETutorial />} />
          <Route path="forum" element={<Forum />} />
          <Route path="reading-list" element={<CourseReadingList />} />
          <Route path="profile" element={<MyProfile />} />
          {role === 'lecturer' && <Route path="grading" element={<GradingDashboard />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
