import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, } from '@testing-library/react';

import { ItensListRow } from './index';

describe('ItensLstRow', () => {
    it('renders all properties', () => {
        render(<ItensListRow genre_id={12} row_title={"Experience Incredible Journeys"} />)

        expect(screen.getByText('Experience Incredible Journeys')).toBeInTheDocument();

        
    });
});
