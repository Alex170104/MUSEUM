export const fetchArtworksByDepartment = async (departmentId: number) => {
    try {
        const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&hasImages=true&q=*`
        );

        if (!response.ok) {
            throw new Error('Erreur lors de la recherche du département : ' + departmentId);
        }

        const data = await response.json();
        return data.objectIDs || [];
    } catch (error) {
        console.error(`Erreur pour le département ${departmentId} :`, error);
        return [];
    }
};

export const loadObjectsWithImages = async (ids: number[], limit = 10) => {
    const artworks = [];
    let i = 0;

    while (artworks.length < limit && i < ids.length) {
        const id = ids[i];
        i++;

        try {
            const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
            const obj = await res.json();

            if (obj.primaryImageSmall || obj.primaryImage) {
                artworks.push({
                    id: obj.objectID,
                    title: obj.title,
                    image: obj.primaryImageSmall || obj.primaryImage,
                });
            }
        } catch (err) {
            console.error(`Erreur pour l’objet ${id}`, err);
        }
    }

    return artworks;
};
