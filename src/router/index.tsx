import { createBrowserRouter, Navigate } from "react-router-dom";
import { GitApp } from "../GitApp";
import { IssuesListPage } from "../pages/IssuesListPage";
import { IssuePage } from "../pages/IssuePage";

export const router = createBrowserRouter([
    {
        path: '/issues',
        element: <GitApp />,
        children: [
            {path: 'list', element: <IssuesListPage />},
            {path: 'issue/:id', element: <IssuePage  />},
            { path: '*', element: <Navigate to="list" /> },
        ]
    },
    {
        path: '/',
        element: <Navigate to="/issues/list" />,
    },
    {
        path: '*',
        element: <h1>Pagina no encontrada</h1>
    }
]);