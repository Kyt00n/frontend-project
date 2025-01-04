import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from 'axios';
import '../../styles/layout.css';

interface Photo {
    id: number;
    title: string;
    url: string;
    userId: number;
}

const Gallery: FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=12');
                setPhotos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching photos:', error);
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    const handlePhotoClick = (photo: Photo) => {
        setSelectedPhoto(photo);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    if (loading) {
        return (
            <div className="main-content">
                <div className="content-section">Loading photos...</div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <div className="content-section">
                <h1 className="section-title">Photo Gallery</h1>
                
                {currentUser && (
                    <div className="gallery-actions">
                        <button className="btn btn-primary">Upload New Photo</button>
                    </div>
                )}

                <div className="gallery-grid">
                    {photos.map(photo => (
                        <div 
                            key={photo.id} 
                            className="gallery-item"
                            onClick={() => handlePhotoClick(photo)}
                        >
                            <img 
                                src={photo.url} 
                                alt={photo.title} 
                                className="gallery-image"
                            />
                            <div className="gallery-overlay">
                                <h3 className="gallery-title">{photo.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Photo Modal */}
            {selectedPhoto && (
                <div className="photo-modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <img 
                            src={selectedPhoto.url} 
                            alt={selectedPhoto.title} 
                            className="modal-image"
                        />
                        <div className="modal-info">
                            <h3>{selectedPhoto.title}</h3>
                            <button 
                                className="btn btn-secondary modal-close"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;