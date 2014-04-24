var
  Absurd = require('absurd'),
  extend = require('xtend'),
  color = require('onecolor'),
  elementEvaluator,
  testStyles,
  leftVar = 'html',
  pairToObj,
  dada = {},
  d;

dada.unit = function(unitString) {
  return function(value) {
    return value+unitString;
  };
};

function cssFunction(functionString) {
  return function() {
    return functionString+'('+ Array.prototype.slice.call(arguments, 0).join(', ')+')';
  };
}

dada.cssVocab = {
  absolute : 'absolute',
  auto : 'auto',
  baseline : 'baseline',
  block  : 'block',
  bold : 'bold',
  borderBox : 'border-box',
  bottom : 'bottom',
  both : 'both',
  button : 'button',
  center : 'center',
  collapse : 'collapse',
  contentBox : 'content-box',
  dotted : 'dotted',
  easeInOut : 'ease-in-out',
  fixed : 'fixed',
  hidden : 'hidden',
  important : '!important',
  inherit : 'inherit',
  initial : 'initial',
  flexStart : 'flex-start',
  flexEnd : 'flex-end',
  spaceBetween : 'space-between',
  spaceAround : 'space-around',
  stretch : 'stretch',
  inlineBlock : 'inline-block',
  italic : 'italic',
  left : 'left',
  light : 'light',
  none : 'none',
  normal : 'normal',
  pointer : 'pointer',
  relative : 'relative',
  right : 'right',
  sansSerif : 'sans-serif',
  solid : 'solid',
  table : 'table',
  textfield : 'textfield',
  top : 'top',
  transparent : 'transparent',
  unset : 'unset',
  reverse : 'reverse',
  alternate : 'alternate',
  alternateReverse : 'alternate-reverse',
  forwards : 'forwards',
  backwards : 'backwards',
  infinite : 'infinite',
  paused : 'paused',
  running : 'running',
  ease : 'ease',
  easeIn : 'ease-in',
  easeOut : 'ease-out',
  stepStart : 'step-start',
  stepEnd : 'step-end',
  cubicBezier : cssFunction('cubic-bezier'),
  steps : cssFunction('steps'),
  attr : cssFunction('attr'),
  visible : 'visible',
  repeat : 'repeat',
  noRepeat : 'noRepeat',
  repeatY : 'repeat-y',
  repeatX : 'repeat-x',
  space : 'space',
  round : 'round',
  scroll : 'scroll',
  local : 'local',
  paddingBox : 'padding-box',
  url : cssFunction('url'),
  contain : 'contain',
  blur : cssFunction('blur'),
  dashed : 'dashed',
  thick : 'thick',
  medium : 'medium',
  cssDouble : 'double',
  groove : 'groove',
  ridge : 'ridge',
  inset : 'inset',
  outset : 'outset',
  thin : 'thin',
  separate : 'separate',
  linearGradient : cssFunction('linear-gradient'),
  always : 'always',
  recto : 'recto',
  verso : 'verso',
  page : 'page',
  column : 'column',
  region : 'region',
  avoid : 'avoid',
  avoidPage : 'avoid-page',
  avoidColumn : 'avoid-column',
  avoidRegion : 'avoid-region',
  brightness : cssFunction('brightness'),
  calc : cssFunction('calc'),
  rect : cssFunction('rect'),
  balance : 'balance',
  noCloseQuote : 'no-close-quote',
  openQuote : 'open-quote',
  closeQuote : 'close-quote',
  noOpenQuote : 'no-open-quote',
  contrast : cssFunction('contrast'),
  cssDefault : 'default',
  contextMenu : 'context-menu',
  help : 'help',
  cssPointer : 'pointer',
  progress : 'progress',
  wait : 'wait',
  cell : 'cell',
  crosshair : 'crosshair',
  text : 'text',
  verticalText : 'vertical-text',
  alias : 'alias',
  copy  : 'copy',
  move : 'move',
  noDrop : 'no-drop',
  notAllowed : 'notAllowed',
  eResize : 'e-resize',
  nResize : 'n-resize',
  neResize : 'ne-resize',
  nwResize : 'nw-resize',
  sResize : 's-resize',
  seResize : 'se-resize',
  swResize : 'sw-resize',
  wResize : 'w-resize',
  ewResize : 'ew-resize',
  nsResize : 'ns-resize',
  neswResize : 'nesw-resize',
  nwseResize : 'nwse-resize',
  colResize : 'col-resize',
  rowResize : 'row-resize',
  allScroll : 'all-scroll',
  zoomIn : 'zoom-in',
  zoomOut : 'zoom-out',
  grab : 'grab',
  grabbing : 'grabbing',
  ltr : 'ltr',
  rtl : 'rtl',
  flex: 'flex',
  grid: 'grid',
  inline: 'inline',
  inlineFlex: 'inline-flex',
  inlineGrid: 'inline-grid',
  inlineTable: 'inline-table',
  listItem: 'list-item',
  runIn: 'run-in',
  tableCell: 'table-cell',
  tableColumn: 'table-column',
  tableColumnGroup: 'table-column-group',
  tableFooterGroup: 'table-footer-group',
  tableHeaderGroup: 'table-header-group',
  tableRow: 'table-row',
  tableRowGroup: 'table-row-group',
  dropShadow : cssFunction('dropShadow'),
  show : 'show',
  hide : 'hide',
  grayscale : cssFunction('grayscale'),
  row : 'row',
  rowReverse : 'row-reverse',
  columnReverse : 'column-reverse',
  nowrap : 'nowrap',
  wrap : 'wrap',
  wrapReverse : 'wrap-reverse',
  caption : 'caption',
  icon : 'icon',
  menu : 'menu',
  messageBox : 'message-box',
  smallCaption : 'smallCaption',
  statusBar : 'status-bar',
  serif : 'serif',
  cursive : 'cursive',
  fantasy : 'fantasy',
  xxSmall : 'xx-small',
  xSmall : 'x-small',
  smaller : 'smaller',
  small : 'small',
  large : 'large',
  xLarge : 'x-large',
  xxLarge : 'xx-large',
  larger : 'larger',
  condensed: 'condensed',
  expanded: 'expanded',
  extraCondensed: 'extra-condensed',
  extraExpanded: 'extra-expanded',
  semiCondensed: 'semi-condensed',
  semiExpanded: 'semi-expanded',
  ultraCondensed: 'ultra-condensed',
  ultraExpanded: 'ultra-expanded',
  smallCaps : 'small-caps',
  bolder : 'bolder',
  lighter : 'lighter',
  radialGradient : cssFunction('radial-gradient'),
  repeatingLinearGradient : cssFunction('repeating-linear-gradient'),
  available: 'available',
  complex: 'complex',
  fitContent: 'fit-content',
  maxContent: 'max-content',
  minContent: 'min-content',
  hueRotate : cssFunction('hue-rotate'),
  manual : 'manual',
  element : cssFunction('element'),
  crispEdges : 'crisp-edges',
  pixelated : 'pixelated',
  fromImage : 'from-image',
  active : 'active',
  inactive : 'inactive',
  disabled : 'disabled',
  invert : cssFunction('invert'),
  listStyleType : 'list-style-type',
  listStylePosition : 'list-style-position',
  listStyleImage : 'list-style-image',
  inside : 'inside',
  outside : 'outside',
  armenian: 'armenian',
  circle: 'circle',
  decimal: 'decimal',
  decimalLeadingZero: 'decimal-leading-zero',
  disc: 'disc',
  georgian: 'georgian',
  lowerAlpha: 'lower-alpha',
  lowerGreek: 'lower-greek',
  lowerLatin: 'lower-latin',
  lowerRoman: 'lower-roman',
  square: 'square',
  upperAlpha: 'upper-alpha',
  upperLatin: 'upper-latin',
  upperRoman: 'upper-roman',
  crop : 'crop',
  cross : 'cross',
  luminance : 'luminance',
  alpha : 'alpha',
  matrix : cssFunction('matrix'),
  matrix3d : cssFunction('matrix3d'),
  fillAvailable : 'fill-available',
  opacityFilter : cssFunction('opacity'), //special
  outlineColor : 'outline-color',
  outlineStyle : 'outline-style',
  outlineWidth : 'outline-width',
  breakWord : 'break-word',
  rotate : cssFunction('rotate'),
  rotate3d : cssFunction('rotate3d'),
  rotateX : cssFunction('rotateX'),
  rotateY : cssFunction('rotateY'),
  rotateZ : cssFunction('rotateZ'),
  fill: 'fill',
  painted: 'painted',
  stroke: 'stroke',
  visibleFill: 'visibleFill',
  visiblePainted: 'visiblePainted',
  visibleStroke: 'visibleStroke',
  sticky : 'sticky',
  cssStatic : 'static',
  repeatingRadialGradient : cssFunction('repeating-radial-gradient'),
  horizontal : 'horizontal',
  vertical : 'vertical',
  saturate : cssFunction('saturate'),
  scale : cssFunction('scale'),
  scaleX : cssFunction('scaleX'),
  scaleY : cssFunction('scaleY'),
  scaleZ : cssFunction('scaleZ'),
  scale3d : cssFunction('scale3d'),
  sepia : cssFunction('sepia'),
  skew : cssFunction('skew'),
  skewX : cssFunction('skewX'),
  skewY : cssFunction('skewY'),
  start : 'start',
  justify : 'justify',
  matchParent : 'match-parent',
  end : 'end',
  underline : 'underline',
  lineThrough : 'line-through',
  overline : 'overline',
  wavy : 'wavy',
  hanging : 'hanging',
  eachLine : 'each-line',
  clip : 'clip',
  ellipsis : 'ellipsis',
  optimizeSpeed : 'optimizeSpeed',
  geometricPrecision : 'geometricPrecision',
  optimizeLegibility : 'optimizeLegibility',
  uppercase : 'uppercase',
  lowercase : 'lowercase',
  fullWidth : 'full-width',
  under : 'under',
  flat : 'flat',
  preserve3d : 'preserve-3d',
  translate : cssFunction('translate'),
  translateX : cssFunction('translateX'),
  translateY : cssFunction('translateY'),
  translateZ : cssFunction('translateZ'),
  translate3d : cssFunction('translate3d'),
  embed : 'embed',
  isolate : 'isolate',
  bidiOverride : 'bidi-override',
  isolateOverride : 'isolate-override',
  plaintext : 'plaintext',
  sub: 'sub',
  cssSuper: 'super',
  textBottom: 'text-bottom',
  textTop: 'text-top',
  pre : 'pre',
  preWrap : 'pre-wrap',
  preLine : 'pre-line',
  breakAll : 'break-all',
  keepAll : 'keep-all',
  horizontalTb : 'horizontal-tb',
  rlTb : 'rl-tb',
  verticalLr : 'vertical-lr',
  verticalRl : 'vertical-rl',
  btRl : 'bt-rl',
  btLr : 'bt-lr',
  lrBt : 'lr-bt',
  rlBt : 'rl-bt'
};
d = dada.cssVocab;

