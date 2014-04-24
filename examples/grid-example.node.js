var
  Absurd = require('../node_modules/absurd'),
  dada = require('../dada'),
  fs = require('fs'),
  rgb = dada.rgb,
  px = dada.unit('px'),
  styles;

with (dada.cssVocabExcluding('absolute')) {
  styles = [
    dada.grid, //this loads in dada.grid, based on PocketGrid
    [
        [   //specify the width in your styles
            '.nav', {
               width        : dada.gridUnit(2/5)
            }
        ],
        [   // or just let dada put it into an object for you
            '.main', dada.gridWidth(3/5)    //this could have been { width        : dada.gridUnit(3/5) }
        ],
        //just some decoration to see what is going on
        [
            '.block', {
                color       : rgb(100,100,100),
                backgroundColor : rgb(200,200,200),
                textAlign   : center,
                border      : dada.shorthand(px(1), solid, rgb(150,150,150)),
                padding     : dada.shorthand(px(5), 0)
            }
        ]
    ]
  ];
};

Absurd(dada.assemblage(styles)).compile(function(err, css) {
  if (err) {
    console.log(err);
  } else {
    console.log(css);
    fs.writeFileSync('grid-example.css',css)
   
  }
});