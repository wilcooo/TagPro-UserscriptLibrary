# TagPro-UserscriptLibrary
Functions that any TagPro script could benefit from

To use this library, include these lines in your userscripts' metadata block:

    // @require      https://github.com/wilcooo/TagPro-UserscriptLibrary/raw/master/tpul.lib.js
    // @grant        GM_setValue
    // @grant        GM_getValue
    // @grant        GM_xmlhttpRequest
    // @connect      koalabeast.com

## Add a settings panel and button to open it:

`tpul.settings.addSettings( {id, title, fields, icon, tooltipText, buttonText} )`

*This adds a button to the scoreboard (when in-game) or at the top of the page.  
The button will open a settings panel with the settings that you'll provide.
It is basically a wrapper around GM_config [documentation](https://github.com/sizzlemctwizzle/GM_config/wiki), a powerfull JS plugin that handles most of the saving/retrieving settings and creating the settings panel.*

*Look at the example below, and you'll see it is the same as the example on GM_config, but with a few added tags (title, icon)*

- `onclick` will be called when the button gets clicked.  
In most cases, you want to provide a function that opens your scripts' settings.

- `icon` - The image will be scaled to 64×64, so it is optimal to use that size  
  It is recommended to use an image related to your script instead of a general settings icon.
  You can use a normal image url, or a base64 encoded image.

- `return value` - This function returns the GM_config settings object. Use `.get('fieldId')` to retrieve a setting's value. More info in the GM_config documentation.

**Example**    
               
                MySettings = tpul.settings.addSettings(
                {
                  id: 'MyConfig', // A unique ID for your panel
                  fields: // Fields object
                  {
                    Name: // This is the id of the field
                    {
                      label: 'Name', // Appears next to field
                      type: 'text', // Makes this setting a text field
                      default: 'Sizzle McTwizzle' // Default value if user doesn't change it
                    }
                  },
                  
                  title: 'My Userscript',
                  icon: 'https://github.com/wilcooo/TagPro-RespawnPizzas/raw/master/icon.png',
                })
                
*Now you can read the 'Name' setting like this*
                
                MySettings.get('Name')
                

## Add a settings button:

`tpul.settings.addButton( {onclick, icon, tooltipText, buttonText} )`

*This creates only creates the button. You'll have to provide an onclick action yourself*

- `onclick` will be called when the button gets clicked.  
In most cases, you want to provide a function that opens your scripts' settings.

- `icon` - This image will be scaled to 64×64, so it is optimal to use that size  
  It is recommended to use an image related to your script instead of a general settings icon.
  You can use a normal image url, or a base64 encoded image.

- `return value` - This function returns the newly created button (which you probably don't need)

**Example**    

                tpul.settings.addButton( {
                    onclick: function(){ alert('pizzaaa'); },
                    icon: 'https://github.com/wilcooo/TagPro-RespawnPizzas/raw/master/icon.png',
                    tooltipText: 'Click me to show an alert!',
                } );

## Profile settings

*TagPro's own settings, that your can edit on your profile. Play around with the `tpul.profile` object to get an idea of what you can do with it. You can get the player's ID, current settings, reserved name etc.*

## Update Profile Settings

`tpul.profile.setSettings( newSettings )`

- `newSettings` should be an object like this: `{ allChat: false, teamChat: true }`  
  Not all settings are required, the ones you leave out will be unchanged. A list of all settings is below. Global settings are tied to your profile and will work on any PC you log into. Local settings are tied to the browser (cookies). You can treat them the same, TPUL will know what to do.

Global settings:

- `reservedName`
- `displayedName`       
- `allChat`
- `teamChat`
- `groupChat`
- `systemChat`
- `tutorialChat`
- `names`
- `degrees`
- `matchState`
- `performanceInfo`
- `spectatorInfo`
- `stats`

Local settings:

- `sound`
- `music`
- `volume`
- `textures`
- `disableBallSpin`
- `tileRespawnWarnings`
- `disableTutorialChat` < This cookie isn't used anymore afaik
- `disableParticles`
- `forceCanvasRenderer`
- `disableViewportScaling`

## More

*Typing documentation is boring. Play around with tpul, if you've questions ask me*
