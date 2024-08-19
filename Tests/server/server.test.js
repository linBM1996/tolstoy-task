import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server/index';

const testUrls = [
  'https://www.youtube.com/',
  'https://www.wikipedia.org'
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
