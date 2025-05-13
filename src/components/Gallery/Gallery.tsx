import { useEffect, useState } from "react";
import type { Artwork } from "../../types.ts";
import GallerySection from "../GallerySection/GallerySection.tsx";
import { fetchArtworksByDepartment, loadObjectsWithImages } from "../../api/api.ts";

function Gallery() {
    const [departments, setDepartments] = useState<{ name: string; artworks: Artwork[] }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const departmentList = [
            { id: 10, name: 'Egyptian Art' },
            { id: 6, name: 'Asian Art' },
            { id: 11, name: 'European Paintings' },
            { id: 4, name: 'Arms and Armor' }
        ];

        const loadAllDepartments = async () => {
            const results = await Promise.all(
                departmentList.map(async ({ id, name }) => {
                    const ids = await fetchArtworksByDepartment(id);
                    const artworks = await loadObjectsWithImages(ids, 10);
                    return { name, artworks };
                })
            );
            setDepartments(results);
            setIsLoading(false);
        };

        loadAllDepartments();
    }, []);

    if (isLoading) {
        const fakeSections = ['Chargement...', 'En cours...', 'Préparation...', 'Récupération...'];
        return (
            <section className="gallery">
                {fakeSections.map((_, i) => (
                    <GallerySection key={i} name="" artworks={[]} isLoading />
                ))}
            </section>
        );
    }

    return (
        <section className="gallery">
            {departments.map(({ name, artworks }) => (
                <GallerySection
                    key={name}
                    name={name}
                    artworks={artworks}
                    isLoading={false}
                />
            ))}
        </section>
    );
}

export default Gallery;