import { AddAlarm, Archive, Home } from '@material-ui/icons'
import { Analytics, AutoStories } from '@mui/icons-material'
import React from 'react'

export const SidebarData = [
    {
        title: "Home",
        icon: <Home />,
        path: "/home"
    },
    {
        title: "Create Task",
        icon: <AddAlarm />,
        path: "/createTask"
    },
    {
        title: "Board",
        icon: <Analytics />,
        path: "/board"
    },
    {
        title: "Create Board",
        icon: <Archive />,
        path: "/createBoard"
    },
    {
        title: "All Boards",
        icon: <AutoStories />,
        path: "/allBoards"
    },
]
