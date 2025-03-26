import { UsersClient } from './apiClients/usersClient';
import { PostsClient } from './apiClients/postsClient';
import { CreateUserRequest, UpdateUserRequest } from './interfaces/user.interface';
import { CreatePostRequest, UpdatePostRequest } from './interfaces/post.interface';

// Commands for users
Cypress.Commands.add('getUsers', () => {
  return UsersClient.getAll();
});

Cypress.Commands.add('getUserById', (id: number) => {
  return UsersClient.getById(id);
});

Cypress.Commands.add('createUser', (user: CreateUserRequest) => {
  return UsersClient.create(user);
});

Cypress.Commands.add('updateUser', (id: number, user: UpdateUserRequest) => {
  return UsersClient.update(id, user);
});

Cypress.Commands.add('partialUpdateUser', (id: number, user: UpdateUserRequest) => {
  return UsersClient.partialUpdate(id, user);
});

Cypress.Commands.add('deleteUser', (id: number) => {
  return UsersClient.delete(id);
});

// Commands for posts
Cypress.Commands.add('getPosts', () => {
  return PostsClient.getAll();
});

Cypress.Commands.add('getPostById', (id: number) => {
  return PostsClient.getById(id);
});

Cypress.Commands.add('getPostsByUserId', (userId: number) => {
  return PostsClient.getByUserId(userId);
});

Cypress.Commands.add('createPost', (post: CreatePostRequest) => {
  return PostsClient.create(post);
});

Cypress.Commands.add('updatePost', (id: number, post: UpdatePostRequest) => {
  return PostsClient.update(id, post);
});

Cypress.Commands.add('partialUpdatePost', (id: number, post: UpdatePostRequest) => {
  return PostsClient.partialUpdate(id, post);
});

Cypress.Commands.add('deletePost', (id: number) => {
  return PostsClient.delete(id);
});
