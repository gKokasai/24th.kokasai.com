import { Pages } from "./components/Pages";
import Footer from "./components/common/Footer";
import MenuBar from "./components/common/MenuBar";
import FloatNotice from "./components/common/FloatNotice";

import Access from "./components/access/Access";
import Event from "./components/event/Event";
import Home from "./components/home/Home";
import Map from "./components/map/Map";
import Project from "./components/project/Project";
import Credit from "./components/home/credit/Credit";
import Inquiry from "./components/home/inquiry/Inquiry";
import Apologize from "./components/home/apologize/Apologize";
import ProjectDetail from "./components/project/projectDetail/ProjectDetail";
import Page404 from "./components/home/page404/Page404";

import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  //<FloatNotice>第一体育館にて<br />「青春がしたい平川」<br />公演中！</FloatNotice>

  return (
    <>
      <div className="webBackGround" />

      <div className="mainBackGround responsiveWidth">
        <BrowserRouter>
          <Routes>
            <Route exact path={Pages.access.path} element={<Access />} />
            <Route exact path={Pages.event.path} element={<Event />} />
            <Route exact path={Pages.home.path} element={<Home />} />
            <Route exact path={Pages.map.path} element={<Map />} />
            <Route exact path={Pages.project.path} element={<Project />} />
            <Route exact path={Pages.credit.path} element={<Credit />} />
            <Route exact path={Pages.inquiry.path} element={<Inquiry />} />
            <Route exact path={Pages.apologize.path} element={<Apologize />} />
            <Route exact path={Pages.projectDetail.path} element={<ProjectDetail />} />
            <Route exact path={Pages.page404.path} element={<Page404 />} />
          </Routes>
        </BrowserRouter>

        <Footer />
        <MenuBar />
      </div>
    </>
  );
}

export default App;
