import React from 'react'

export default function UrlInput({ index, value, onChange }) {
    return (
        <div>
            <label>Url {index + 1}:</label>
            <input
                type="text"
                required
                value={value}
                onChange={(e) => onChange(index, e)}
            />
        </div>
    )
}