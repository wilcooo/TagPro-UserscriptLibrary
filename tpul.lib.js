// ==UserScript==
// @name         TagPro Userscript Library
// @description  Functions that any TagPro script could benefit from
// @author       Ko </u/Wilcooo> (https://greasyfork.org/users/152992)
// @version      1.0
// @license      MIT
// @include      *.koalabeast.com*
// @include      *.jukejuice.com*
// @include      *.newcompte.fr*
// @downloadURL  https://raw.githubusercontent.com/wilcooo/TagPro-UserscriptLibrary/master/tpul.lib.js
// @icon         https://raw.githubusercontent.com/wilcooo/TagPro-UserscriptLibrary/master/icon.png
// @supportURL   https://www.reddit.com/message/compose/?to=Wilcooo
// ==/UserScript==



// ==UserLibrary==
// @name         TagPro Userscript Library
// @description  Functions that any TagPro script could benefit from
// @version      1.0
// @license      MIT
// ==/UserLibrary==





/*
* To use this library, include the next line in your userscripts' metadata block:
*
* // @require      https://github.com/wilcooo/TagPro-UserscriptLibrary/raw/master/tpul.lib.js
*
*
* Add a settings button:
*
* tpul.settings.addButton( onclick, name, imageURL )
*
*     - This creates a button on the scoreboard (when in-game)
*         or on top of the page (on most of a TagPro servers' pages)
*
*     - 'onclick' will be called when the button gets clicked.
*         In most cases, you want to provide a function that opens your scripts' settings.
*
*     - The image will be scaled to 64×64, so it is optimal to use that size
*     - It is recommended to use an image related to your script,
*         instead of a general settings icon.
*
*     - You can use a normal image url, or a base64 encoded image.
*
*     - This function returns the newly created button (which you probably don't need)
*
*
*/



var tpul = (function(){





    // =====STYLE SECTION=====



    // Create our own stylesheet to define the styles in:

    var style = document.createElement('style');
    document.head.appendChild(style);
    var styleSheet = style.sheet;

    styleSheet.insertRule(` #tpul-settings {
width: 80%;
margin: auto;
text-align: center;
}`);

    styleSheet.insertRule(` .tpul-settings-btn {
position: relative;
width: 64px;
height: 64px;
padding: 10px;
margin: 20px;
background-size: contain !important;
background-origin: content-box !important;
background-repeat: no-repeat !important;
outline: none;
}`);

    styleSheet.insertRule(` .tpul-settings-btn:focus::after {
content: "";
position: absolute;
width: 100%;
height: 100%;
border: 2px solid Highlight;
top: 0;
left: 0;
}`);

    styleSheet.insertRule(` .tpul-settings-btn span {
position: absolute;
z-index: 1;
border-radius: 10px;
margin-top: 10px;
padding: 10px;
background: #0E8AE0;
border: 1px solid #095C96;
box-shadow: 0 3px #095C96;
font-size: small;
top: 100%;
left: 50%;
transform: translateX(-50%);
width: fit-content;
pointer-events: none;
opacity: 0;
transition: opacity .3s;
}`);


    styleSheet.insertRule(` .tpul-settings-btn span::after {
content: "";
position: absolute;
left: 50%;
bottom: 100%;
margin-left: -20px;
border-width: 20px;
border-style: solid;
border-color: transparent transparent #0E8AE0 transparent;
}`);

    styleSheet.insertRule(`.tpul-settings-btn:hover span, .tpul-settings-btn:focus span {
opacity: 1;
}`);



    // =====NOITCES ELYTS=====





    // =====DOM SECTION=====



    var tpulSettings = document.createElement('div');
    tpulSettings.id = 'tpul-settings';



    // =====NOITCES MOD=====





    // =====LOGIC SECTION=====



    var tpul = {

        settings: {
            addButton: function(onclick, name, imageURL=null, buttonText=name[0], tooltipText="Configure "+(name||'[unknown]') ){

                if (!tpulSettings) {
                    console.error('TPUL: Could not find a place to add the settings button for '+name);
                    return null;
                }

                var button = document.createElement('button');
                button.className = 'btn tpul-settings-btn';

                button.innerText = buttonText || '?';

                if (imageURL) {
                    if (imageURL.search(/^url\((.*)\)$/) == -1) imageURL = 'url("'+imageURL+'")';
                    button.style.backgroundImage = imageURL;
                    button.innerHTML = '&nbsp;';
                }

                var tooltip = document.createElement('span');
                tooltip.innerText = tooltipText;
                button.appendChild(tooltip);

                tpulSettings.appendChild(button);

                button.addEventListener('click',function(click){
                    button.blur();
                    onclick(click);
                });

                return button;
            },
            setParent: function(container=null) {

                container = container ||
                    document.getElementById('tpul-settings-container') || // Try to add it to a position pre-defined by another script (such as ModFather)
                    document.getElementById('userscript-top') || // Try to add it on top of any page on the server
                    document.getElementById('options'); // Try to add it to the scoreboard in-game

                if (container) {
                    container.appendChild(tpulSettings);
                    return tpulSettings;
                }

                console.error('Couldn\'t find a parent element.');
                return -1;
            },
            getElement: _ => tpulSettings,
        }
    };

    tpul.settings.setParent();

    try {
        window.tpul = tpul;
        unsafeWindow.tpul = tpul;
        unsafeWindow.tagpro.tpul = tpul;
    }catch(e){}

    return tpul;



    // =====NOITCES CIGOL=====

})();