dada.cssVocabExcluding = function() {
  var
    copyOfVocab = JSON.parse(JSON.stringify(dada.cssVocab));
  
  Array.prototype.slice.call(arguments, 0).forEach(function(anArgument) {
    delete copyOfVocab[anArgument];
  });

  return copyOfVocab;
};

function joiner(seperator) {
  return function() {
    return Array.prototype.slice.call(arguments, 0).join(seperator);
  };
}

function colorConvert(colorKey,conversionFunct) {
  return function() {
    return color(colorKey+'('+Array.prototype.slice.call(arguments, 0).join(',')+')')[conversionFunct]();
  };
}

/*color spaces*/
dada.hsl = colorConvert('hsl','css');
dada.hsla = colorConvert('hsla','cssa');
dada.hsv = colorConvert('hsv','css');
dada.hsva = colorConvert('hsva','cssa');
dada.cmyk = function(c,m,y,k) {
  return new color.CMYK(c/100,m/100,y/100,k/100).rgb().css();
};
dada.cmyka = function(c,m,y,k,a) {
  return new color.CMYK(c/100,m/100,y/100,k/100,a).rgb().cssa();
};
dada.rgb = function() {
  var
    preText = 'rgb';
    
  if (arguments.length === 4) {
    preText = 'rgba';
  }
  return preText+'('+Array.prototype.slice.call(arguments, 0).join(',')+')';
};
dada.rgba = dada.rgb;

