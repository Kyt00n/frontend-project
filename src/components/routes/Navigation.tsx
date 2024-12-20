import { FC, useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Gallery from "./Gallery";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logout } from "../../actions/auth.action";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Profile from "./Profile";
import Posts from "./Posts";
import NavBar from "./NavBar";

const Navigation: FC = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles?.includes("ROLE_MODERATOR") || false);
            setShowAdminBoard(currentUser.roles?.includes("ROLE_ADMIN") || false);
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }
    }, [currentUser]);

    return (
        <>
            <NavBar 
                currentUser={currentUser}
                logOut={logOut}
                showModeratorBoard={showModeratorBoard}
                showAdminBoard={showAdminBoard}
            />
            <main className="p-4">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="photos" element={<Gallery />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="search">
                        <Route path="users" element={<div>Search Users</div>} />
                        <Route path="photos" element={<div>Search Photos</div>} />
                    </Route>
                </Routes>
            </main>
        </>
    );
}

export default Navigation;