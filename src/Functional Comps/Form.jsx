import React, { useState } from 'react';
import UrlInput from './urlInput';

export default function Form() {

    const [urls, setUrls] = useState(['', '', '']);

    // Handle URL input changes
    const handleChange = (index, event) => {
        const newUrls = [...urls]; // Create a copy of the current urls array
        newUrls[index] = event.target.value; // Update the specific URL
        setUrls(newUrls); // Update the state with the new array
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('URLs:', urls);
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
            </form>
        </div>
    )
}
