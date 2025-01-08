import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import {Main} from "./Pages/main/main.tsx";
import {Categories} from "./Pages/categories/categories.tsx";
import {Posts} from "./Pages/posts/posts.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<Main/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/posts" element={<Posts/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
