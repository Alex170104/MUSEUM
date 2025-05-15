import './ArtworkCard.css'; // Ajoute ton style ici si ce n’est pas déjà fait

type Props = {
    title?: string;
    image?: string;
    isLoading?: boolean;
};

function ArtworkCard({ title, image, isLoading }: Props) {
    return (
        <div className="carousel-item">
            <div className="image-container">
                {isLoading ? (
                    <div className="skeleton skeleton-image" data-testid="artwork-loading"></div>
                ) : (
                    <img src={image} alt={title} />
                )}
            </div>
            <p className={isLoading ? 'skeleton skeleton-text' : ''}>{isLoading ? '' : title}</p>
        </div>
    );
}

export default ArtworkCard;
