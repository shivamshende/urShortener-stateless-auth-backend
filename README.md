## Note -
Our deployed APIs vercel have an issue where only GET requests work in the browser, but not other POST requests. Also all APIs, including GET requests, are not functioning correctly in API testing platforms. You all also can be a part and work or give me suggestions to resolve this issue.

# About the Project

This project is a backend API built using Node.js and Express to provide URL shortening functionality and user authentication(stateless) feature. It uses MongoDB Atlas as the database for storing user information, URL history data.

Our live apis not working for some reasons. Watch demo video - https://youtu.be/vsd2YASdqzQ?si=ttXAKUOrkgCxsl7_

## Description

**URL shortener with user activity history and authentication**

This backend project aims to provide a robust and secure API for a URL shortening service with stateless authentication and user data management. Whether you are a beginner or an experienced developer, this repository serves as an educational resource for understanding backend development with Node.js and Express.

Explore the following key features covered in this project:     

- **User Registration and Authentication:** Learn how to register new users and authenticate existing users using JWT tokens for stateless authentication.               

- **URL Shortening and Redirection:** Implement URL shortening functionality to generate shortened URLs and redirect users to the original URLs.

- **User Data Management:** Manage URL history and user data, including usernames, passwords (hashed for security), and user roles, in MongoDB Atlas database.

- **URL Shorten and Visit History:** Track and manage Original and Shorten URL history and visit history of each user.

 ## Project Access

[Click here to visit an API](https://ur-shortener-stateless-auth-backend-23q70rmo6.vercel.app/)

[Demo](https://youtu.be/vsd2YASdqzQ?si=ttXAKUOrkgCxsl7_)

# Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory:

   ```bash
   cd <project-directory>

3. Install dependencies:

   ```bash
   npm install

4. Create .env file and set envirnment variables, eg:

    ```bash
    DB_CONNECTION_STRING=<your-mongodb-atlas-connection-string>
    JWT_SECRET=<your-jwt-secret>
    PORT=4000

5. Start server:

    ```bash
    npm start

# API Routes

- **/register:** POST - Register a new user.

- **/login:** POST - Log in an existeing user.

- **/isAuthenticated:** GET- Check if user is authenticated.

- **/logout:** POST - Logout a current user.

- **/shortenUrl:** POST - Shortening a URL.

- **/:shortenedUrl:** GET - Redirecting to original URL using shorten URL

- **/usersData:** GET - Get list of all registered users.

- **/userUrlsData:** GET - Get user/URL activity of current user.

# Skills

This project showcases the use of various technologies and skills, including:

- **Node.js:** Providing the runtime environment for the backend server.

- **Express.js:** Building the API endpoints and handling HTTP requests.

- **MongoDB:** Storing user and URL data in a NoSQL database.

- **Mongoose:** Interacting with the MongoDB database through object modeling.

- **Json Web Tokens (JWT):** Managing user authentication and authorization. 

- **bcrypt:** Hashing user passwords for secure storage.

- **npm:** Managing project dependencies and scripts using the Node Package Manager.

- **Git:** Version control and collaboration using Git for tracking changes and managing project history.

## Author / Contributors

This project is maintained by [Shivam Shende].

Contributions are Welcome! Feel free to make changes. You can create a pull request with your changes.

## Contact

For inquiries, suggestions, or collaboration opportunities, feel free to reach out to the author:

- **Name:** Shivam Shende
  - GitHub: https://github.com/shivamshende
  - Email: shivamshende200@gmail.com

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for the full license text.

### About the License

The MIT License is a permissive open-source license that allows you to freely use, modify, and distribute this software, subject to the conditions stated in the [LICENSE](LICENSE) file.

Thank you for adhering to the terms of the license!