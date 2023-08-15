# desafio-rocketseat-node
Backend de uma aplicação em nodejs (CRUD), utilizando express, knex.js, bcrypt e nodemailer 

//Para testar o reset password:
1. npm install
2. crie um .env na raiz do projeto, nele terá:
EMAIL_USER='seuemaiL@gmail.com'
EMAIL_PASS='senha'
3. no terminal: 1. npm run dev, 2. npx knex migrate:latest (será criado um BD SQLITE e rodará todas as migrations)
4. entre no INSOMNIA, defina a rota para localhost:3000/users/forgotPassword e envie um json com um gmail já cadastrado bo BD
