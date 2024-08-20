import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server/index';

describe('GET /csrf-token', () => {
  it('should return a CSRF token', async () => {
      const response = await request(app).get('/csrf-token');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('csrfToken');
  });
});

describe('POST /fetch-metadata', () => {
/*   it('should return metadata for valid URLs', async () => {
      const urls = ['https://example.com'];
      const response = await request(app)
          .post('/fetch-metadata')
          .send({ urls })
          .set('Cookie', 'csrfToken=valid-csrf-token'); // Adjust according to how your CSRF token is set

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty('url');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('image');
  });
 */
  it('should handle invalid URLs array', async () => {
      const response = await request(app)
          .post('/fetch-metadata')
          .send({ urls: 'invalid-url' }) // Sending invalid data
          .set('Cookie', 'csrfToken=valid-csrf-token'); // Adjust according to how your CSRF token is set

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Please provide an array of URLs.');
  });

/*   it('should handle server errors', async () => {
      const urls = ['https://invalid-url.com']; // Assuming this URL will fail
      const response = await request(app)
          .post('/fetch-metadata')
          .send({ urls })
          .set('Cookie', 'csrfToken=valid-csrf-token'); // Adjust according to how your CSRF token is set

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'An error occurred while fetching metadata.');
  }); */
});

/* const testUrls = [
  'https://www.youtube.com/',
  'https://www.wikipedia.org/'
];

describe('POST /fetch-metadata', () => {
  it('should return metadata for provided URLs', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ urls: testUrls })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(testUrls.length);
    response.body.forEach((metadata) => {
      expect(metadata).toHaveProperty('url');
      expect(metadata).toHaveProperty('title');
      expect(metadata).toHaveProperty('description');
      expect(metadata).toHaveProperty('image');
    });
  });

  it('should return 400 for invalid request body', async () => {
    const response = await request(app)
      .post('/fetch-metadata')
      .send({ invalid: 'data' })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error', 'Please provide an array of URLs.');
  });
});
 */