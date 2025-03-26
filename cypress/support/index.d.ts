/// <reference types="cypress" />
import { User, CreateUserRequest, UpdateUserRequest } from './interfaces/user.interface';
import { Post, CreatePostRequest, UpdatePostRequest } from './interfaces/post.interface';

declare global {
  namespace Cypress {
    interface Chainable {
      // Commands for users
      /**
       * Get all users
       * @example cy.getUsers()
       */
      getUsers(): Chainable<Cypress.Response<User[]>>;

      /**
       * Get user by ID
       * @param id User ID
       * @example cy.getUserById(1)
       */
      getUserById(id: number): Chainable<Cypress.Response<User>>;

      /**
       * Create a new user
       * @param user User data
       * @example cy.createUser({ name: 'John Doe', ... })
       */
      createUser(user: CreateUserRequest): Chainable<Cypress.Response<User>>;

      /**
       * Update a user
       * @param id User ID
       * @param user Update data
       * @example cy.updateUser(1, { name: 'Jane Doe', ... })
       */
      updateUser(id: number, user: UpdateUserRequest): Chainable<Cypress.Response<User>>;

      /**
       * Partially update a user
       * @param id User ID
       * @param user Partial update data
       * @example cy.partialUpdateUser(1, { name: 'Jane Doe' })
       */
      partialUpdateUser(id: number, user: UpdateUserRequest): Chainable<Cypress.Response<User>>;

      /**
       * Delete a user
       * @param id User ID
       * @example cy.deleteUser(1)
       */
      deleteUser(id: number): Chainable<Cypress.Response<{}>>;

      // Commands for posts
      /**
       * Get all posts
       * @example cy.getPosts()
       */
      getPosts(): Chainable<Cypress.Response<Post[]>>;

      /**
       * Get post by ID
       * @param id Post ID
       * @example cy.getPostById(1)
       */
      getPostById(id: number): Chainable<Cypress.Response<Post>>;

      /**
       * Get posts by user ID
       * @param userId User ID
       * @example cy.getPostsByUserId(1)
       */
      getPostsByUserId(userId: number): Chainable<Cypress.Response<Post[]>>;

      /**
       * Create a new post
       * @param post Post data
       * @example cy.createPost({ title: 'New Post', body: 'Content', userId: 1 })
       */
      createPost(post: CreatePostRequest): Chainable<Cypress.Response<Post>>;

      /**
       * Update a post
       * @param id Post ID
       * @param post Update data
       * @example cy.updatePost(1, { title: 'Updated Post', body: 'New Content' })
       */
      updatePost(id: number, post: UpdatePostRequest): Chainable<Cypress.Response<Post>>;

      /**
       * Partially update a post
       * @param id Post ID
       * @param post Partial update data
       * @example cy.partialUpdatePost(1, { title: 'Updated Title' })
       */
      partialUpdatePost(id: number, post: UpdatePostRequest): Chainable<Cypress.Response<Post>>;

      /**
       * Delete a post
       * @param id Post ID
       * @example cy.deletePost(1)
       */
      deletePost(id: number): Chainable<Cypress.Response<{}>>;
    }
  }
}
