var
  Absurd = require('../node_modules/absurd'),
  dada = require('../dada'),
  fs = require('fs'),
  //units
  em = dada.unit('em'),
  px = dada.unit('px'),
  golden,
  sel = {},
  setup = {},
  styles = {},
  baseTextColor = dada.rgb(68, 68, 102),
  lightTextAccent = '#99A',
  linkTextColor = '#FFCB2F',
  linkBackground = dada.rgba(68, 68, 102, 0.025);

with (dada.cssVocab) {
  //golden ratio function
  golden = function(x, iterations) {
    var i;
    for (i=0; i<=iterations; i += 1){
      x = x * (1+Math.sqrt(5))/2;
    }
    return x;
  };
  
  sel = {
    boldHeadings  : ['h1','h3','h5'],
    lightHeadings : ['h2','h4','h6'],
    bodyStructure : ['header','nav','section','footer']
  };
  
  sel.allHeadings = sel.boldHeadings.concat(sel.lightHeadings);
  
  setup.headings =   [
    [
      dada.select.allWith(sel.boldHeadings),
      {
        fontWeight : 800,
        paddingTop : em(0.5)
      }
    ],
    [
      dada.select.allWith(sel.lightHeadings),
      {
        fontWeight  : 200,
        color       : lightTextAccent,
        paddingTop  : 0
      }
    ],
    [
      dada.select.allWith(sel.boldHeadings[0], sel.lightHeadings[0]),
      {
        fontSize  : px(golden(10,3))
      }
    ],
    [
      dada.select.allWith(sel.boldHeadings[1], sel.lightHeadings[1]),
      {
        fontSize  : px(golden(10,2))
      }
    ],
    [
      dada.select.allWith(sel.boldHeadings[2], sel.lightHeadings[2]),
      {
        fontSize  : px(golden(10,1))
      }
    ],
    [
      sel.allHeadings,
      {
        fontFamily: dada.shorthand("'Cuprum'",'sans-serif'),
        margin  : 0
      }
    ]
  ];
  
  styles = [
    setup.headings,
    [
      [ ['body','html'], //zeroth as an array
        dada.theseTo(['padding','margin'], 0),
        { color : baseTextColor }
      ],
      [ 'p, ul, li', //zeroth as a string - it doesn't matter.
        {
          fontFamily      : dada.shorthand("'Merriweather'", serif)
        }
      ],
      [ 'a',
        {
          color           : linkTextColor,
          textDecoration  : none,
          padding         : px(2),
          backgroundColor : linkBackground
        }
      ],
      [ dada.select.allWith(sel.bodyStructure),
        {
          paddingLeft  : em(2),
          paddingRight : em(2)
        }
      ]
    ]
  ];
}


/* alternate way of invoking dada */
/*Absurd(function(api) {
  dada.absurdRegister(api);
  api.dada(styles);
}).compile(function(err, css) {
  if (err) {
    console.log(err);
  } else {
    console.log(css);
    fs.writeFileSync('realworld.css',css);
  }
});*/
Absurd(dada.assemblage(styles)).compile(function(err, css) {
  if (err) {
    console.log(err);
  } else {
    console.log(css);
    fs.writeFileSync('realworld.css',css);
  }
});
