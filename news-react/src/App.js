import { BrowserRouter} from 'react-router-dom';
import React from "react";
import './App.css';
// import Login from './components/Login';
import Roter from './rouetFile/Roter';
// import Dashboard from './components/Dashboard';

function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Roter/>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
