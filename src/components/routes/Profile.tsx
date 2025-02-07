import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from '../../store';
import { User } from "../../entities/User";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}') as User;

  if (!currentUser.username) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <strong>{currentUser.role}</strong>
    </div>
  );
};

export default Profile;