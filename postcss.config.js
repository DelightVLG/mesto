// const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    // autoprefixer,
    cssnano({ preset: 'default' }),
  ],
};

// Подключении плагина autoprefixer билд ломается с ошибкой true is not a PostCSS plugin
// код скопирован с тренажера, все остальное собирается
