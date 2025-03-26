import { Post } from '../support/interfaces/post.interface';

describe('Posts API', () => {
  let testData: any;

  before(() => {
    // Load test data before running tests
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  describe('GET /posts', () => {
    it('should return a list of posts', () => {
      cy.getPosts().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.at.least(1);

        // Check structure of the first post
        const post = response.body[0] as Post;
        expect(post).to.have.property('id');
        expect(post).to.have.property('title');
        expect(post).to.have.property('body');
        expect(post).to.have.property('userId');
      });
    });

    it('should return correct data types for post properties', () => {
      cy.getPosts().then((response) => {
        const post = response.body[0] as Post;
        expect(post.id).to.be.a('number');
        expect(post.title).to.be.a('string');
        expect(post.body).to.be.a('string');
        expect(post.userId).to.be.a('number');
      });
    });
  });

  describe('GET /posts/{id}', () => {
    it('should return a specific post by ID', () => {
      const postId = 1;

      cy.getPostById(postId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.eq(postId);
      });
    });

    it('should return 404 for non-existent post ID', () => {
      const nonExistentId = 999;

      cy.request({
        method: 'GET',
        url: `/posts/${nonExistentId}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe('GET /posts?userId={userId}', () => {
    it('should return posts for a specific user', () => {
      const userId = 1;

      cy.getPostsByUserId(userId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');

        // Verify all posts belong to the specified user
        response.body.forEach((post: Post) => {
          expect(post.userId).to.eq(userId);
        });
      });
    });

    it('should return empty array for user with no posts', () => {
      const userWithNoPosts = 999;

      cy.getPostsByUserId(userWithNoPosts).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(0);
      });
    });
  });

  describe('POST /posts', () => {
    it('should create a new post', () => {
      cy.createPost(testData.posts.new).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.eq(testData.posts.new.title);
        expect(response.body.body).to.eq(testData.posts.new.body);
        expect(response.body.userId).to.eq(testData.posts.new.userId);
      });
    });
  });

  describe('PUT /posts/{id}', () => {
    it('should update an existing post', () => {
      const postId = 1;

      cy.updatePost(postId, testData.posts.update).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.eq(postId);
        expect(response.body.title).to.eq(testData.posts.update.title);
        expect(response.body.body).to.eq(testData.posts.update.body);
      });
    });
  });

  describe('PATCH /posts/{id}', () => {
    it('should partially update an existing post', () => {
      const postId = 1;
      const partialUpdate = { title: 'Partially Updated Title' };

      cy.partialUpdatePost(postId, partialUpdate).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.eq(postId);
        expect(response.body.title).to.eq(partialUpdate.title);
      });
    });
  });

  describe('DELETE /posts/{id}', () => {
    it('should delete an existing post', () => {
      const postId = 1;

      cy.deletePost(postId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('object');
        // JSONPlaceholder doesn't actually delete resources, but returns an empty object
        expect(Object.keys(response.body).length).to.eq(0);
      });
    });
  });

  describe('Specific Data Validation', () => {
    it('should return correct data for post with ID 1', () => {
      cy.getPostById(1).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.userId).to.eq(1);
        expect(response.body.title).to.eq(
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
        );
        expect(response.body.body).to.eq(
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
        );
      });
    });
  });

  describe('Response Headers', () => {
    it('should return correct Content-Type header', () => {
      cy.getPosts().then((response) => {
        expect(response.headers['content-type']).to.include('application/json');
      });
    });
  });

  describe('Pagination and Filtering', () => {
    it('should limit results with _limit parameter', () => {
      const limit = 5;
      cy.request(`/posts?_limit=${limit}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(limit);
      });
    });

    it('should paginate results with _page parameter', () => {
      const limit = 10;
      const page = 2;
      cy.request(`/posts?_page=${page}&_limit=${limit}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.at.most(limit);
        // On the second page, we should have posts starting with ID 11 (with a limit of 10)
        if (response.body.length > 0) {
          expect(response.body[0].id).to.eq((page - 1) * limit + 1);
        }
      });
    });

    it('should sort posts by specified field', () => {
      cy.request('/posts?_sort=title&_order=asc').then((response) => {
        expect(response.status).to.eq(200);
        const titles = response.body.map((post: Post) => post.title);
        const sortedTitles = [...titles].sort();
        expect(titles).to.deep.equal(sortedTitles);
      });
    });

    it('should filter posts by userId and apply sorting', () => {
      const userId = 1;
      cy.request(`/posts?userId=${userId}&_sort=id&_order=desc`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');

        // Check all posts belong to the specified user
        response.body.forEach((post: Post) => {
          expect(post.userId).to.eq(userId);
        });

        // Check posts are sorted by ID in descending order
        const ids = response.body.map((post: Post) => post.id);
        const sortedIds = [...ids].sort((a, b) => b - a); // descending order
        expect(ids).to.deep.equal(sortedIds);
      });
    });
  });
});
