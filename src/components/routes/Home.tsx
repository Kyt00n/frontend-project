import { FC, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import UserService from "../../services/user.service";

const Home: FC = () => {
    const [content, setContent] = useState<string>("");
    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setContent(_content);
            }
        );
    }, []);
    return (
        <div>
            Home Component
            {content}
            <Link to="/gallery">Galeria</Link>
        </div>
    );
};

export default Home;
