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
import Footer from "./Footer";
import { User } from "../../entities/User";

const Navigation: FC = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    console.log(useSelector((state: RootState) => state.auth));
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}') as User;
    const dispatch = useDispatch<AppDispatch>();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.role?.includes("ROLE_MODERATOR") || false);
            setShowAdminBoard(currentUser.role?.includes("ROLE_ADMIN") || false);
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }
    }, [currentUser]);

    return (
        <div className="layout-container">
            <NavBar 
                currentUser={currentUser}
                logOut={logOut}
                showModeratorBoard={showModeratorBoard}
                showAdminBoard={showAdminBoard}
            />
            <main className="main-content">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="photos" element={<Gallery />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default Navigation;