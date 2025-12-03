import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../PAGES";
import { NotFound } from "../NotFound";
import { AboutPomodoro } from "../componentes/AboutPomodoro";

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