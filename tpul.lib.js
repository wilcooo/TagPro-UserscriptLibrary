// ==UserScript==
// @name         TagPro Userscript Library
// @description  Functions that any TagPro script could benefit from
// @author       Ko </u/Wilcooo> (https://greasyfork.org/users/152992)
// @version      1.1
// @license      MIT
// @include      *.koalabeast.com*
// @include      *.jukejuice.com*
// @include      *.newcompte.fr*
// @downloadURL  https://raw.githubusercontent.com/wilcooo/TagPro-UserscriptLibrary/master/tpul.lib.js
// @icon         https://raw.githubusercontent.com/wilcooo/TagPro-UserscriptLibrary/master/icon.png
// @supportURL   https://www.reddit.com/message/compose/?to=Wilcooo
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==



// ==UserLibrary==
// @name         TagPro Userscript Library
// @description  Functions that any TagPro script could benefit from
// @version      1.0
// @license      MIT
// ==/UserLibrary==





/*
*
* To use this library, include these lines in your userscripts' metadata block:

// @require      https://github.com/wilcooo/TagPro-UserscriptLibrary/raw/master/tpul.lib.js
// @grant        GM_setValue
// @grant        GM_getValue

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

    // THE SETTINGS MENU BUTTONS

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
width: max-content;
min-width: 64px;
max-width: 128px;
overflow-wrap: break-word;
word-wrap: break-word;
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



    // THE SETTINGS PANEL

    styleSheet.insertRule(` .tpul-settings-frame {
position: fixed;
z-index: 1;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgba(0,0,0,0.4);

transition: opacity .5s;
opacity: 0;
pointer-events: none;
}`);

    styleSheet.insertRule(`.tpul-settings-shown .tpul-settings-frame {
opacity: 1;
pointer-events: auto;
}`);

    styleSheet.insertRule(` .tpul-settings-frame > div {
margin: 10%;
margin-top: 0;
position: relative;
padding: 20px;
border: 1px solid #888;

transition: top .5s;
top: 100%;
}`);

    styleSheet.insertRule(`.tpul-settings-shown .tpul-settings-frame        > div { top: 50%; }`);
    styleSheet.insertRule(`.tpul-settings-shown .tpul-settings-frame.ingame > div { top: 80%; }`);

    // Stop the body from scrolling when the settings panel is shown
    styleSheet.insertRule(`body.tpul-settings-shown {
overflow:hidden !important;
}`);



    // =====NOITCES ELYTS=====





    // =====DOM SECTION=====



    var SettingsMenu = document.createElement('div');
    SettingsMenu.id = 'tpul-settings-menu';

    var SettingsFrame = document.createElement('div');
    SettingsFrame.className = 'tpul-settings-frame';
    if(location.port) SettingsFrame.classList.add('in-game');
    document.body.appendChild(SettingsFrame);

    // =====NOITCES MOD=====





    // =====LOGIC SECTION=====



    var GM_storage = Boolean(GM_setValue && GM_getValue),
        all_settings = [],
        last_opened = null;

    if (!GM_storage) console.error("TPUL: Please @grant GM_setValue and GM_getValue in your userscripts metadata!");

    var tpul = {

        settings: {
            addSettings: function({id, title, fields, imageURL, tooltipText, buttonText}) {

                if (!GM_storage && !id) throw "TPUL: Please @grant GM_setValue and GM_getValue in your userscripts metadata!";
                else if (!GM_storage) console.error("TPUL: Please @grant GM_setValue and GM_getValue in your userscripts metadata!");

                var config = arguments[0];

                if (arguments.length != 1 || typeof config != 'object')
                    throw Error("addSettings() takes one object ass an argument! Example: addSettings( {id:'MySettings', title:'Hello World'} )");

                // Create a new GM_config instance
                var settings = new GM_configStruct({

                    frame: SettingsFrame,

                    ...config,

                    id: String(config.id) || 'defaultId',

                    events: {
                        ...(config.events||{}),

                        open: function(){

                            //Remove the default inline style of the GM_config frame
                            this.frame.setAttribute('style', '');

                            //Close all other settings (of other scripts)
                            for (var other of all_settings) if(other != this) other.close();

                            //Open the settings on our way (animated, blocking scroll of body etc.)
                            this.frame.style.display = '';
                            document.body.classList.add('tpul-settings-shown')

                            last_opened = this;

                            if (this.config.events && typeof this.config.events.open == "function")
                                this.config.events.open.call(this,...arguments);
                        },

                        close: function(){
                            if(this.isOpen)//TODO: Check whether unsaved?

                            //close the settings in our way (animated)
                            this.frame.style.display = '';
                            document.body.classList.remove('tpul-settings-shown')

                            if (this.config.events && typeof this.config.events.close == "function")
                                this.config.events.close.call(this,...arguments);
                        },
                    }
                });

                // Remove all other default styles of GM_config
                delete settings.css.basic;

                // Create a button using the function below
                var button = tpul.settings.addButton({
                    onclick: ()=>settings.open(),
                    imageURL: imageURL,
                    tooltipText: tooltipText,
                    buttonText: buttonText,
                });

                settings.button = button;
                settings.config = config;

                all_settings.push(settings);

                if(!last_opened) last_opened = settings;

                return settings;

            },
            addButton: function({onclick, imageURL, tooltipText, buttonText}) {

                if (!SettingsMenu) {
                    console.error('TPUL: Could not find a place to add the settings button for '+name);
                    return null;
                }

                var button = document.createElement('button');
                button.className = 'btn tpul-settings-btn';

                if (imageURL) {
                    if (imageURL.search(/^url\((.*)\)$/) == -1) imageURL = 'url("'+imageURL+'")';
                    button.style.backgroundImage = imageURL;
                    button.innerHTML = '&nbsp;';
                } else button.innerText = buttonText || '?';

                var tooltip = document.createElement('span');
                tooltip.innerText = tooltipText || "Configure this script's settings" ;
                button.appendChild(tooltip);

                SettingsMenu.appendChild(button);

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
                    container.appendChild(SettingsMenu);
                    return SettingsMenu;
                }

                console.error('Couldn\'t find a parent element.');
                return -1;
            },
            getMenu: _ => SettingsMenu,
        }
    };

    tpul.settings.setParent();





    // OPENING AND CLOSING

    document.addEventListener('click', function(click) {

        // Close all settings when clicking outside the panel
        if (SettingsFrame == click.target) for (var settings of all_settings) settings.close();

    }, {passive: true});

    document.addEventListener('wheel', function(wheel) {

        // Open when scrolling down (only in game)
        if (location.port && wheel.deltaY > 0 && !last_opened.isOpen) last_opened.open();

        // Close all settings when scrolling up far enough
        if (SettingsFrame.scrollTop == 0 && wheel.deltaY < 0) for (var settings of all_settings) settings.close();;
    }, {passive: true});



    // =====NOITCES CIGOL=====





    try {
        window.tpul = tpul;
        unsafeWindow.tpul = tpul;
        unsafeWindow.tagpro.tpul = tpul;
    }catch(e){}

    return tpul;
})();


