import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import Gallery from "./Gallery";

const Navigation: FC = () => {
    return (
        <Routes>
            <Route index element={<Home />}/>
            <Route path="gallery" element={<Gallery />}/>
        </Routes>
    );
}

export default Navigation;