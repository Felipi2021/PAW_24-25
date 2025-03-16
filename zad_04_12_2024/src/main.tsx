import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import App from './App.tsx'
import {Contact} from "./components/contact";
import {About} from "./components/about";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route index element={<App/>}/>
              <Route path="kontakt" element={<Contact/>}/>
              <Route path="about" element={ <About/>}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
