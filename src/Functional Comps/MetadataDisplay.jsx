import React from 'react'
import UrlMetadata from './UrlMetadata.jsx';

export default function MetadataDisplay({ metadata }) {
  return (
    <div>
       <div>
            <h3>Fetched Metadata:</h3>
            <ul>
                {metadata.map((item, idx) => (
                    <UrlMetadata
                        key={idx}
                        url={item.url}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        error={item.error}
                    />
                ))}
            </ul>
        </div>
    </div>
  )
}
