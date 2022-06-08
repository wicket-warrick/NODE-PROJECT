### Entities


| User  |     Email      | Password |
| :---: | :------------: | :------: |
| user1 | user1@mail.com | 1234asdf |
| user2 | user2@mail.com | 1234asdf |
| user3 | user3@mail.com | 1234asdf |

- User:
  - id
  - email
  - password
  - name
  - active
  - registrationCode
  - bio
  - created_at
- New:

  - id
  - user_id
  - title
  - description
  - subtitle
  - topic
  - createdAt
  - modifiedAt

- News_images:

  - id
  - new_id
  - url

- Users_images:

  - id
  - user_id
  - url

- News_votes:
  - id
  - user_id
  - new_id
