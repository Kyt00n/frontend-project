import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/navigation.css';
import { User } from '../../entities/User';


interface NavBarProps {
    currentUser: User | null;
    logOut: () => void;
    showModeratorBoard: boolean;
    showAdminBoard: boolean;
}

const NavBar: FC<NavBarProps> = ({
    currentUser,
    logOut,
    showModeratorBoard,
    showAdminBoard
}) => {

    return (
        <nav className="nav-container">
            <div className="nav-content">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    Social Media
                </Link>

                {/* Navigation Links */}
                <div className="nav-links">
                    <Link to="/photos" className="nav-link">
                        Photos
                    </Link>
                    <Link to="/posts" className="nav-link">
                        Posts
                    </Link>
                </div>

                {/* Auth Section */}
                <div className="nav-auth">
                    {currentUser && currentUser.id ? (
                        <>
                            <Link to="/profile" className="nav-link">
                                {currentUser.username}
                            </Link>
                            <button onClick={logOut} className="btn btn-danger">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;