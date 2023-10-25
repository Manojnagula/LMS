# LMS Frontend

## setup instructions

1.Clone the project
....
...git clone https://github.com/Manojnagula/LMS.git

2.Move into the directory
....
....cd CLIENT

3.Instal dependencies
.....
......npm i

4.Run the server
.....
.....npm run dev


## How to setup Tailwind in your project
https://tailwindcss.com/docs/guides/vite

1.Instal tailwind and other dependencies
.....

....npm install -D tailwindcss postcss autoprefixer

2.Create 'tailwind.config.js' file
........

...... npx tailwindcss init -p

3.Edit config file content property as......

.......... content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]

4.Add these thing in your index.css file.....

..........@tailwind base;
@tailwind components;
@tailwind utilities;

5.Then rrun the server.....

.....npm run dev