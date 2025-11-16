# 👋 Welcome to My Portfolio Website

Thanks for checking out my website! If you'd like to create your own awesome site using my code as a starting point, follow the steps below to host a React app on GitHub Pages.

<small>If you want some live metrics go to https://roshanrajcmd.github.io/metrics (Under development)</small>


<small><em>This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).</em></small>

---

## 🚀 How to Host a React App on GitHub Pages

### 📦 1. Set Up Your React App

```bash
npx create-react-app my-app
cd my-app
```

> Replace `my-app` with your preferred project name.

---

### 🧑‍💻 2. Create a GitHub Repository

- Create a new GitHub repo named **`username.github.io`**
  > Replace `username` with your GitHub username
- Clone the repo or link it to your project directory using Git:

```bash
git init
git remote add origin https://github.com/username/username.github.io.git
```

---

### 📥 3. Install the `gh-pages` Package and more

Inside your project folder:

```bash
npm install --save gh-pages
├── @mlc-ai/web-llm@0.2.79
├── @tailwindcss/cli@4.1.7
├── @testing-library/dom@10.4.0
├── @testing-library/jest-dom@6.6.3
├── @testing-library/react@16.3.0
├── @testing-library/user-event@13.5.0
├── gh-pages@6.3.0
├── react-dom@19.1.0
├── react-icons@5.5.0
├── react-router-dom@7.6.3
├── react-scripts@5.0.1
├── react@19.1.0
├── tailwindcss@3.4.17
└── web-vitals@2.1.4
```

---

### 🛠️ 4. Update `package.json`

#### Add a `homepage` field:
```json
"homepage": "https://username.github.io"
```
I have used the default Jest configuration for testing that come along with the CRA setup. If you wish to have custom config change it accordingly in package.json.

#### Add deployment scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

---

### 💻 5. Develop Your Website

Run the development server:

```bash
npm start
```

- Opens at [http://localhost:3000](http://localhost:3000)
- Updates live as you make changes

---

### 🚀 6. Deploy to GitHub Pages

To publish your site:

```bash
npm run deploy
```

This:
- Builds your React app for production
- Pushes the contents from `build/` folder in your `main` branch to a branch called `gh-pages`

---

### ⚙️ 7. Configure GitHub Pages

In your GitHub repository:

1. Go to **Settings > Pages**
2. Set **Source** to `gh-pages` branch, `/ (root)`
3. Click **Save**

---

### 🌐 8. Visit Your Live Site

After a few moments, visit:

```
https://username.github.io
```

Congratulations, your React app is live!

---

## ❓ How Does This Work?

You might be wondering — how can React (a JavaScript framework) be hosted on GitHub Pages, which only supports static files?

### 🔍 Behind the Scenes

1. **React Development Files**: Your source code includes `.jsx`, Webpack config, and dependencies — which browsers can't read directly.

2. **Build Step**: `npm run build` converts everything into static HTML, CSS, and JS inside the `build/` folder.

3. **`gh-pages` Tool**: This tool:
   - Pushes the `build/` folder to a new branch `gh-pages` when you run `npm run deploy`.
   - GitHub Pages then serves your app from this branch

---

## 🤖 How Does the AI Works?

Traditionally, AI prompts from the frontend are processed by a backend logic that calls an API of one of the popular AI models, which is pre-trained. Implementing this often comes with the cost of maintaining a server or subscribing to use the LLM models' APIs and securely storing credentials as secrets.

I aim to have this portfolio public with free and open source solutions, so i used [WebLLM](https://webllm.mlc.ai/) who is making a new phase in the AI era with their solution to bake LLMs directly into the client side. My implementation pre-trains the AI model `Llama-3.1-8B-Instruct-q4f16_1-MLC` with my context in `src/data/portfolioAiContext.js` when initalized first-time in the client side.

  ### The good stuff
  - You dont have to create a account or sub to use the model
  - Computation overhead is on the client side
  - No Money 🤑

  ### The less good stuff
  - Computation overhead is on the client side (yep) so if the client machine is less capable to compure a model your portfolio experience will be bad
  - Heavy Cold start as the AI initialization happens fully in the client side.
  - Limited to use smaller "billion-parameter" models to ensur the model doesn't overwhelm or crash clients browser 😵‍💫

Other alternates you can check out is [HuggingFace](https://huggingface.co/) who can offer a huge varity of LLM you can implement.

---

## 🧠 Summary

```bash
npm start         # Starts your development server
npm run build     # Compiles the app to static files
npm run deploy    # Publishes to GitHub Pages
```

Your live site URL:

```
https://username.github.io
```

---

Happy coding! 🎉
