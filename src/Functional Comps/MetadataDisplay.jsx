import React from 'react'
import UrlMetadata from './UrlMetadata.jsx';
import '../Styles/MetadataDisplay.css';

export default function MetadataDisplay({ metadata }) {
  return (
    <div className="metadata-display-container">
    <h3 className="metadata-display-title">Fetched Metadata:</h3>
    <ul className="metadata-display-list">
      {metadata.map((item, idx) => (
        <li key={idx} className="metadata-display-list-item">
          <UrlMetadata
            url={item.url}
            title={item.title}
            description={item.description}
            image={item.image}
            error={item.error}
          />
        </li>
      ))}
    </ul>
  </div>
  )
}
