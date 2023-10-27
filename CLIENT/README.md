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

### Adding plugins and dependencies.......

.......... npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp

#### Adding auto import sort for eslint

1.Install the plugin.....

.....npm install eslint-plugin-simple-import-sort
# then only eslint start detecting plugins.

2.Update plugins in eslint file.....

......  plugins: ['react-refresh', 'simple-import-sort'],


# rules to specify what is an error and what is not.

3.Update rules in eslint file......

.........rules: {
    'simple-import-sort/imports':'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ]}


4.Change settings in VScode : open settings.json in VScode and ad follwing snippet in the json file.......

...... "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }

5.Add daysyui plugin to tailwind.config file...........

.......  plugins: [require("daisyui")].