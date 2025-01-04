import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import '../../styles/components/footer.css';

const Footer: FC = () => {
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    return (
        <footer className="footer">
            {!currentUser && (
                <div className="footer-content">
                    <h2 className="footer-title">Join Our Community</h2>
                    <p className="footer-description">
                        Connect with friends, share photos, and join discussions.
                    </p>
                    <div className="footer-buttons">
                        <Link to="/register" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-secondary">
                            Login
                        </Link>
                    </div>
                </div>
            )}
            <div className="footer-copyright">
                <p>© 2025 Social Media Platform. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;