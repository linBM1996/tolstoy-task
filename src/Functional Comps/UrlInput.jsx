import React from 'react';
import '../Styles/UrlInput.css';

export default function UrlInput({ index, value, onChange }) {
    const inputId = `url-input-${index}`;
    return (
        <div className="url-input-container">
            <label htmlFor={inputId} className="url-input-label">
                Url {index + 1}:
            </label>
            <input
                id={inputId}
                type="text"
                required
                value={value}
                onChange={(e) => onChange(index, e)}
                className="url-input-field"
                title={`Enter URL ${index + 1}`}
                placeholder={`Enter URL ${index + 1}`}
            />
        </div>
    )
}