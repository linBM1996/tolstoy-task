import { it, expect, describe, vi } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from '../../src/Functional Comps/Form'; // Ensure the path is correct

// Mocking fetch API if necessary
global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([]),
    })
);

describe('Form', () => {
    it('should render form with input field and submit button', () => {
        render(<Form />);
        const inputElement = screen.getByTestId('urlInput');
        const submitButton = screen.getByRole('button');
        expect(inputElement).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('should add input URLs to form', () => {
        render(<Form />);
        const inputElement = screen.getByTestId('urlInput');

        fireEvent.change(inputElement, { target: { value: 'https://www.github.com' } });
        expect(inputElement.value).toBe('https://www.github.com');
    });

    it('should update state and render new content after API call', async () => {
        render(<Form />);

        const inputElement = screen.getByTestId('urlInput');

        fireEvent.change(inputElement, { target: { value: 'https://www.github.com' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        fireEvent.change(inputElement, { target: { value: 'https://www.wikipedia.org' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        fireEvent.change(inputElement, { target: { value: 'https://www.nytimes.com' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        // You might need to update this based on how your component renders the list
        const chips = screen.getAllByRole('listitem');
        expect(chips).toHaveLength(3);
    });
});
