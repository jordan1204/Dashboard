import React from "react";
import {
  BrowserRouter ,
  Route,
  Routes,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Layout from "./Views/_Layout";
import Home from "./Views/Home";
import BlankPage from "./Views/_Layout/BlankPage";

function App() {
  return (
    <>
      <CssBaseline enableColorScheme/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlankPage/>}/>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App