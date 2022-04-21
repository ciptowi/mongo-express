# Technology

- Express
- bcryptjs
- JSON webtoken
- MongoDB

Ini adalah apikasi REST API yang dibuat menggunakan Express JS dan
Mongo DB. menerapkan pengaman authentikasi dengan JSON web token untuk 3 model
role [ 'user', 'admin', 'moderator' ].

contact:
name: Cipto Widarto
email: ciptowidarto@gmail.com

# paths:

# get: "api/test/all":

# get: "api/test/user":

security: - x-access-token: []

# get: "api/test/admin":

security: - x-access-token: []

# get: "api/test/mod":

security: - x-access-token: []

# post: "api/auth/signup":

schema:
type: object
properties:
username:
type: string
email:
type: string
password:
type: string
roles:
type: array
example: - user - admin - moderator

# post: "api/auth/signin":

schema:
type: object
properties:
username:
type: string
password:
type: string
