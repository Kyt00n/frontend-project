import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import UserService from "../../services/user.service";
import Footer from "./Footer";
import '../../styles/layout.css';

const Home: FC = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="layout-container">
            <main className="main-content">
                <h1 className="section-title">Welcome to Social Media Platform</h1>
                
                <div className="content-section">
                    <h2 className="section-subtitle">Latest Updates</h2>
                    {content ? (
                        <p>{content}</p>
                    ) : (
                        <p className="text-muted">Loading content...</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;