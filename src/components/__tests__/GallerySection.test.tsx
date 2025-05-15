// src/components/GallerySection/GallerySection.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GallerySection from '../GallerySection/GallerySection.tsx';
import type { Artwork } from '../../types.ts';

describe('GallerySection', () => {
    const fakeArtworks: Artwork[] = [
        {
            id: '1',
            title: 'Mona Lisa',
            image: 'https://example.com/monalisa.jpg',
        },
        {
            id: '2',
            title: 'Starry Night',
            image: 'https://example.com/starrynight.jpg',
        },
    ];

    it('affiche le nom du thème quand non en chargement', () => {
        render(<GallerySection name="European Paintings" artworks={fakeArtworks} />);
        const title = screen.getByText('European Paintings');
        expect(title).toBeInTheDocument();
        expect(title).not.toHaveClass('skeleton');
    });

    it('affiche les titres des œuvres quand non en chargement', () => {
        render(<GallerySection name="Test" artworks={fakeArtworks} />);
        expect(screen.getByText('Mona Lisa')).toBeInTheDocument();
        expect(screen.getByText('Starry Night')).toBeInTheDocument();
    });

    it('affiche 10 loaders ArtworkCard quand isLoading est true', () => {
        render(<GallerySection name="Loading Section" artworks={[]} isLoading={true} />);

        // Vérifie que le h2 est bien vide avec class skeleton
        const heading = screen.getByRole('heading');
        expect(heading).toHaveClass('skeleton');
        expect(heading.textContent?.trim()).toBe('');

        // Vérifie qu'il y a bien 10 ArtworkCard de chargement
        const loaders = screen.getAllByTestId('artwork-loading');
        expect(loaders).toHaveLength(10);
    });
});
