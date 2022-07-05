import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as GoIcons from "react-icons/go";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },

    {
        title: 'Reports',
        path: '/reports',
        icon: <GoIcons.GoGraph />,
        className: 'nav-text'
    },
]
