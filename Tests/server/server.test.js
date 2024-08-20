import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../server/index';

let csrfToken;

describe('Server Endpoints', () => {
  beforeAll(async () => {
    // Fetch the CSRF token before running the tests
    const response = await request(app).get('/csrf-token');
    csrfToken = response.body.csrfToken;
  });

  describe('GET /csrf-token', () => {
    it('should return a CSRF token', async () => {
      const response = await request(app).get('/csrf-token');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('csrfToken');
    });
  });

  /* describe('POST /fetch-metadata', () => {
    it('should return metadata for multiple valid URLs', async () => {
      const urls = [
        'https://www.youtube.com/',
        'https://github.com/',
        'https://www.wikipedia.org/'
      ];
  
      // Fetch CSRF token first
      const csrfResponse = await request(app).get('/csrf-token');
      const csrfToken = csrfResponse.body.csrfToken;
  
      // Use the fetched CSRF token in the request
      const response = await request(app)
        .post('/fetch-metadata')
        .send({ urls })
        .set('Cookie', `csrfToken=${csrfToken}`); // Use the token here
  
      console.log('Response:', response.body); // Log the response body for debugging
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      //expect(response.body.length).toBe(urls.length); // Ensure the number of metadata items matches the number of URLs
  
      response.body.forEach((item, index) => {
        expect(item).toHaveProperty('url');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('image');
        expect(item.url).toBe(urls[index]); // Check if the URL in the response matches the one sent
      });
    });
  }); */
});