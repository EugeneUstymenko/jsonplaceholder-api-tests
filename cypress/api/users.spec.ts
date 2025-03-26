import { User } from '../support/interfaces/user.interface';

describe('Users API', () => {
  let testData: any;

  before(() => {
    // Load test data before running tests
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  describe('GET /users', () => {
    it('should return a list of users', () => {
      cy.getUsers().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.at.least(1);

        // Check structure of the first user
        const user = response.body[0] as User;
        expect(user).to.have.property('id');
        expect(user).to.have.property('name');
        expect(user).to.have.property('email');
        expect(user).to.have.property('address');
        expect(user.address).to.have.property('geo');
      });
    });

    it('should return correct data types for user properties', () => {
      cy.getUsers().then((response) => {
        const user = response.body[0] as User;
        expect(user.id).to.be.a('number');
        expect(user.name).to.be.a('string');
        expect(user.email).to.be.a('string');
        expect(user.address).to.be.an('object');
        expect(user.phone).to.be.a('string');
        expect(user.website).to.be.a('string');
        expect(user.company).to.be.an('object');
      });
    });
  });

  describe('GET /users/{id}', () => {
    it('should return a specific user by ID', () => {
      const userId = 1;

      cy.getUserById(userId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.eq(userId);
      });
    });

    it('should return 404 for non-existent user ID', () => {
      const nonExistentId = 999;

      cy.request({
        method: 'GET',
        url: `/users/${nonExistentId}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe('POST /users', () => {
    it('should create a new user', () => {
      cy.createUser(testData.users.new).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('id');
        expect(response.body.name).to.eq(testData.users.new.name);
        expect(response.body.email).to.eq(testData.users.new.email);
      });
    });
  });

  describe('PUT /users/{id}', () => {
    it('should update an existing user', () => {
      const userId = 1;

      cy.updateUser(userId, testData.users.update).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.eq(userId);
        expect(response.body.name).to.eq(testData.users.update.name);
        expect(response.body.email).to.eq(testData.users.update.email);
      });
    });
  });

  describe('PATCH /users/{id}', () => {
    it('should partially update an existing user', () => {
      const userId = 1;
      const partialUpdate = { name: 'Partially Updated Name' };

      cy.partialUpdateUser(userId, partialUpdate).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.eq(userId);
        expect(response.body.name).to.eq(partialUpdate.name);
      });
    });
  });

  describe('DELETE /users/{id}', () => {
    it('should delete an existing user', () => {
      const userId = 1;

      cy.deleteUser(userId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        // JSONPlaceholder doesn't actually delete resources, but returns an empty object
        expect(Object.keys(response.body).length).to.eq(0);
      });
    });
  });

  describe('Specific Data Validation', () => {
    it('should return correct data for user with ID 1', () => {
      cy.getUserById(1).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('Leanne Graham');
        expect(response.body.email).to.eq('Sincere@april.biz');
        expect(response.body.username).to.eq('Bret');
        expect(response.body.address.city).to.eq('Gwenborough');
        expect(response.body.company.name).to.eq('Romaguera-Crona');
      });
    });
  });

  describe('Pagination and Filtering', () => {
    it('should limit results with _limit parameter', () => {
      const limit = 3;
      cy.request(`/users?_limit=${limit}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(limit);
      });
    });

    it('should sort users by specified field', () => {
      cy.request('/users?_sort=name&_order=asc').then((response) => {
        expect(response.status).to.eq(200);
        const names = response.body.map((user: User) => user.name);
        const sortedNames = [...names].sort();
        expect(names).to.deep.equal(sortedNames);
      });
    });
  });

  describe('Response Headers', () => {
    it('should return correct Content-Type header', () => {
      cy.getUsers().then((response) => {
        expect(response.headers['content-type']).to.include('application/json');
      });
    });
  });

  describe('Performance Tests', () => {
    it('should respond within acceptable time', () => {
      cy.getUsers().then((response) => {
        expect(response.duration).to.be.lessThan(1000); // менее 1 секунды
      });
    });
  });

  describe('Invalid Parameters Handling', () => {
    it('should handle invalid ID parameter', () => {
      cy.request({
        method: 'GET',
        url: '/users/abc',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 404]);
      });
    });
  });
});
