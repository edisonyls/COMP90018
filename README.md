# COMP90018 - Mobile Computing System Programming
## Assignment 2 - Let's Pet (Pet App)
### Basic Features 
:gem: Basic Authentication

- Sign In
- Register

:gem: Home Page

- You can categorize the post by All, Missing, Found and General
- You can see posts from other users
- You can search posts by keywords

:gem: Map

- You can see the locations of posts from other users
- You can filter the locations based on the categories

:gem:  My Account

- You can see personal information
- You can see your pets registered
- You can see other posts that you liked/collected previously
- You can edit your personal information
- You can change your password and email for you registered account

:gem:  Posts from Other Users

- You can see posts from other users
- You can react on the posts, such as :thumbsup: :heart: :100: and etc.

:gem:  Create New Post
- You can post new post

:gem: Other Features

- Real time message
- Convert speech to text

### Project Structure
**Frontend Structure**

To Be Updated

**Backend Structure**

To Be Updated

### API Endpoints
- GET - BASE_URL/users/:userId 
    - endpoint to get the current user information
    - accepts currentUserId and selectedUserId
    - return information of the provided user based on the userId
- POST - BASE_URL/friend-request 
    - endpoint to send a friend request to a user
- GET - BASE_URL/friend-request/:userId
    - endpoint to show all the friend-requests of a particular user
    - accepts the current logged in userId
    - return all the friend requests of the provided userId
- POST - BASE_URL/friend-request/accept 
    - endpoint to accept a friend-request of a particular person
    - accepts senderId and recepientId
- GET - BASE_URL/accepted-friends/:userId 
    - endpoint to access all the friends of the logged in user!
    - accepts the current logged in userId
    - retrieve and return a list of friends for a given user based on their user ID. 
- POST - BASE_URL/messages
    - endpoint to post Messages and store it in the backend
    - accepts senderId, recepientId, messageType, messageText
    - create a new Message schema and store it in the back end
- GET - BASE_URL/messages/:senderId/:recepientId    
    - endpoint to fetch the messages between two users
    - accepts senderId and recepientId
    - return a list of message associated between two users
- POST - BASE_URL/deleteMessage
    - endpoint to delete the messages
- GET - BASE_URL/friend-requests/sent/:userId 
    - endpoint to fetch all the friend requests sent by the logged in user
    - a user wants to see whom they've sent friend requests to that haven't yet been accepted.
- GET - BASE_URL/friends/:userId 
    - endpoint to fetch all the friends of the logged in user
    - returns a list of friend IDs associated with a given user based on their user ID. 

TODO: Need a multer for handling file uploads

### Schema
- MessageSchema
    - senderId: ObjectId
    - recepientId: ObjectId
    - messageType: String
    - message: String
    - timeStamp: Date, default: Date.now,

- UserSchema
    - userName: String
    - emailAddress: String
    - password: String
    - posts: [PostSchema]
    - friends: [UserSchema]
    - friendRequests: [UserId]
    - friends: [UserId]
    - sendFriendRequests: [UserId]

- PostSchema: TO BE UPDATED
  
### TechStack
Our project is constructed using a contemporary Java technology stack, aimed at delivering an efficient and secure web application platform. It is grounded in the Spring Boot framework, utilizing Spring MVC's design patterns for processing user requests, and MyBatis for the data access layer, ensuring developmental efficiency and flexibility. Moreover, the project ingeniously employs Redis for data caching to optimize performance for frequent queries, particularly enhancing response times for social features such as follower interactions and likes.

- Key features include:

    - Email Verification Code: Harnessing Spring Boot's mail service, the project generates and dispatches verification codes to users' emails, adding a layer of security for user authentication.

    - Security Encryption: Integration with Spring Security safeguards password integrity during storage and transmission, employing advanced encryption algorithms to prevent unauthorized access.

    - Data Caching Optimization: Redis is utilized for efficient recording and storage of social interaction data, significantly speeding up data retrieval and enhancing user experience.

    - Cloud Storage Integration: With MinIO, the project offers a reliable cloud-based image storage solution, ensuring secure and convenient upload, storage, and retrieval of user image data.

    - Data Storage and Management: MySQL database is used to store essential user and post information, ensuring transactional reliability. Concurrently, MongoDB manages message data, securing flexibility, scalability, and optimized storage efficiency for unstructured data.

Overall, this backend project amalgamates several best practices and modern technologies. It ensures not just the performance and security of the application but also guarantees scalability and maintainability, providing a robust foundation for building large-scale applications.
