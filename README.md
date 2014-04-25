# DadaJS

### Why?

I used AbsurdJS to build the CSS for a major project ([Higher Ed Careers Canada][1], if you are curious or you need a job at a college or university). It was great - the power of a preprocessed without having to learn and switch to another syntax.

However, AbsurdJS is pretty new and far from mainstream. I found myself struggling with a few yet unsolved issues:

  * **Syntax** rules of Javascript itself reduced the readability and power of my code.
  * **Organization** of my AbsurdJS code was a challenge. I found myself wanting to make code modular in ways that weren't elegant or easy.
  * **Quoting** values and _some_ properties became tiresome.
  * **Optically** it looked _too much_ like CSS. My brain kept on wanting to end declarations with semicolons.

In my mind, AbsurdJS didn't go far enough. I wanted it to be more Javascript and less like CSS.

###### Syntax

Key to one of the issues I had with the syntax of Javascript that caused issues is how object literals treat the _left-side_.


    var someSelectors = 'h1,h2,h3',
        myStyle = {
            someSelectors : { color : 'red' }
        };



If you evaluate this, you'll get a result that completely ignores the variable `someSelectors`. Instead of assigning `{ color : 'red' }` to `h1,h2,h3` it goes to `someSelectors` instead. We all know why this happens in Javascript from a language perspective, but, gosh darn it, I want to be able to define a group of selectors easily and elegantly.

Another example of the _left-side_ problem is non-evaluation. Anything in an object literal on the left side is not evaluated - you lack the ability to do anything to it. Here is a simple code style issue caused by the syntax:



    var worksButUgly = {
            '.lots .of-classes .in-super .long-selector, .maybe .you .want .it-in-multiple .lines' : {
                color : 'red'
            }
        },
        causesError = {
            '.lots .of-classes .in-super .long-selector,'+
            '.maybe .you .want .it-in-multiple .lines' : {
                color : 'red'
            }
        };




While long selectors aren't exactly a best practice, they happen sometimes. Putting everything into one line causes some real code readability issues and there isn't an elegant way to solve this.

###### Organization

Say you want to make your styles modular - it can get a bit clunky to mix things together. Dada provides an extra layer of modularity.

###### Quoting

Quoting, for me, was the worst part about defining styles in AbsurdJS. Left-side declarations are cleverly converted from camelCase, but on the right side it is all quoted string land. This become especially painful if you want to do math with values on the right side.



    var
        baselineSize = '24px';
        ugh = {
            h2 : {
                fontSize : baselineSize + '5px' // = 24px5px (not good)
            }
        }



Another issue:



    var
        myStyle = {
            h2 : {
                display : block //should be 'block'
            }
        }



Typing common values in quotes over and over is a pain. This can be solved somewhat by using atoms, but I found that was a game of constant look up and poor readability.

###### Optics

AbsurdJS reminds me of a computer I had as a child when compared to vanilla CSS - a [Tandy][2]. It was sold at Radio Shack and it was _almost_ 100% compatible with IBM standards. Which was great - until that _almost_ part came in. See, your mind was trained into thinking it would just work when you threw IBM PC software at it. And actually, it could do more than a standard IBM product. But when it didn't work because of the slight incompatibilities it was very frustrating.

To my eye, the object literal notation syntax is so optically close to CSS declaration blocks that it _causes_ errors. I can't tell you how many times I failed to escape a selector or used a semicolon instead of a comma.

### How?

###### Array Zero Selectors

DadaJS introduces _Array Zero Selectors_. This means that your zeroth element in an array passed to DadaJS is the selector. This solves the left-hand object literal issue - meaning we can preform operations and use variables in our selectors. Elements 1 to n are standard AbsurdJS declaration blocks and will be combined together from top down. Example:



    var someSelectors = 'h1,h2,h3',
        myStyle = [
            [
                [ someSelectors, { color : 'red' } ],
                [ someSelectors+',h4', { fontWeight : 800 } ]
            ]
        ];



You'll notice that moving from the object literal syntax to array zero, your styles are decidedly not CSS - your mind will be less likely to shift back into vanilla CSS mode.

If you pass an array into the zeroth element of the array, Dada will automatically join the array elements with a comma and treat them like individual selectors.

###### Unit-_izers_

To avoid having to convert numbers into strings, you can use `dada.unit` to create a function that returns the number value plus the unit. This makes math on numeric values elegant.



    var px  = dada.unit('px'),
        h2Size  = 24,
        myStyle = [
            [
                ['h2', { fontSize : px(24) }],
                ['h3', { fontSize : px(h2Size*0.9) }]
            ]
        ]




