
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import {Posts} from "./components/posts";
import {Post} from "./components/post";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route index element={ <Posts></Posts>}/>
                <Route path='post/:id' element={<Post/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
