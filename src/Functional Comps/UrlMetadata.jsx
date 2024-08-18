import React from 'react'

export default function UrlMetadata({ url, title, description, image, error }) {
  return (
    <div>
      <li>
        <p>URL: {url}</p>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <p>Image: {image}</p>
          </>
        )}
      </li>
    </div>
  )
}