###### Inbuilt Vocabulary

Quoting the common right side values are a pain. By using `dada.cssVocab` in a `with` statement, you can bestow your styles with a big (but maybe not exhaustive) list of vocabulary. Also included are a number of CSS functions that pass their arguments in the correct format. Now, `with` statements [are often considered harmful][3], but in this limited circumstance, they add a lot of value. It is optional, so if you want to continue to use quotes throughout your styles, by all means.



    var myStyle;


    with (dada.cssVocab) {
        myStyle = [
            [
                ['h2', { display : block }] //look ma, no quotes
            ]
        ];
    }




`dada.cssVocab` adds about 300 new variables inside the with scope. Weigh the naming issue for your particular application. If you have some conflicts, you can use `dada.cssVocabExcluding('vocabToExclude1',...'vocabToExcludeN'_)` to specifically remove certain vocabulary in the with statement.

###### Talking Selectors

CSS selectors are pretty amazing, but they often land on the unreadable side for novice programmers. Dada provides a few 'talking' functions selectors.



    var
        myStyle = [
            [
                [
                    dada.select.allWith('h2','.profile-name','.profile-description'), // evaluates to h2, .profile-name, .profile-decription
                    {
                        color      :    'red'
                    }
                ]
            ]
        ];



###### Setting multiple values at one time

Sometimes you need to set multiple attributes to one value, this can be accomplished easily with `theseTo`



    var
        myStyle = [
            [
                [
                    dada.select.allWith('h1','h2','h3'),
                    dada.theseTo(['padding','margin'], 0)
                ]
            ]
        ];



###### Color Spaces

CSS 'ships' with one colors space - RGB (and the close alpha-enabled cousin, RGBA). Some browsers may expand that, but color is pretty important, so most of the time people stick with RGB. Hex values are quick to type but hard to "see". I had the need to add some others. _Note: these are converted to RGB as it passes to AbusrdJS, so it doesn't actually enable anything new. Also included is an RGB function to allow for quote-free usage._



    // these will all evaluate to 'rgb(221,68,68)'
    console.log(dada.rgb(221, 68, 68));
    console.log(dada.hsl(0, 69.2, 56.7)); //hue, saturation, lightness at 0, 69.2%, 56.7%
    console.log(dada.hsv(0, 69.2, 86.7)); //hue, saturation, value 0, 69.2%, 86.7%

    // these will all evaluate to 'rgba(221,68,68,0.5)'
    console.log(dada.rgba(221, 68, 68, 0.5));
    console.log(dada.hsla(0, 69.2, 56.7, 0.5));
    console.log(dada.hsva(0, 69.2, 86.7, 0.5));

    // CMKY and CMKYa represent a color gamut, so they will get as close as possible
    // in this case it should be the same color as above but evaluates as rgb(222,69,69) / rgba(222,69,69,0.5)
    console.log(dada.cmyk(0, 69, 69, 13));
    console.log(dada.cmyka(0,69,69,13,0.5));



###### Grid

Dada ships with a built in grid system based on [PocketGrid][4]. PocketGrid is very useful and minimal, I suggest you read up on the concepts behind it on the PocketGrid site. The HTML markup is identical.

The following DadaJS creates a minimal grid for a 2 unit sidebar and a 3 unit main area. Notice the two different styles - the `.nav` class we specify the width, and in the `.main` class we are letting Dada create the object. Do what ever is cleanest for your project.



    styles = [
        dada.grid, //this loads in dada.grid, based on PocketGrid
        [
            [   //specify the width in your styles
                '.nav', {
                   width        : dada.gridUnit(2/5)
                }
            ],
            [   // or just let dada put it into an object for you
                '.main', dada.gridWidth(3/5)    //this could have been { width : dada.gridUnit(3/5) }
            ]
        ]
    ];


  
##### Usage
Dada sits between your styles and Absurd. It is simple as using the `assemblage` method inside the attribute for Abusrd's compile.

    var
      Absurd = require('absurd'),
      dada = require('dada'),
      styles = [/*your styles*/];
    
    Absurd(dada.assemblage(styles)).compile(function(err, css) {
      if (err) {
        /// handle your error
      } else {
        // send or write your brand new CSS
      }
    });
    
[1]: http://higheredcareers.ca/
[2]: http://en.wikipedia.org/wiki/File:Sabu_with_his_Tandy_1000_Computer.jpg
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with
[4]: http://arnaudleray.github.io/pocketgrid/