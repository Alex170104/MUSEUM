// src/components/__tests__/Gallery.test.tsx

import { render, screen, waitFor, within } from '@testing-library/react';
import Gallery from '../Gallery/Gallery.tsx';
import * as api from '../../api/api.ts';
import { describe, it, vi, expect, beforeEach } from 'vitest';

describe('Gallery component', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('charge les œuvres et affiche les sections', async () => {
        // 👇 On ne garde que 2 départements pour ce test
        const fakeDepartments = [
            { id: 10, name: 'Egyptian Art' },
            { id: 6, name: 'Asian Art' },
        ];

        // 👇 Mock les IDs retournés par fetchArtworksByDepartment
        vi.spyOn(api, 'fetchArtworksByDepartment').mockImplementation(async (departmentId: number) => {
            return Array.from({ length: 10 }, (_, i) => departmentId * 100 + i);
        });

        // 👇 Mock des objets avec image et titre unique
        vi.spyOn(api, 'loadObjectsWithImages').mockImplementation(async (ids: number[], limit: number = 10) => {
            return ids.slice(0, limit).map((id) => ({
                id,
                title: `Artwork ${id}`,
                image: `https://example.com/image${id}.jpg`
            }));
        });

        // 👇 Render le composant
        render(<Gallery />);

        // ⏳ Attend que la galerie soit chargée (donc que tous les h2 aient un vrai nom)
        await waitFor(() => {
            expect(screen.queryByText('\u00A0')).not.toBeInTheDocument();
        });

        // ✅ Vérifie que les sections apparaissent
        for (const { name } of fakeDepartments) {
            expect(screen.getByText(name)).toBeInTheDocument();
        }

        // ✅ Vérifie que chaque section contient bien 10 titres
        const egyptianSection = screen.getByText('Egyptian Art').closest('.gallery-theme') as HTMLElement;
        const asianSection = screen.getByText('Asian Art').closest('.gallery-theme') as HTMLElement;

        // On cherche tous les <img> dans chaque section
        const egyptianImages = within(egyptianSection).getAllByRole('img');
        const asianImages = within(asianSection).getAllByRole('img');

        expect(egyptianImages).toHaveLength(10);
        expect(asianImages).toHaveLength(10);

        // Ou bien, on peut tester les titres s'ils sont affichés dans des <p>
        for (let i = 0; i < 10; i++) {
            expect(within(egyptianSection).getByText(`Artwork ${1000 + i}`)).toBeInTheDocument();
            expect(within(asianSection).getByText(`Artwork ${600 + i}`)).toBeInTheDocument();
        }
    });
});
