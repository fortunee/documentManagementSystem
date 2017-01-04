# Document Management System (API)
[![Build Status](https://travis-ci.org/andela-efortune/documentManagementSystem.svg?branch=Feature%2FRoutes-Setup)](https://travis-ci.org/andela-efortune/documentManagementSystem)
[![Code Climate](https://codeclimate.com/github/andela-efortune/documentManagementSystem/badges/gpa.svg)](https://codeclimate.com/github/andela-efortune/documentManagementSystem)
[![Coverage Status](https://coveralls.io/repos/github/andela-efortune/documentManagementSystem/badge.svg?branch=Feature%2FRoutes-Setup)](https://coveralls.io/github/andela-efortune/documentManagementSystem?branch=Feature%2FRoutes-Setup)
[![Issue Count](https://codeclimate.com/github/andela-efortune/documentManagementSystem/badges/issue_count.svg)](https://codeclimate.com/github/andela-efortune/documentManagementSystem)

This is a system (API) that manages documents with types, users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published and can have a type set for it. It is built with NodeJS, Express and Postgres.  
_Source code employs ES6 syntax traspiled down to ES5 using [Babel](babel.io)._

### Features
Below are some of its features:

#### Authentication
It uses JWT for authentication.  
It generates a token and returns it to the user.  
It verifies the token on every request.  
It ensures a user is authenticated to access some routes.

#### Users
It allows users to be created.  
It sets a newly created user's role to `regular` by default.   
It allows only the created user to edit, update and delete its information.   
All users can be retrieved by the admin user.

#### Roles
It ensures that users have roles.   
It ensures users roles could be `admin` or `regular`.   
It ensures new roles can be created, updated and deleted by an admin user.   
It returns all roles to an admin user.

#### Documents
It allows new documents to be created by authenticated users.  
It ensures all documents have access roles defined.   
It ensures newly created documents have it's access role set to public by default.  
It allows admin users to retrieve all documents.  
It allows private and public access documents to be retrieved by its owners.  
It allows role access documents to be retrieved by users with the same role level as the documents owner.   
It ensures only authenticated users can delete, edit and update documents they own.   
It allows authenticated users to set a type for any document they own.   

#### Types
It allows documents to be defined based on types. Eg. Letter, Report etc.   
It allows authenticated users to add types to any document they create.   
It allows only authenticated users to create, delete and update types.   


### Installation
* Clone the project repository
* Run `git clone https://github.com/andela-efortune/documentManagementSystem.git`
* Change directory into the `documentManagementSystem` directory.
* Run `yarn install` to install the dependencies in the `package.json` file.
* Run `yarn run start` to start the project.
* Use [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) or any API testing tool of your choice to access the endpoints defined below.

### Usage

##### Users Endpoint

***To CREATE a user***   
Make a POST request to `/api/users` endpoint.  
Send data with valid `username`, `email`, `password`,  `firstName` and  `lastName` attributes.   
It returns a token and a few attributes of the created user.  

***To GET all users***  
Make a GET request to `/api/users`  
Set an admin user's token in the authorization headers.  
Use `set({ 'x-access-token': <token> })` or `set({ authorization: <token> })`

***To GET a user***   
Make a GET request to `/api/users/:username`   
Pass `username` of the user in the url parameters.
Set the user's token in the authorization headers.

***To UPDATE or DELETE a user***  
Make a PUT or DELETE request to `/api/users/:username`   
Pass `username` of the user in the url parameters.    
Set the user's token in the authorization headers.
Send a valid updated data on a PUT request.

##### Roles Endpoint

***To CREATE a role***   
Make a POST request to `/api/roles` endpoint.  
Set an admin user's token in the authorization headers.   
Send data with valid `title` attributes.    

***To GET all roles***  
Make a GET request to `/api/roles`  
Set an admin user's token in the authorization headers.  
Use `set({ 'x-access-token': <adminToken> })` or `set({ authorization: <adminToken> })`

***To GET a role***   
Make a GET request to `/api/roles/:id`  
Pass `id` of the role in the url parameters.  
Set the admin user's token in the authorization headers.

***To UPDATE or DELETE a role***  
Make a PUT or DELETE request to `/api/roles/:id`   
Pass `id` of the role in the url parameters.  
Set the admin user's token in the authorization headers.   
Send a valid updated data on a PUT request.

##### Documents Endpoint

***To CREATE a document***   
Make a POST request to `/api/documents` endpoint.  
Set a user's token in the authorization headers.   
Send data with valid `title` attributes.    

***To GET all documents***  
Make a GET request to `/api/documents`  
Set a user's token in the authorization headers.  
Use `set({ 'x-access-token': <token> })` or `set({ authorization: <token> })`

***To GET a document***   
Make a GET request to `/api/documents/:id`  
Pass `id` of the document in the url parameters.  
Set a user's token in the authorization headers.

***To UPDATE or DELETE a document***  
Make a PUT or DELETE request to `/api/documents/:id`   
Pass `id` of the document in the url parameters.  
Set a user's token in the authorization headers.   
Send a valid updated data on a PUT request.

##### Types Endpoint

***To CREATE a document type***   
Make a POST request to `/api/types` endpoint.  
Set a user's token in the authorization headers.   
Send data with valid `title` attributes.    

***To GET all types***  
Make a GET request to `/api/types`  
Set a user's token in the authorization headers.  
Use `set({ 'x-access-token': <adminToken> })` or `set({ authorization: <adminToken> })`

***To GET a type***   
Make a GET request to `/api/types/:id`  
Pass `id` of the type in the url parameters.  
Set a user's token in the authorization headers.

***To UPDATE or DELETE a type***  
Make a PUT or DELETE request to `/api/types/:id`   
Pass `id` of the type in the url parameters.  
Set a user's token in the authorization headers.   
Send a valid updated data on a PUT request.

###### Inspired by [TIA](https://andela.com/)

### Licence
* **ISC**

Copyright (c) 2017 Fortune Ikechukwu Ekeruo
