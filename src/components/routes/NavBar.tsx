import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface User {
    username: string;
    roles: string[];
}

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
        <nav className="bg-gray-800 p-4">
            <div className="max-w-screen flex justify-between items-center">
                <div className="flex gap-4">
                    <Link to="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/photos" className="text-white hover:text-gray-300">
                        Photos
                    </Link>
                    <Link to="/posts" className="text-white hover:text-gray-300">
                        Posts
                    </Link>
                    {showModeratorBoard && (
                        <Link to="/mod" className="text-white hover:text-gray-300">
                            Moderator Board
                        </Link>
                    )}
                    {showAdminBoard && (
                        <Link to="/admin" className="text-white hover:text-gray-300">
                            Admin Board
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {currentUser ? (
                        <>
                            <div className="relative">
                                <button className="text-white hover:text-gray-300">
                                    Search
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg hidden hover:block">
                                    <Link to="/search/users" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Search Users
                                    </Link>
                                    <Link to="/search/photos" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Search Photos
                                    </Link>
                                </div>
                            </div>
                            <Link to="/profile" className="text-white hover:text-gray-300">
                                {currentUser.username}
                            </Link>
                            <button
                                onClick={logOut}
                                className="text-white hover:text-gray-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-300">
                                Login
                            </Link>
                            <Link to="/register" className="text-white hover:text-gray-300">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;