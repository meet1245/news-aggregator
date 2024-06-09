import React from "react";
import Home from "../pages/Home/index";
import Profile from '../pages/Profile/index'
import Setting from "../pages/setting/Setting";
const Routind = [

    {
        path: "/",
        component: <Home />,
    },
    {
        path: "/profile",
        component: <Profile />,
    },
    {
        path: "/setting",
        component: <Setting />,
    },
]

export default Routind;