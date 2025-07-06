# 👋 Welcome to My Portfolio Website

Thanks for checking out my website! If you'd like to create your own awesome site using my code as a starting point, follow the steps below to host a React app on GitHub Pages.

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

### 📥 3. Install the `gh-pages` Package

Inside your project folder:

```bash
npm install --save gh-pages
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

## 🔁 Future Updates

To make changes to your site:

1. Modify your React code
2. Run:

```bash
npm run deploy
```

And your live site will be updated!

---

## 🧠 Summary

```bash
npm run build     # Compiles the app to static files
npm run deploy    # Publishes to GitHub Pages
```

Your live site URL:

```
https://username.github.io
```

Note: If you want some live metrics go to https://roshanrajcmd.github.io/metrics
---

Happy coding! 🎉
