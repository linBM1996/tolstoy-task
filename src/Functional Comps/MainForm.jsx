import React, { useState } from 'react';
import UrlInput from './UrlInput.jsx';
import MetadataDisplay from './MetadataDisplay.jsx';

export default function Form() {

    const [urls, setUrls] = useState(['', '', '']);
    const [metadata, setMetadata] = useState([]);

    // Handle URL input changes
    const handleChange = (index, event) => {
        const newUrls = [...urls]; // Create a copy of the current urls array
        newUrls[index] = event.target.value; // Update the specific URL
        setUrls(newUrls); // Update the state with the new array
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/fetch-metadata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ urls }),
            });
            const data = await response.json();
            setMetadata(data);
            console.log('metadata:', metadata);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>please enter 3 URLs:</div>
                {urls.map((url, index) => (
                    <UrlInput
                        key={index}
                        index={index}
                        value={url}
                        onChange={handleChange}
                    />
                ))}
                <button type="submit">Submit</button>
                {metadata.length > 0 && <MetadataDisplay metadata={metadata} />}
            </form>
        </div>
    )
}
