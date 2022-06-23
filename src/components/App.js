import React, {Suspense, lazy, useEffect} from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import authOperations from "Redux/auth/auth-operations";
import Layout from "./Layout/Layout";

const HomeView = lazy(() => import ('../views/HomeView'));
const EventsView = lazy(() => import ('../views/EventsView'));
const UserEventsView = lazy(() => import ('../views/UserEventsView'));
const OneEventView = lazy(() => import ('../views/OneEventView'));
const AuthView = lazy(() => import ('../views/AuthView'));
const ProfileView = lazy(() => import ('../views/ProfileView'));
const AdminPanelView = lazy(() => import ('../views/AdminPanelView'));

export default function App() {
    const token = useSelector((state) => state.auth.user.token);

    useEffect(() => {
        authOperations.getCurrentUser();
    }, []);

    return (
        <div>
            <Suspense fallback={<p>Завантаження...</p>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomeView />} />
                        <Route path="events" element={<EventsView />} />
                        <Route path="events/:id" element={<OneEventView />} />
                        <Route path="myevents" element={<UserEventsView />} />
                        <Route path="myevents/:id" element={<OneEventView />} />
                        <Route path="auth" element={token ? <Navigate replace to="/" /> : <AuthView />} />
                        <Route path="profile" element={token ? <ProfileView /> : <Navigate replace to="/" />} />
                        <Route path="profile/:id" element={<OneEventView />} />
                        <Route path="adminpanel" element={token ? <AdminPanelView /> : <Navigate replace to="/" />} />
                        <Route path="adminpanel/:id" element={<OneEventView />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
};