import { FC } from "react"
import { Link } from "react-router-dom"

const Home: FC = () => {
    return (
        <div>
            Home Component
            <Link to="/gallery">Galeria</Link>
        </div>
    );
};

export default Home;
