import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

/*     it('handles form submission and displays metadata', async () => {
        render(<Form />);
        // Fill out the form
        fireEvent.change(screen.getByPlaceholderText('Enter URL 1'), {
            target: { value: 'https://www.youtube.com/' },
        });
        fireEvent.change(screen.getByPlaceholderText('Enter URL 2'), {
            target: { value: 'https://he.wikipedia.org/' },
        });
        fireEvent.change(screen.getByPlaceholderText('Enter URL 3'), {
            target: { value: 'https://leetcode.com/explore/' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Submit'));

        // Wait for the metadata to be displayed
        await waitFor(() => {
            // Check that the metadata is displayed
            expect(screen.getByText('YouTube')).toBeInTheDocument();
        });
    }); */
});
