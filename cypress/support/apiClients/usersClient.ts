import { User, CreateUserRequest, UpdateUserRequest } from '../interfaces/user.interface';

/**
 * Client for Users API
 */
export class UsersClient {
  /**
   * Get all users
   * @returns List of users
   */
  static getAll(): Cypress.Chainable<Cypress.Response<User[]>> {
    return cy.request({
      method: 'GET',
      url: '/users',
    });
  }

  /**
   * Get user by ID
   * @param id User ID
   * @returns User with specified ID
   */
  static getById(id: number): Cypress.Chainable<Cypress.Response<User>> {
    return cy.request({
      method: 'GET',
      url: `/users/${id}`,
    });
  }

  /**
   * Create a new user
   * @param user User data to create
   * @returns Created user
   */
  static create(user: CreateUserRequest): Cypress.Chainable<Cypress.Response<User>> {
    return cy.request({
      method: 'POST',
      url: '/users',
      body: user,
    });
  }

  /**
   * Update an existing user
   * @param id User ID to update
   * @param user User data for update
   * @returns Updated user
   */
  static update(id: number, user: UpdateUserRequest): Cypress.Chainable<Cypress.Response<User>> {
    return cy.request({
      method: 'PUT',
      url: `/users/${id}`,
      body: user,
    });
  }

  /**
   * Partially update an existing user
   * @param id User ID to patch
   * @param user Partial user data for update
   * @returns Updated user
   */
  static partialUpdate(id: number, user: Partial<User>): Cypress.Chainable<Cypress.Response<User>> {
    return cy.request({
      method: 'PATCH',
      url: `/users/${id}`,
      body: user,
    });
  }

  /**
   * Delete a user
   * @param id User ID to delete
   * @returns Empty response
   */
  static delete(id: number): Cypress.Chainable<Cypress.Response<{}>> {
    return cy.request({
      method: 'DELETE',
      url: `/users/${id}`,
    });
  }
}
