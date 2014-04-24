//built from normalize.css
//
// https://github.com/necolas/normalize.css/
//


/*
  this is built from the (as of writing) current version of normalize.css and is intended as an example of a few possiblities using dada. It isn't very sane, and uses more parts of dada than are really needed, so a smaller version of normalize is suggested and excouraged!
*/
var
  dada = require('../dada'),
  styles,
  percent = dada.unit('%'),
  px = dada.unit('px'),
  em = dada.unit('em'),
  html5BlockTags = ['article','aside','details','figcaption','figure','footer','header','hgroup','main','nav','section','summary'],
  anchorStyles,
  displayBlock,
  supSubStyles,
  px40 = px(40), //stored for later
  titleAttribute = '[title]';
//bring in the css vocabulary to avoid quoting as much as possible.

with (dada.cssVocab) {
    //notice that block is magically okay - it is from dada.cssVocab
    displayBlock = { display : block };
    
    //we are going to define some thigns up here then add it in at a later point in the code with concat
    anchorStyles = [
      [
        'a' , { background : transparent }
      ],
      [
        'a:active, a:hover' , { outline : 0 }
      ]
    ];
    
    
    styles = [
      // we are going to use array pair notation instead of object
      [
        [ 'html', {
            //notice that sansSerif is magically okay - it is from dada.contstants();
            fontFamily: sansSerif,
            //here we are using a unit function to make it 100% - if you ever need to do math this is pretty handy
            msTextSizeAdjust: percent(100), 
            webkitTextSizeAdjust: percent(100) 
          }
        ],
        [
          //Left-hand can be manipulated by javascript
          html5BlockTags.join(','),
          //Right hand has a pre-defined above
          displayBlock
        ],
      ],
      //mixing 'vanilla' Absurd into the array
      {
        'audio,canvas,progress,video' : {
          display: inlineBlock,
          verticalAlign: baseline
        },
        'audio:not([controls])' :  {
          display: none,
          height: 0
        }
      }
    ];
    
    //pushing pattern
    styles.push(
      [
        [
          dada.select.allWith('[hidden]','template'), { display : none }
        ]
      ]
    );
    
    //defined above - wrapped in an array because the pattern is all styles -> style blocks -> rule blocks
    styles = styles.concat([anchorStyles]);
    
    styles.push(
      [
        //using the dada select together to produce 'abbr[title]' - be careful with this one though
        //tags won't work for obvious reasons
        [
          dada.select.together('abbr',titleAttribute),
          //expressing shorthand attributes with the shorthand() method
          { borderBottom : dada.shorthand(px(1), dotted)}
        ],
        [dada.select.allWith('b','strong') , { fontWeight : bold  } ],
        ['dfn', { fontStyle : italic }],
        ['h1',  { fontSize : em(2), margin : dada.shorthand(em(0.67), 0)}],
        ['mark',{ backgroundColor : '#ff0', color : '#000' }],
        ['small',
                { fontSize : percent(80) }],
        ['sub', supSubStyles = {
            fontSize : percent(75),
            lineHeight : 0,
            position: relative,
            verticalAlign : baseline
          }
        ],
        ['sup', dada.merge(supSubStyles, { top : em(-0.5) })],
        ['sub', { bottom : em(0.25) } ],
        ['img', { border : 0 }],
        ['svg:not(:root)',
                { overflow : hidden }],
        ['figure',
                { margin : dada.shorthand(em(1), px40)} ],
        ['hr',  { '-m-boxSizing' : contentBox, height : 0 }],
        ['pre', { overflow  : auto }],
        [
          dada.select.allWith('code','kbd','pre','samp'),
          {
            fontFamily  : dada.shorthand('monospace','monospace'),
            fontSize    : em(1)   
          }
        ],
        //forms
        [
          dada.select.allWith('button','input','optgroup','select','textarea'),
          {
            color : inherit,
            font  : inherit,
            margin  : 0
          }
        ],
        [
          'button, select', { textTransform : none }
        ],
        [
          dada.select.allWith('button','html input[type="button"]','input[type="reset"]' ,
    'input[type="submit"]'),
          {
            webkitAppearance: button,
            cursor: pointer,
          }
        ],
        [
          dada.select.allWith(
            'button::-moz-focus-inner',
            'input::-moz-focus-inner'
          ),
          //sets both border and padding to 0
          dada.theseTo(['border','padding'], 0)
        ],
        [
          'input[type="checkbox"],input[type="radio"]',
          {
            boxSizing : borderBox,
            padding   : 0
          }
        ],
        [
          'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button',
          {
            height: auto
          }
        ],
        [
          'input[type="search"]', {
            webkitAppearance  : textfield,
            '-mw-boxSizing' :  contentBox
          }
        ],
        [
          'fieldset', {
            border    : dada.shorthand(px(1), solid, '#c0c0c0'),
            margin    : dada.shorthand(0, px(2)),
            padding   : dada.shorthand(em(0.35), em(0.625), em(0.75))
          }
        ],
        [
          'legend', dada.theseTo(['border','padding'], 0)
        ],
        [
          'textarea', { overflow : auto }
        ],
        [
          'optgroup', { fontWeight: bold }
        ],
        [
          'table', {
            borderCollapse  : collapse,
            borderSpacing   : 0
          }
        ],
        [
          'td,th', {
            padding         : 0
          }
        ]
      ]
    );
}


module.exports = styles;