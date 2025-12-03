import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Home } from "../PAGES";
import { NotFound } from "../NotFound";
import { AboutPomodoro } from "../componentes/AboutPomodoro";
import { useEffect } from "react";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function Roteador(){
    return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about-pomodoro/' element={<AboutPomodoro/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    )
}