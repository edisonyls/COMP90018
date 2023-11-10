# COMP90018 - Mobile Computing System Programming
## Assignment 2 - Let's Pet (Pet App)
<details>
<summary>Table of Contents</summary>

-   [About the Project](#about-the-project)
-   [Features Implemented](#features-implemented)
-   [Getting Started](#getting-started)
    -   [Backend Pre-requirements](#backend-pre-requirements)
    -   [Frontend Pre-requirements](#frontend-pre-requirements)
    -   [Database Setup](#database-setup)
    -   [STARTING THE APP](#starting-the-app)
-   [API Endpoints](#api-endpoints)
-   [TechStack](#techstack)
 

</details>

### About the Project
TO BE UPDATED
Brief Introduction on Why Should We Implement This App?

### Features Implemented
:gem: Authentication
- Secure sign-in and registration process.
- Email verification required for new registrations.

:gem: Home Screen
- Posts filtration by categories: All, Missing, Found, General.
- Browse through posts made by the community.

:gem: Map Screen
- GPS-based real-time user location tracking.
- Gyroscope integration for direction detection.
- Map visualization of posts, filterable by categories.
- Direct access to post details.

:gem: Notifications
- Near real-time update notifications for:
  - Comments on your posts.
  - New messages.
  - New followers or unfollowers.
- View and manage follower connections and profile access.

:gem: Chatting
- In-app messaging functionality for user communication.

:gem: Profile
- Personal post gallery.
- Editable user profile for personal information management.

:gem: Interaction with Posts
- View, comment, and engage with other users' posts.

:gem: Post Creation
- Interface for publishing new posts to the community.

:gem:  Create Different New Post

:gem: Sensors Implemented
- GPS
- Gyroscope
- Camera

### Getting Started
TO BE UPDATED

#### Database Setup
If you opt to use a cloud-based database, you do not need to configure a database locally. If you wish to use a local MySQL instance, please use version 5.7. Before running the project, you will need to create a local database table named 'mobile' and execute the SQL file 'mobile_sql.sql' located in the root directory of the project. Modify the 'application.yml' file found in the 'resources' folder of the 'backend-controller' subproject, where the default username and password are both set to 'root'. If yours are different, please update them accordingly.

#### Backend Pre-requirements
For local running of Java backend, please use JDK version 1.8. Ensure that Maven dependencies are correctly loaded, then run the `main` method of the `Application` class under the `backend-controller` subproject. By default, the application uses cloud-based MySQL, MongoDB, Redis, and MinIO. If you wish to use a local MySQL, please use version 5.7. Before running the project, you need to create a local database table named 'mobile' and execute the SQL file `mobile_sql.sql` located in the project's root directory. Modify the `application.yml` file in the `resources` folder under the `backend-controller` subproject; the default username and password are both 'root'. If different, please make the necessary adjustments. For other middleware, if you wish to use local options, modify the corresponding sections in the yml file.

#### Frontend Pre-requirements
TO BE UPDATED

#### STARTING THE APP
TO BE UPDATED

### API Endpoints
Note: You will need to make the backend running before accessing the following content.

Detailed API documentation can be found [here](http://localhost:8080/doc.html). It might appear as a Chinese version but you can simply click the language switcher on the top right corner to switch to English.
  
### TechStack
Our project is constructed using a contemporary Java technology stack, aimed at delivering an efficient and secure web application platform. It is grounded in the Spring Boot framework, utilizing Spring MVC's design patterns for processing user requests, and MyBatis for the data access layer, ensuring developmental efficiency and flexibility. Moreover, the project ingeniously employs Redis for data caching to optimize performance for frequent queries, particularly enhancing response times for social features such as follower interactions and likes.

- Key features include:

    - Email Verification Code: Harnessing Spring Boot's mail service, the project generates and dispatches verification codes to users' emails, adding a layer of security for user authentication.

    - Security Encryption: Integration with Spring Security safeguards password integrity during storage and transmission, employing advanced encryption algorithms to prevent unauthorized access.

    - Data Caching Optimization: Redis is utilized for efficient recording and storage of social interaction data, significantly speeding up data retrieval and enhancing user experience.

    - Cloud Storage Integration: With MinIO, the project offers a reliable cloud-based image storage solution, ensuring secure and convenient upload, storage, and retrieval of user image data.

    - Data Storage and Management: MySQL database is used to store essential user and post information, ensuring transactional reliability. Concurrently, MongoDB manages message data, securing flexibility, scalability, and optimized storage efficiency for unstructured data.

Overall, this backend project amalgamates several best practices and modern technologies. It ensures not just the performance and security of the application but also guarantees scalability and maintainability, providing a robust foundation for building large-scale applications.