/*utility funcitons*/
dada.shorthand = joiner(' ');

dada.select = {};
dada.select.allWith = joiner(',');
dada.select.followedBy = joiner('+');
dada.select.together = joiner('');

dada.merge = extend;

dada.theseTo = function(attributes, singleValue) {
  var
    outStyle = {};
    
  attributes.forEach(function(anAttribute) {
    outStyle[anAttribute] = singleValue;
  });
  
  return outStyle;
};


/*sugar for common selectors*/
/*candidate for expansion*/
dada.groups = {
  headings : 'h1,h2,h3,h4,h5,h6'
};



/* dada grid units */
/* based on PocketGrid 1.1.0
 * https://github.com/arnaudleray/pocketgrid
 */
dada.grid = [
  //Border-box-sizing
  [
    ['.block-group','.block'], {
      '-mw-box-sizing' : d.borderBox,
      '&:before, &:after' : {
        '-mw-box-sizing' : d.borderBox
      }
    }
  ],
  [
    '.block-group', {
      '*zoom': 1,
      '&:before, &:after' : {
        display   : d.table,
        content   : '',
        lineHeight: 0
      },
      '&:after' : {
        clear     : d.both
      },
      listStyleType : d.none,
      '&' : dada.theseTo(['margin','padding'],0),
      '& > .block-group' : {
        clear     : d.none,
        'float'   : d.left,
        margin    : '0 !important'
      }
    }
  ],
  [
    '.block', {
      'float': d.left,
      'width': '100%'
    }
  ]
];

dada.gridUnit = function(fraction) {
  return fraction*100 +'%';
};

dada.gridWidth = function(fraction) {
  return {  width   : dada.gridUnit(fraction) };
};

/* core */
pairToObj = function(inArray, api) {
  var
    outStyles = {};
  inArray.forEach(function(anElement){
    var
      selector = anElement[0];
    
    if (!outStyles[anElement[0]]) {
      outStyles[anElement[0]] = {};
    }
    
    anElement.slice(1).forEach(function(aRuleSet,index) {
      if (Array.isArray(aRuleSet)) {
        anElement[index+1] = pairToObj(aRuleSet);
      }
    });
    
    if (Array.isArray(selector)) {
      selector = selector.join(',');
    }
    
    outStyles[selector] = extend.apply(this,anElement.slice(1));
  });
  
  return outStyles;
};

dada.assemblage = function(inArray) {
  return function(api) {
    inArray.forEach(function(anElement) {
      if (Array.isArray(anElement)) {
        api.add(pairToObj(anElement, api));
      } else {
        api.add(anElement);
      }
    });
  };
};

module.exports = dada;