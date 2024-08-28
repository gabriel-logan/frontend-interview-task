# Tarefa Front-end Caveo

## Objetivo

Nesta tarefa, o candidato deverá inicializar um projeto utilizando NEXT.js e realizar um sistema de listagem de produtos e carrinho de compras.

## Requisitos

1. **Inicialização do Repositório**
   - Inicialize um projeto Next.js.
   - Utilize TypeScript.
   - Configure uma estrutura básica de arquivos para páginas, componentes e serviços. (domain -> api, service, types, adapter)
     
2. **Listagem de Produtos**
   - Crie uma página de listagem de produtos usando a [API Fake Store](https://fakestoreapi.com/docs), implementando a funcionalidade de paginação infinita para carregar mais produtos à medida que o usuário rola a página.
   - As requisições para listar os produtos devem ser feitas utilizando React Query.
   - Utilize Axios para realizar as requisições HTTP.

3. **Carrinho de Compras**
   - Implemente a funcionalidade de adicionar e remover produtos no carrinho.
   - Gerencie o estado do carrinho de compras utilizando Zustand.
   - O estado do carrinho deve ser persistido para que o usuário não perca os itens ao recarregar a página.

## Diferenciais

- Requisicao realizada via SSR.
- Testes e2e
- Layout responsivo
- Utilize a biblioteca Framer para adicionar animações em botões e outros elementos interativos na página.

## Referências

- [Documentação do React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Documentação do Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Documentação do Nextjs](https://nextjs.org/docs)
