import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../PAGES/Home";
import { NotFound } from "../NotFound";
import { AboutPomodoro } from "../componentes/AboutPomodoro";
import { History } from './../History/Home/index';

export function Roteador(){
    return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/history/' element={<History />} />
            <Route path='/about-pomodoro/' element={<AboutPomodoro/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    )
}