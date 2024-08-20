import React, { useState } from 'react';
import UrlInput from './UrlInput.jsx';
import MetadataDisplay from './MetadataDisplay.jsx';
import '../Styles/Form.css';

export default function Form() {

    const [urls, setUrls] = useState(['', '', '']);
    const [metadata, setMetadata] = useState([]);

    // Handle URL input changes
    const handleChange = (index, event) => {
        const newUrls = [...urls]; // Create a copy of the current urls array
        newUrls[index] = event.target.value; // Update the specific URL
        setUrls(newUrls); // Update the state with the new array
    };

    const fetchCsrfToken = async () => {
        const response = await fetch('/csrf-token');
        const data = await response.json();
        return data.csrfToken;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const csrfToken = await fetchCsrfToken();
        try {
            const response = await fetch('http://localhost:3000/fetch-metadata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': [csrfToken] // Include CSRF token in the request headers
                },
                body: JSON.stringify({ urls }),
                credentials: 'include' // Ensure cookies are sent
            });

            const data = await response.json();
            setMetadata(data);
            console.log('metadata:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="url-form">
                <div className="form-title">Please Enter 3 URLs:</div>
                {urls.map((url, index) => (
                    <UrlInput
                        key={index}
                        index={index}
                        value={url}
                        onChange={handleChange}
                        className="url-input"
                    />
                ))}
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {metadata.length > 0 && <MetadataDisplay metadata={metadata} />}
        </div>
    )
}
