# Document Management System (API)
[![Build Status](https://travis-ci.org/andela-efortune/documentManagementSystem.svg?branch=Feature%2FRoutes-Setup)](https://travis-ci.org/andela-efortune/documentManagementSystem)
[![Code Climate](https://codeclimate.com/github/andela-efortune/documentManagementSystem/badges/gpa.svg)](https://codeclimate.com/github/andela-efortune/documentManagementSystem)
[![Coverage Status](https://coveralls.io/repos/github/andela-efortune/documentManagementSystem/badge.svg?branch=Feature%2FRoutes-Setup)](https://coveralls.io/github/andela-efortune/documentManagementSystem?branch=Feature%2FRoutes-Setup)
[![Issue Count](https://codeclimate.com/github/andela-efortune/documentManagementSystem/badges/issue_count.svg)](https://codeclimate.com/github/andela-efortune/documentManagementSystem)

This is a system (API) that manages documents, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published. It is built with NodeJS, Express and Postgres

##### It employs ES6 syntaxes traspiled down to ES5 using Babel.

### Local Installation
* Clone the repo `git clone https://github.com/andela-efortune/documentManagementSystem.git`
* cd .. into the directory
* Run `npm start`
* Test using Postman

### Features
Below are some of the features of the API:

#### Authentication
It ensures a user is authenticated to consume some of the RESTful endpoints,
It uses JSON web token to accomplish this.
Here's how you can create a user using the users endpoint

#### Users
Make a post request `/api/users` with the valid user attributes which is the `username`, `email`, `password`,  `firtName` and  `lastName`.
It returns a token which allows you to consume the rest of the API

#### Roles
It allows the admin user create roles using the roles endpoint.

**Create Role**

 Make a post request to `/api/roles` with a unique and required `title` field
 it should return a success response if the role is created successfully.

**Get Role**

Make a Get request to `/api/roles` with the admin token set in the head, then it returns `200 Ok` response with all available roles in the body.

**Edit Role**

Make a put request to `/api/roles/:id`, with the admin token set in the head, and a unique value for the title field and it will return a `201 Created` response and the updated role in the body.

**Delete Role**

Make a delete request to `/api/roles/:id`, with the admin token set in the head, and it will return a `202` response and a Role deleted message in the body.


#### Types
It allows the admin user create roles using the roles endpoint.

**Create Type**

 Make a post request to `/api/types` with a valid token with a unique and required `title` field it should return a success response if the type is created successfully.

**Get Type**

Make a Get request to `/api/types` with a valid token set in the head, then it returns `200 Ok` response with all available types in the body.

**Edit Type**

Make a put request to `/api/types/:id`, with a valid token set in the head, and a unique value for the title field and it will return a `201 Created` response and the updated type in the body.

**Delete Type**

Make a delete request to `/api/types/:id`, with a valid token set in the head, and it will return a `202` response and a Type deleted message in the body.

#### Documents
It allows the admin user create roles using the roles endpoint.

**Create Document**

 Make a post request to `/api/documents` with a valid token with a unique `title` and `content` fields it should return a success response if the document is created successfully.

**Get Document**

Make a Get request to `/api/documents` with a valid token set in the head, then it returns `200 Ok` response with all available documents in the body.

**Edit Document**

Make a put request to `/api/documents/:id`, with a valid token set in the head, and a unique value for the title field and it will return a `201 Created` response and the updated document in the body.

**Delete Document**

Make a delete request to `/api/documents/:id`, with a valid token set in the head, and it will return a `202` response and a Document deleted message in the body.
