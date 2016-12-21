Write a test to ensure that a user has its RoleId set to 2 Automatically.
On line 80 of users.spec use the full error message, and expect a 409 status code for duplicate data
Test that all users are not returned to a non admin
Scrap line 214 to 225 as its irrelevant
Test that a user cannot be deleted by another user
line 63 of role.spec expect a 409 status code for a conflict date
Use a single space on line 109 and 110 of your roles.spec
Ensure regular users cannot get, update and delete roles.
Fix space issues in your seedHelper
Ensure all documents are returned to an admin using the number of documents that are in your db
Expect that an array to be returned on line 175 of docs.spec
line 238 to 247 should have an expect that a RoleId of a user whose document is returned is not actually null

Watchout for spaces in your entire codebase

line 108 commentted out code
