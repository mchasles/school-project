# Exercice 1

[Détails de l'exercice 1](./exercise-1.md)

# Exercice 2

Node v10.16 et Yarn v1.13 requis.

Dans le répertoire du projet, lancez la commande `yarn` pour installer les dépendances du projet.

## Commandes disponibles

### `yarn start:mock`

Démarre l'application en mode développement.

Ouvrez [http://localhost:3000](http://localhost:3000) pour utiliser l'application.

Un serveur pour simuler l'API REST est démarré sur le port 3004 [http://localhost:3004/students](http://localhost:3004/students)

### `yarn test`

Lance les tests unitaires en mode intéractif.

## Create React App

Cette application utilise [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Plus de détails sur cet outil et les commandes disponibles [ici](./README_CRA.md)

## Stack technique

- React v16
- Material-UI
- Redux

## Pistes d'amélioration techniques

- utiliser Redux Saga
- plus de tests unitaires (etudier l'utilisation de [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- test fonctionnels ([Cypress](https://cypress.io) ou [Cucumber](https://cucumber.io))
