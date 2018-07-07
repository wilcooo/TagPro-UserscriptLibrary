# TagPro-UserscriptLibrary
Functions that any TagPro script could benefit from

To use this library, include these lines in your userscripts' metadata block:

    // @require      https://github.com/wilcooo/TagPro-UserscriptLibrary/raw/master/tpul.lib.js
    // @grant        GM_setValue
    // @grant        GM_getValue


## Add a settings button:

`tpul.settings.addButton( onclick, name, imageURL )`

- This creates a button on the scoreboard (when in-game)  
or on top of the page (on most of a TagPro servers' pages)

- `onclick` will be called when the button gets clicked.  
In most cases, you want to provide a function that opens your scripts' settings.

- The image will be scaled to 64×64, so it is optimal to use that size
- It is recommended to use an image related to your script,  
instead of a general settings icon.

- You can use a normal image url, or a base64 encoded image.

- This function returns the newly created button (which you probably don't need)
