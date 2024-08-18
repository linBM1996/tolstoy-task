import React, { useState } from 'react';

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
                <div>
                    <label>Url 1:</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => handleChange(0, e)}
                    />
                </div>
                <div>
                    <label>Url 2:</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => handleChange(1, e)}
                    />
                </div>
                <div>
                    <label>Url 3:</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => handleChange(2, e)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
