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

const Navigation: FC = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state:RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const logOut = useCallback(() => {
        dispatch(logout());
      }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
          setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
          setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
          setShowModeratorBoard(false);
          setShowAdminBoard(false);
        }
      }, [currentUser]);
    
    return (
        <Routes>
            <Route index element={<Home />}/>
            <Route path="gallery" element={<Gallery />}/>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
}

export default Navigation;