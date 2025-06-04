import type { Artwork } from '../../types.ts';
import ArtworkCard from '../ArtworkCard/ArtworkCard.tsx';

type Props = {
    name: string;
    artworks: Artwork[];
    isLoading?: boolean;
};

function GallerySection({ name, artworks, isLoading = false }: Props) {
    return (

            <div className="gallery-theme">
                <h2 className={isLoading ? 'skeleton skeleton-h2' : ''}>
                    {isLoading ? '\u00A0' : name}
                </h2>
                <div className="carousel">
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, i) => (
                            <ArtworkCard key={i} isLoading />
                        ))
                        : artworks.map((art) => (
                            <button onClick={() => window.location.href = `/produit/${art.id}`} className={"invisible"}>
                                <ArtworkCard key={art.id} image={art.image} title={art.title} />
                            </button>
                        ))}
                </div>
            </div>

    );
}

export default GallerySection;
