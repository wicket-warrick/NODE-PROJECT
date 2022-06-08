### Entities

  NAME	    PASSWORD	      EMAIL
  user1	    1234asdf	  user1@mail.com
  user2	    1234asdf	  user2@mail.com
  user3	    1234asdf	  user2@mail.com


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
