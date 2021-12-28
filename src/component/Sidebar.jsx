import React from 'react'
import '../App.css';
import { SidebarData } from './SidebarData'

const Sidebar = () => {
    return (
        <div className='Sidebar'>
            <ul className='SidebarList' >
                {
                    SidebarData.map((item, index) => {
                        return (
                            <li key={index} onClick={
                                () => {
                                    window.location.pathname = item.path
                                }}
                                id={window.location.pathname === item.path ? 'active' : ''}
                                className='SidebarItem'
                            >
                                <div id='icon' >{item.icon}</div>
                                <div id='title' >{item.title}</div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Sidebar;