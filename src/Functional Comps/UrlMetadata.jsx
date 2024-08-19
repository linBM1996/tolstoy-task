import React from 'react';
import '../Styles/UrlMetadata.css';

export default function UrlMetadata({ url, title, description, image, error }) {
  return (
    <div className="url-metadata-container">
      <div>
        <p className={error ? 'url-metadata-error' : 'url-metadata-field'}>
          URL: {url}
        </p>
        {error ? (
          <p className="url-metadata-error">Error: {error}</p>
        ) : (
          <>
            <p className="url-metadata-field">Title: {title}</p>
            <p className="url-metadata-field">Description: {description}</p>
            <p className="url-metadata-field">Image: {image}</p>
          </>
        )}
      </div>
    </div>
  );
}