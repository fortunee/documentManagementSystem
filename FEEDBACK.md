### Feeback From Project Defense.

- Write a test to ensure that a user has its RoleId set to 2 Automatically.

- On line 80 of users.spec use the full error message, and expect a 409 status code for duplicate data.
- Test that all users are not returned to a non admin.

- Scrap line 226 to 237 of users spec as its irrelevant.

- Test that a user cannot be deleted by a different user.

- Expect a 409 status code for a conflict or duplicate data.

- Use a single space on line 109 and 110 of your roles.spec.

- Ensure regular users cannot get, update and delete roles.

- Expect an array to be returned on line 175 of docs.spec.

- Watchout for double line spacing in your entire codebase.

- Line 108 of UsersCtrl has a commentted out code

- Line 238 to 247 of document spec should expect that a document's Owner has RoleId which is not equal to null.
