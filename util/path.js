const path = require('path');

//? Função que contém o caminho absoluto do ficheiro principal do nosso projeto, no nosso caso o index.js
module.exports = path.dirname(require.main.filename);