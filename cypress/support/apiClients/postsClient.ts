import { Post, CreatePostRequest, UpdatePostRequest } from '../interfaces/post.interface';

/**
 * Client for Posts API
 */
export class PostsClient {
  /**
   * Get all posts
   * @returns List of posts
   */
  static getAll(): Cypress.Chainable<Cypress.Response<Post[]>> {
    return cy.request({
      method: 'GET',
      url: '/posts',
    });
  }

  /**
   * Get post by ID
   * @param id Post ID
   * @returns Post with specified ID
   */
  static getById(id: number): Cypress.Chainable<Cypress.Response<Post>> {
    return cy.request({
      method: 'GET',
      url: `/posts/${id}`,
    });
  }

  /**
   * Get posts by user ID
   * @param userId User ID
   * @returns List of posts for specified user
   */
  static getByUserId(userId: number): Cypress.Chainable<Cypress.Response<Post[]>> {
    return cy.request({
      method: 'GET',
      url: `/posts?userId=${userId}`,
    });
  }

  /**
   * Create a new post
   * @param post Post data to create
   * @returns Created post
   */
  static create(post: CreatePostRequest): Cypress.Chainable<Cypress.Response<Post>> {
    return cy.request({
      method: 'POST',
      url: '/posts',
      body: post,
    });
  }

  /**
   * Update an existing post
   * @param id Post ID to update
   * @param post Post data for update
   * @returns Updated post
   */
  static update(id: number, post: UpdatePostRequest): Cypress.Chainable<Cypress.Response<Post>> {
    return cy.request({
      method: 'PUT',
      url: `/posts/${id}`,
      body: post,
    });
  }

  /**
   * Partially update an existing post
   * @param id Post ID to patch
   * @param post Partial post data for update
   * @returns Updated post
   */
  static partialUpdate(id: number, post: Partial<Post>): Cypress.Chainable<Cypress.Response<Post>> {
    return cy.request({
      method: 'PATCH',
      url: `/posts/${id}`,
      body: post,
    });
  }

  /**
   * Delete a post
   * @param id Post ID to delete
   * @returns Empty response
   */
  static delete(id: number): Cypress.Chainable<Cypress.Response<{}>> {
    return cy.request({
      method: 'DELETE',
      url: `/posts/${id}`,
    });
  }
}
