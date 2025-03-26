# JSONPlaceholder API Testing Framework

This project is a comprehensive API testing framework for the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) REST API.
It uses Cypress with TypeScript to provide a robust, type-safe testing environment.

## Last Run

![API Tests](https://github.com/EugeneUstymenko/jsonplaceholder-api-tests/workflows/API%20Tests/badge.svg)

Automated API tests for JSONPlaceholder using Cypress.

## Features

- **TypeScript Integration**: Full type safety for API responses and requests
- **API Client Pattern**: Reusable API clients for different endpoints
- **Custom Cypress Commands**: Simplified test writing with custom commands
- **Headless Execution**: Run tests in CI/CD environments without a browser
- **Comprehensive Test Coverage**: Tests for all CRUD operations

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EugeneUstymenko/jsonplaceholder-api-tests.git
   cd jsonplaceholder-api-tests
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running Tests

1. Run all API tests in headless mode:

   ```bash
   npm run test:api
   ```

## Code Quality Tools

This project uses several tools to ensure code quality:

1. Run ESLint to check code style

   ```bash
   npm run eslint
   ```

2. Run TypeScript type checking

   ```bash
   npm run typecheck
   ```

3. Format code with Prettier
   
   ```bash
   npm run prettier
   ```

## Project Structure

```
jsonplaceholder-api-tests/
├── .github/                          # GitHub-specific files
│   └── workflows/                    # GitHub Actions workflows
│       └── api-tests.yml             # API tests workflow configuration
│
├── cypress/
│   ├── api/                          # API Tests
│   │   ├── users.spec.ts             # Tests for users endpoint
│   │   └── posts.spec.ts             # Tests for posts endpoint
│   │
│   ├── fixtures/                     # Test Data
│   │   └── testData.json             # Test data for API tests
│   │
│   └── support/                      # Support Files
│       ├── api.ts                    # Main API support file
│       ├── commands.ts               # Custom Cypress commands
│       ├── index.d.ts                # TypeScript declarations
│       │
│       ├── apiClients/               # API Clients
│       │   ├── usersClient.ts        # Client for users endpoint
│       │   └── postsClient.ts        # Client for posts endpoint
│       │
│       └── interfaces/               # TypeScript Interfaces
│           ├── user.interface.ts     # User data interface
│           └── post.interface.ts     # Post data interface
│
├── .gitignore                        # Git ignore file
├── .prettierrc                       # Prettier configuration
├── .prettierignore                   # Prettier ignore file
├── cypress.config.ts                 # Cypress configuration
├── eslint.config.mjs                 # ESLint configuration
├── package.json                      # Project dependencies
├── package-lock.json                 # Locked dependencies
├── README.md                         # Project documentation
└── tsconfig.json                     # TypeScript configuration
```

## API Endpoints and Test Scenarios

### Users Endpoint

#### GET /users

- **Scenario 1**: Retrieve all users and verify response structure
  - Verify status code is 200
  - Verify response is an array
  - Verify user objects have the correct properties
  - Verify data types of user properties

#### GET /users/{id}

- **Scenario 1**: Retrieve a specific user by valid ID
  - Verify status code is 200
  - Verify user object has the correct ID
- **Scenario 2**: Attempt to retrieve a non-existent user
  - Verify status code is 404

#### POST /users

- **Scenario 1**: Create a new user with valid data
  - Verify status code is 201
  - Verify response contains the new user data
  - Verify ID is assigned to the new user

#### PUT /users/{id}

- **Scenario 1**: Update an existing user with complete data
  - Verify status code is 200
  - Verify all fields are updated correctly

#### PATCH /users/{id}

- **Scenario 1**: Partially update an existing user
  - Verify status code is 200
  - Verify only specified fields are updated

#### DELETE /users/{id}

- **Scenario 1**: Delete an existing user
  - Verify status code is 200
  - Verify response is an empty object

#### Specific Data Validation

- **Scenario 1**: Verify specific user data
  - Verify user with ID 1 has correct name, email, and other fields
  - Verify specific values match expected data

#### Pagination and Filtering Tests

- **Scenario 1**: Limit results with \_limit parameter
  - Verify status code is 200
  - Verify response contains exactly the specified number of items
- **Scenario 2**: Sort users by specified field
  - Verify status code is 200
  - Verify users are sorted correctly by the specified field

#### Response Headers Tests

- **Scenario 1**: Verify Content-Type header
  - Verify response includes correct Content-Type header with application/json

#### Performance Tests

- **Scenario 1**: Verify API response time
  - Verify API responds within acceptable time limit (less than 1 second)

#### Invalid Parameters Handling

- **Scenario 1**: Handle invalid ID parameter
  - Verify appropriate error status code when providing non-numeric ID
  - Verify API gracefully handles invalid input

### Posts Endpoint

#### GET /posts

- **Scenario 1**: Retrieve all posts and verify response structure
  - Verify status code is 200
  - Verify response is an array
  - Verify post objects have the correct properties
  - Verify data types of post properties

#### GET /posts/{id}

- **Scenario 1**: Retrieve a specific post by valid ID
  - Verify status code is 200
  - Verify post object has the correct ID
- **Scenario 2**: Attempt to retrieve a non-existent post
  - Verify status code is 404

#### GET /posts?userId={userId}

- **Scenario 1**: Retrieve posts for a specific user
  - Verify status code is 200
  - Verify all posts belong to the specified user
- **Scenario 2**: Retrieve posts for a user with no posts
  - Verify status code is 200
  - Verify response is an empty array

#### POST /posts

- **Scenario 1**: Create a new post with valid data
  - Verify status code is 201
  - Verify response contains the new post data
  - Verify ID is assigned to the new post

#### PUT /posts/{id}

- **Scenario 1**: Update an existing post with complete data
  - Verify status code is 200
  - Verify all fields are updated correctly

#### PATCH /posts/{id}

- **Scenario 1**: Partially update an existing post
  - Verify status code is 200
  - Verify only specified fields are updated

#### DELETE /posts/{id}

- **Scenario 1**: Delete an existing post
  - Verify status code is 200
  - Verify response is an empty object

#### Specific Data Validation

- **Scenario 1**: Verify specific post data
  - Verify post with ID 1 has correct title, body, and userId
  - Verify specific values match expected data

#### Pagination and Filtering Tests

- **Scenario 1**: Limit results with \_limit parameter
  - Verify status code is 200
  - Verify response contains exactly the specified number of items
- **Scenario 2**: Paginate results with \_page parameter
  - Verify status code is 200
  - Verify correct page of results is returned
- **Scenario 3**: Sort posts by specified field
  - Verify status code is 200
  - Verify posts are sorted correctly by the specified field
- **Scenario 4**: Filter posts by userId and apply sorting
  - Verify status code is 200
  - Verify all posts belong to the specified user
  - Verify posts are sorted correctly

#### Response Headers Tests

- **Scenario 1**: Verify Content-Type header
  - Verify response includes correct Content-Type header with application/json

## Edge Cases Covered

- Non-existent resources (404 responses)
- Empty result sets
- Data type validation
- Response structure validation
- Response headers validation
- Pagination with \_limit and \_page parameters
- Sorting with \_sort and \_order parameters
- Combined filtering and sorting
- Filtering by specific fields (userId)
- Partial updates with minimal data

## CI/CD Integration

This project includes GitHub Actions workflow for manual test execution.

### GitHub Actions Features:

- Manual test execution via GitHub Actions interface
- Test results visible in GitHub Actions logs

### Running Tests in GitHub:

1. Go to the "Actions" tab in the repository
2. Select "API Tests" workflow from the left sidebar
3. Click "Run workflow" dropdown on the right
4. Select the branch and click "Run workflow"
5. Wait for the workflow to complete and review results in the logs

See `.github/workflows/api-tests.yml` for configuration details.

## Resources & Acknowledgments

### Used Technologies

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the free REST API
- [Cypress](https://www.cypress.io/) for the excellent testing framework
- [TypeScript](https://www.typescriptlang.org/) for type safety

### Documentation

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Cypress Documentation](https://docs.cypress.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [JSONPlaceholder Guide](https://jsonplaceholder.typicode.com/guide/)
- [REST API Best Practices](https://restfulapi.net/)
