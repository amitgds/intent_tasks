const request = require('supertest');
const app = require('../index'); 
const db = require('../config/database');   
let authToken;  // Store JWT token here for auth

// Dummy test user credentials (make sure this user exists or create it before tests)
const testUser = {
    "email":"rampandey@gmail.com",
    "password":"Qweasz@321"
};

let createdTaskId;

beforeAll(async () => {
  // Log in to get token
  const res = await request(app)
    .post('/auth/login') // Adjust if your auth route is different
    .send({ email: testUser.email, password: testUser.password });
  
  authToken = res.body.data.tokens.accessToken;
});

afterAll(done => {
  // Clean up DB or close connection if needed
  db.end();
  done();
});

describe('Task API', () => {

  test('GET /task-management/ - fetch all tasks', async () => {
    const res = await request(app)
      .get('/task-management/')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /task-management/ - create a task', async () => {
    const taskData = {
      title: "Test Task",
      description: "Test description",
      due_date: "2025-12-31",
      status: "pending"
    };

    const res = await request(app)
      .post('/task-management/')
      .set('Authorization', `Bearer ${authToken}`)
      .send(taskData);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Task created successfully.");

    // Save created task id for later
    // You may need to query DB here to get the id or modify your controller to return it.
    // For this example, let's assume the controller returns the id:
    // createdTaskId = res.body.data.id;
  });

  test('GET /task-management/:id - fetch a task by id', async () => {
    // You need a valid task id; use the one created above or a known id
    const taskId = 1; // Replace with a valid id or create a task and use that id
    
    const res = await request(app)
      .get(`/task-management/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);
    
    if (res.statusCode === 200) {
      expect(res.body.success).toBe(true);
    } else {
      expect(res.statusCode).toBe(400); // Could be task not found or invalid id
    }
  });

  test('PUT /task-management/:id - update a task', async () => {
    const taskId = 1; // Replace with a valid task id
    const updateData = {
      title: "Updated Task",
      description: "Updated description",
      due_date: "2025-12-31",
      status: "in-progress"
    };

    const res = await request(app)
      .put(`/task-management/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData);

    if (res.statusCode === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Task updated successfully.");
    } else {
      expect(res.statusCode).toBe(400);
    }
  });

  test('DELETE /task-management/:id - delete a task', async () => {
    const taskId = 1; // Replace with a valid task id

    const res = await request(app)
      .delete(`/task-management/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);

    if (res.statusCode === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Task deleted successfully.");
    } else {
      expect(res.statusCode).toBe(400);
    }
  });

  test('POST /task-management/filter - filter tasks', async () => {
    const filterParams = { status: "pending" };
    const res = await request(app)
      .post('/task-management/filter')
      .set('Authorization', `Bearer ${authToken}`)
      .send(filterParams);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /task-management/paginate - paginate tasks', async () => {
    const paginationParams = { page: 1, limit: 5, sort: "due_date", order: "asc" };
    const res = await request(app)
      .post('/task-management/paginate')
      .set('Authorization', `Bearer ${authToken}`)
      .send(paginationParams);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /task-management/:id/assign - assign task', async () => {
    const taskId = 1; // Replace with a valid task id
    const assignData = { user_id: 2 }; // Replace with a valid user_id

    const res = await request(app)
      .post(`/task-management/${taskId}/assign`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(assignData);

    if (res.statusCode === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Task assigned successfully.");
    } else {
      expect(res.statusCode).toBe(400);
    }
  });

  test('POST /task-management/:id/add-category - add category to task', async () => {
    const taskId = 1; // Replace with a valid task id
    const categoryData = { category: "Work" };

    const res = await request(app)
      .post(`/task-management/${taskId}/add-category`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(categoryData);

    if (res.statusCode === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Category added to task successfully.");
    } else {
      expect(res.statusCode).toBe(500);
    }
  });

  test('POST /task-management/:id/add-comment - add comment to task', async () => {
    const taskId = 1; // Replace with a valid task id
    const commentData = { comment: "This is a test comment." };

    const res = await request(app)
      .post(`/task-management/${taskId}/add-comment`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(commentData);

    if (res.statusCode === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Comment added to task successfully.");
    } else {
      expect(res.statusCode).toBe(500);
    }
  });

});
