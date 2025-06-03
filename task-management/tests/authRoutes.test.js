const request = require('supertest');
const app = require('../index'); 
const db = require('../config/database');   

describe('Auth Routes', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'TestPassword123!'
  };

  // Clean up test user before and after tests
  beforeAll((done) => {
    db.query('DELETE FROM user WHERE email = ?', [testUser.email], done);
  });

  afterAll((done) => {
    db.query('DELETE FROM user WHERE email = ?', [testUser.email], () => {
      db.end(); // Close DB connection
      done();
    });
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(testUser);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
    });

    it('should not register an existing user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(testUser);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Email already exists');
    });
  });

  describe('POST /auth/login', () => {
    it('should log in an existing user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: testUser.email, password: testUser.password });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('tokens');
      expect(res.body.data.tokens).toHaveProperty('accessToken');
      expect(res.body.data.tokens).toHaveProperty('refreshToken');
    });

    it('should reject login with wrong password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: testUser.email, password: 'WrongPass' });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});
