Backend Server Setup and API Testing Guide
------------------------------------------

This guide will walk you through setting up and running a backend server built with Express and TypeScript. It includes instructions for installing dependencies, starting the server, and testing the API endpoints using tools like Postman.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

*   Node.js (with npm)
    
*   Git (optional, for cloning the repository)
    
*   Postman (optional, for testing the API)
    

### Getting Started

1.  Clone the backend server repository from GitHub:
  ```
  git clone https://github.com/your-username/stuneckt_backend.git
  ```
    
2. Install project dependencies using npm:
```
cd stuneckt_backend
npm install
```

3. Create a `.env` file at the root directory and paste the following -
```
PORT = your port (Eg - 3000)
MONGO_URL = "your mongoDB url"
JWT_SECRET = "your jwtSecret"
```

### Running the Server

To start the backend server, follow these steps:

1.  Write a script in the `package.json` file -
```
"scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc"
  },
```
    
3.  Run the server using Node.js:
```
npm run dev
```
This will start the server on **http://localhost:3000**

API Endpoint Documentation
--------------------------

### User Endpoints ( **/api/v1/user** )

#### 1\. User Signup

*   **Method:** POST
    
*   **Endpoint:** **`/api/v1/user/signup`**
    
*   **Description:** Register a new user.
    
*   **Middleware:** None
    
*   **Handler:** **userSignup**
    

#### 2\. User Signin

*   **Method:** POST
    
*   **Endpoint:** **`/api/v1/user/signin`**
    
*   **Description:** Authenticate user credentials.
    
*   **Middleware:** None
    
*   **Handler:** **userSignin**
    

#### 3\. Get All Users

*   **Method:** GET
    
*   **Endpoint:** **`/api/v1/user/all`**
    
*   **Description:** Retrieve all users.
    
*   **Middleware:** Requires authentication (**authMiddleware**)
      - Include headers in the request:
        ```
        headers: {
          Authorization: `Bearer ${your-token}`
        }
        ```
    
*   **Handler:** **allUsers**
    

#### 4\. Get User Profile

*   **Method:** GET
    
*   **Endpoint:** **`/api/v1/user/profile`**
    
*   **Description:** Get user profile details.
    
*   **Middleware:** Requires authentication (**authMiddleware**)
    
*   **Handler:** **userProfile**
    

#### 5\. Get User Followers

*   **Method:** GET
    
*   **Endpoint:** **`/api/v1/user/followers`**
    
*   **Description:** Get followers of the authenticated user.
    
*   **Middleware:** Requires authentication (**authMiddleware**)
    
*   **Handler:** **userFollowers**
    

#### 6\. Update User Profile

*   **Method:** PUT
    
*   **Endpoint:** **`/api/v1/user/updateProfile`**
    
*   **Description:** Update the authenticated user's profile.
    
*   **Middleware:** Requires authentication (**authMiddleware**)
    
*   **Handler:** **userUpdateProfile**
    

#### 7\. Follow Another User

*   **Method:** PUT
    
*   **Endpoint:** **`/api/v1/user/follow/:userId`**
    
*   **Description:** Follow another user by their ID.
    
*   **Middleware:** Requires authentication (**authMiddleware**)
    
*   **Handler:** **userFollowAnotheruser**
    

### Post Endpoints ( **/api/v1/post** )

#### 1\. Create Post

*   **Method:** POST
    
*   **Endpoint:** **`/api/v1/post/create`**
    
*   **Description:** Create a new post.
    
*   **Middleware:** Requires authentication (**authMiddleware**)
    
*   **Handler:** **createPost**
    

#### 2\. Get All Posts

*   **Method:** GET
    
*   **Endpoint:** **`/api/v1/post/all`**
    
*   **Description:** Retrieve all posts.
    
*   **Middleware:** None
    
*   **Handler:** **allPosts**
    

#### 3\. Get User's Posts

*   **Method:** GET
    
*   **Endpoint:** **`/api/v1/post/myPosts`**
    
*   **Description:** Retrieve posts by the authenticated user.
    
*   **Middleware:** Requires authentication (**authMiddleware**)
    
*   **Handler:** **PostsByUser**
    

### Testing the Endpoints

1.  Send a POST request to `/api/v1/user/signup` with JSON payload containing **username**, **password**, **firstName**, **lastName** and **about** in the request body.
    
2.  Send a POST request to `/api/v1/user/signin` with JSON payload containing **username** and **password** in the request body.
    
3.  Send a GET request to `/api/v1/user/all` with valid authentication token in the request headers.
    
4.  Send a GET request to `/api/v1/user/profile` with valid authentication token in the request headers.
    
5.  Send a GET request to `/api/v1/user/followers` with valid authentication token in the request headers.
    
6.  Send a PUT request to `/api/v1/user/updateProfile` with updated user data and valid authentication token in the request headers.
    
7.  Send a PUT request to `/api/v1/user/follow/:userId` (replace `:userId` with the actual user ID) with valid authentication token in the request headers.
    
8.  Send a POST request to `/api/v1/post/create` with JSON payload containing **image**, **title** and **content** in the request body and valid authentication token in the request headers.
    
9.  Send a GET request to `/api/v1/post/all` to retrieve all posts.
    
10.  Send a GET request to `/api/v1/post/myPosts` with valid authentication token in the request headers to retrieve posts by the authenticated user.
    
------------------------------------------

## You can also test this api endpoints here - [demo](https://stuneckt-frontend.vercel.app/)
