### Entities

<<<<<<< HEAD
| User  |     Email      | Password |
| :---: | :------------: | :------: |
| user1 | user1@mail.com | 1234asdf |
| user2 | user2@mail.com | 1234asdf |
| user3 | user3@mail.com | 1234asdf |
=======
  NAME	    PASSWORD	      EMAIL
  user1	    1234asdf	  user1@mail.com
  user2	    1234asdf	  user2@mail.com
  user3	    1234asdf	  user2@mail.com

>>>>>>> c655b16612571cdd579bfd7546e266d12e13f280

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
