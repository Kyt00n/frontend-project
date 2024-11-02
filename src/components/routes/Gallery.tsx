import { FC } from "react";
import { Link } from "react-router-dom";

const Gallery: FC = () => {
    return (
        <div>
            <h1>Gallery</h1>
            <Link to="/">Home</Link>
        </div>
    );
}

export default Gallery;