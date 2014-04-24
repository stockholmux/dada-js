var
  Absurd = require('../node_modules/absurd'),
  dada = require('../dada'),
  fs = require('fs');

Absurd(dada.assemblage([dada.grid])).compile(function(err, css) {
  if (err) {
    console.log(err);
  } else {
    console.log(css);
    fs.writeFileSync('just-grid.css',css)
  }
});