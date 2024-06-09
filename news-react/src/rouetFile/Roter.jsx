import React from 'react';
import { Routes, Route } from "react-router-dom";
import Routind from './Routind.jsx';
import Header from "../component/Header";
const RoutePage = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Header/>}>
                {Routind.map((route, index) => (
                    <Route
                        path={route.path}
                        element={route.component}
                        key={index}
                    />
                ))}
            </Route>
        </Routes>
    </div>
  );

}

export default RoutePage;