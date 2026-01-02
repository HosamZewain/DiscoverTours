
import React, { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className, fallback = 'https://placehold.co/600x400?text=Image+Not+Found', ...props }) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleError = () => {
        if (!error) {
            setError(true);
        }
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img
                src={error ? fallback : src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
                onError={handleError}
                {...props}
            />
            {/* Skeleton / Loading State */}
            {!loaded && !error && (
                <div className="absolute inset-0 bg-stone-200 animate-pulse" />
            )}
        </div>
    );
};

export default Image;
