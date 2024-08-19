/* import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Form from '../../src/Functional Comps/Form';
import '@testing-library/jest-dom';

describe('Form Component', () => {
    it('renders correctly', () => {
        render(<Form />);
        expect(screen.getByText('Please Enter 3 URLs:')).toBeInTheDocument();
        expect(screen.getAllByRole('textbox')).toHaveLength(3);
    });

    it('updates URL inputs correctly', () => {
        render(<Form />);
        
        const inputs = screen.getAllByRole('textbox');
        fireEvent.change(inputs[0], { target: { value: 'https://www.youtube.com/' } });
        expect(inputs[0].value).toBe('https://www.youtube.com/');
    });

    it('handles form submission and displays metadata', async () => {
        // Mock the fetch request
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ title: 'Example Title' }]),
            })
        );

        render(<Form />);
        
        const inputs = screen.getAllByRole('textbox');
        fireEvent.change(inputs[0], { target: { value: 'https://www.youtube.com/' } });
        
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(screen.getByText('Example Title')).toBeInTheDocument();
        });
    });
}); */