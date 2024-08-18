import React from 'react'
import '../Styles/UrlInput.css';

export default function UrlInput({ index, value, onChange }) {
    return (
        <div className="url-input-container">
            <label className="url-input-label">Url {index + 1}:</label>
            <input
                type="text"
                required
                value={value}
                onChange={(e) => onChange(index, e)}
                className="url-input-field"
            />
        </div>
    )
}