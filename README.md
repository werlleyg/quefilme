<h2 align="center">QUE FILME</h2>

<div align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/werlleyg/quefilme?color=9747FF">

  <a href="https://www.linkedin.com/in/werlleyg/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/developed%20by-Werlley Ponte-9747FF">
  </a>
  
  <a href="https://github.com/werlleyg/quefilme/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/werlleyg/quefilme?color=9747FF">
  </a>

  <a href="https://github.com/werlleyg/quefilme/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/werlleyg/quefilme?color=9747FF">
  </a>

  <a href="https://quefilme.vercel.app/" target="_blank">
    <img alt="GitHub website up/down" src="https://img.shields.io/website-up-down-green-red/https/quefilme.vercel.app/.svg">
  </a>
</div>
<br/>
<p align="center">
 <b>Que Filme</b> aims to find the best movie and series suggestions for the user based on their previous choice of favorite titles. 🎥 🍿 ✨
</p>
<br/>

## 🛠 Technologies

The tools below were used in the project's development:

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [@emotion](https://emotion.sh/docs/introduction)
- [React Icons](https://react-icons.github.io/react-icons)
- [@svgr](https://react-svgr.com/docs/webpack/)
- [Axios](https://axios-http.com/docs/intro)
- [G4F](https://www.npmjs.com/package/g4f)
- [Testing Library](https://testing-library.com/docs/react-testing-library/example-intro/)
- [Jest](https://jestjs.io/docs/next/testing-frameworks)

## ⚙ Installation

1. Clone and set up this repository [Que Filme](https://github.com/werlleyg/quefilme)
2. Run `npm i` or `yarn` in the project folder on your computer
3. Run `npm run dev` or `yarn dev`
4. Your project is already running 🔭

<br/>

## 🏗️ Infrastructure Diagram

The project is hosted at Vercel and is accessible by the user from any device with internet browsing. The project also uses integration with two service providers, one for movies and the other for AI.

<img src="docs/images/infrastructure-diagram.png" alt="Infrastructure Diagram" style="width: 100%; max-width: 650px">

## 🔗 Architecture Diagram

The project was built adapting clean arch concepts to the context of Next.js. It has its division into layers, which are below:

- **Domain:** Concentrates important information for business rules, such as entities, enums, errors, service, providers, protocols, and usecases contracts;

- **Infrastructure:** The implementation of service contracts, proviers and protocols is carried out;

- **Main:** In this layer, the factory pattern is carried out to instantiate the elements created in the infrastructure, in addition to aggregating project configurations such as environment variables and build settings;

- **Presentation + Pages:** Outermost layer of design, talking directly to the framework used, responsible for creating the components, typography and global stylizations. The Pages directory, responsible for concentrating the pages of the application, is separated by limitations of the framework itself in dealing with this resource. Consider Pages as part of Presentation.

<br/>

<img src="docs/images/architecture-diagram.png" alt="Architecture Diagram" style="width: 100%; max-width: 650px">

## 🚀 CI/CD Flow

<img src="docs/images/cicd-flow.png" alt="CICD Flow" style="width: 100%; max-width: 650px">

<br/>
<br/>

Developed by <a href="https://www.linkedin.com/in/werlleyg" target="_blank">Werlley Ponte</a>

---
