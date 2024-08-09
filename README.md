Setup:
- Setar as variaveis de ambiente
- Rodar o comando para inicializar o banco de dados: npx prisma migrate deploy
- Em um terminal, subir o docker responsavel pelo banco de dados: docker compose up
- Em outro terminal, subir a aplicação: npm run dev


Regras:
- Para se criar uma org, deve se ter um usuario criado (/user/create) e deve estar logado (/user/login)