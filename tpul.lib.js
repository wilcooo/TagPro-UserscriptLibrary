// ==UserScript==
// @name         TagPro Userscript Library
// @description  Functions that any TagPro script could benefit from
// @author       Ko </u/Wilcooo> (https://greasyfork.org/users/152992)
// @version      1.4
// @license      MIT
// @include      *.koalabeast.com*
// @include      *.jukejuice.com*
// @include      *.newcompte.fr*
// @downloadURL  https://raw.githubusercontent.com/wilcooo/TagPro-UserscriptLibrary/master/tpul.lib.js
// @icon         https://raw.githubusercontent.com/wilcooo/TagPro-UserscriptLibrary/master/icon.png
// @supportURL   https://www.reddit.com/message/compose/?to=Wilcooo
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
* tpul.settings.addButton( onclick, name, icon )
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


console.log('Loading TPUL (TagPro Userscript Library)');


/* TODO:

- Style

*/




////////////////////////////////////////////////////////////////
//    START OF GM_CONFIG                                      //
////////////////////////////////////////////////////////////////

/*
Copyright 2009+, GM_config Contributors (https://github.com/sizzlemctwizzle/GM_config)

GM_config Contributors:
    Mike Medley <medleymind@gmail.com>
    Joe Simmons
    Izzy Soft
    Marti Martz

GM_config is distributed under the terms of the GNU Lesser General Public License.

    GM_config is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function GM_configStruct(){if(arguments.length){GM_configInit(this,arguments);this.onInit()}}
function GM_configInit(config,args){if(typeof config.fields=="undefined"){config.fields={};config.onInit=config.onInit||function(){};config.onOpen=config.onOpen||function(){};config.onSave=config.onSave||function(){};config.onClose=config.onClose||function(){};config.onReset=config.onReset||function(){};config.isOpen=false;config.title="User Script Settings";config.css={basic:["#GM_config * { font-family: arial,tahoma,myriad pro,sans-serif; }","#GM_config { background: #FFF; }","#GM_config input[type='radio'] { margin-right: 8px; }",
"#GM_config .indent40 { margin-left: 40%; }","#GM_config .field_label { font-size: 12px; font-weight: bold; margin-right: 6px; }","#GM_config .radio_label { font-size: 12px; }","#GM_config .block { display: block; }","#GM_config .saveclose_buttons { margin: 16px 10px 10px; padding: 2px 12px; }","#GM_config .reset, #GM_config .reset a,"+" #GM_config_buttons_holder { color: #000; text-align: right; }","#GM_config .config_header { font-size: 20pt; margin: 0; }","#GM_config .config_desc, #GM_config .section_desc, #GM_config .reset { font-size: 9pt; }",
"#GM_config .center { text-align: center; }","#GM_config .section_header_holder { margin-top: 8px; }","#GM_config .config_var { margin: 0 0 4px; }","#GM_config .section_header { background: #414141; border: 1px solid #000; color: #FFF;"," font-size: 13pt; margin: 0; }","#GM_config .section_desc { background: #EFEFEF; border: 1px solid #CCC; color: #575757;"+" font-size: 9pt; margin: 0 0 6px; }"].join("\n")+"\n",basicPrefix:"GM_config",stylish:""}}if(args.length==1&&typeof args[0].id=="string"&&typeof args[0].appendChild!=
"function")var settings=args[0];else{var settings={};for(var i=0,l=args.length,arg;i<l;++i){arg=args[i];if(typeof arg.appendChild=="function"){settings.frame=arg;continue}switch(typeof arg){case "object":for(var j in arg){if(typeof arg[j]!="function"){settings.fields=arg;break}if(!settings.events)settings.events={};settings.events[j]=arg[j]}break;case "function":settings.events={onOpen:arg};break;case "string":if(/\w+\s*\{\s*\w+\s*:\s*\w+[\s|\S]*\}/.test(arg))settings.css=arg;else settings.title=
arg;break}}}if(settings.id)config.id=settings.id;else if(typeof config.id=="undefined")config.id="GM_config";if(settings.title)config.title=settings.title;if(settings.css)config.css.stylish=settings.css;if(settings.frame)config.frame=settings.frame;if(settings.events){var events=settings.events;for(var e in events)config["on"+e.charAt(0).toUpperCase()+e.slice(1)]=events[e]}if(settings.fields){var stored=config.read(),fields=settings.fields,customTypes=settings.types||{},configId=config.id;for(var id in fields){var field=
fields[id];if(field)config.fields[id]=new GM_configField(field,stored[id],id,customTypes[field.type],configId);else if(config.fields[id])delete config.fields[id]}}if(config.id!=config.css.basicPrefix){config.css.basic=config.css.basic.replace(new RegExp("#"+config.css.basicPrefix,"gm"),"#"+config.id);config.css.basicPrefix=config.id}}
GM_configStruct.prototype={init:function(){GM_configInit(this,arguments);this.onInit()},open:function(){var match=document.getElementById(this.id);if(match&&(match.tagName=="IFRAME"||match.childNodes.length>0))return;var config=this;function buildConfigWin(body,head){var create=config.create,fields=config.fields,configId=config.id,bodyWrapper=create("div",{id:configId+"_wrapper"});head.appendChild(create("style",{type:"text/css",textContent:config.css.basic+config.css.stylish}));bodyWrapper.appendChild(create("div",
{id:configId+"_header",className:"config_header block center"},config.title));var section=bodyWrapper,secNum=0;for(var id in fields){var field=fields[id],settings=field.settings;if(settings.section){section=bodyWrapper.appendChild(create("div",{className:"section_header_holder",id:configId+"_section_"+secNum}));if(Object.prototype.toString.call(settings.section)!=="[object Array]")settings.section=[settings.section];if(settings.section[0])section.appendChild(create("div",{className:"section_header center",
id:configId+"_section_header_"+secNum},settings.section[0]));if(settings.section[1])section.appendChild(create("p",{className:"section_desc center",id:configId+"_section_desc_"+secNum},settings.section[1]));++secNum}section.appendChild(field.wrapper=field.toNode())}bodyWrapper.appendChild(create("div",{id:configId+"_buttons_holder"},create("button",{id:configId+"_saveBtn",textContent:"Save",title:"Save settings",className:"saveclose_buttons",onclick:function(){config.save()}}),create("button",{id:configId+
"_closeBtn",textContent:"Close",title:"Close window",className:"saveclose_buttons",onclick:function(){config.close()}}),create("div",{className:"reset_holder block"},create("a",{id:configId+"_resetLink",textContent:"Reset to defaults",href:"#",title:"Reset fields to default values",className:"reset",onclick:function(e){e.preventDefault();config.reset()}}))));body.appendChild(bodyWrapper);config.center();window.addEventListener("resize",config.center,false);config.onOpen(config.frame.contentDocument||
config.frame.ownerDocument,config.frame.contentWindow||window,config.frame);window.addEventListener("beforeunload",function(){config.close()},false);config.frame.style.display="block";config.isOpen=true}var defaultStyle="bottom: auto; border: 1px solid #000; display: none; height: 75%;"+" left: 0; margin: 0; max-height: 95%; max-width: 95%; opacity: 0;"+" overflow: auto; padding: 0; position: fixed; right: auto; top: 0;"+" width: 75%; z-index: 9999;";if(this.frame){this.frame.id=this.id;this.frame.setAttribute("style",
defaultStyle);buildConfigWin(this.frame,this.frame.ownerDocument.getElementsByTagName("head")[0])}else{document.body.appendChild(this.frame=this.create("iframe",{id:this.id,style:defaultStyle}));this.frame.src="about:blank";this.frame.addEventListener("load",function(e){var frame=config.frame;var body=frame.contentDocument.getElementsByTagName("body")[0];body.id=config.id;buildConfigWin(body,frame.contentDocument.getElementsByTagName("head")[0])},false)}},save:function(){var forgotten=this.write();
this.onSave(forgotten)},close:function(){if(this.frame.contentDocument){this.remove(this.frame);this.frame=null}else{this.frame.innerHTML="";this.frame.style.display="none"}var fields=this.fields;for(var id in fields){var field=fields[id];field.wrapper=null;field.node=null}this.onClose();this.isOpen=false},set:function(name,val){this.fields[name].value=val;if(this.fields[name].node)this.fields[name].reload()},get:function(name,getLive){var field=this.fields[name],fieldVal=null;if(getLive&&field.node)fieldVal=
field.toValue();return fieldVal!=null?fieldVal:field.value},write:function(store,obj){if(!obj){var values={},forgotten={},fields=this.fields;for(var id in fields){var field=fields[id];var value=field.toValue();if(field.save)if(value!=null){values[id]=value;field.value=value}else values[id]=field.value;else forgotten[id]=value}}try{this.setValue(store||this.id,this.stringify(obj||values))}catch(e){this.log("GM_config failed to save settings!")}return forgotten},read:function(store){try{var rval=this.parser(this.getValue(store||
this.id,"{}"))}catch(e){this.log("GM_config failed to read saved settings!");var rval={}}return rval},reset:function(){var fields=this.fields;for(var id in fields)fields[id].reset();this.onReset()},create:function(){switch(arguments.length){case 1:var A=document.createTextNode(arguments[0]);break;default:var A=document.createElement(arguments[0]),B=arguments[1];for(var b in B)if(b.indexOf("on")==0)A.addEventListener(b.substring(2),B[b],false);else if(",style,accesskey,id,name,src,href,which,for".indexOf(","+
b.toLowerCase())!=-1)A.setAttribute(b,B[b]);else A[b]=B[b];if(typeof arguments[2]=="string")A.innerHTML=arguments[2];else for(var i=2,len=arguments.length;i<len;++i)A.appendChild(arguments[i])}return A},center:function(){var node=this.frame;if(!node)return;var style=node.style,beforeOpacity=style.opacity;if(style.display=="none")style.opacity="0";style.display="";style.top=Math.floor(window.innerHeight/2-node.offsetHeight/2)+"px";style.left=Math.floor(window.innerWidth/2-node.offsetWidth/2)+"px";
style.opacity="1"},remove:function(el){if(el&&el.parentNode)el.parentNode.removeChild(el)}};
(function(){var isGM=typeof GM_getValue!="undefined"&&typeof GM_getValue("a","b")!="undefined",setValue,getValue,stringify,parser;if(!isGM){setValue=function(name,value){return localStorage.setItem(name,value)};getValue=function(name,def){var s=localStorage.getItem(name);return s==null?def:s};stringify=JSON.stringify;parser=JSON.parse}else{setValue=GM_setValue;getValue=GM_getValue;stringify=typeof JSON=="undefined"?function(obj){return obj.toSource()}:JSON.stringify;parser=typeof JSON=="undefined"?
function(jsonData){return(new Function("return "+jsonData+";"))()}:JSON.parse}GM_configStruct.prototype.isGM=isGM;GM_configStruct.prototype.setValue=setValue;GM_configStruct.prototype.getValue=getValue;GM_configStruct.prototype.stringify=stringify;GM_configStruct.prototype.parser=parser;GM_configStruct.prototype.log=window.console?console.log:isGM&&typeof GM_log!="undefined"?GM_log:window.opera?opera.postError:function(){}})();
function GM_configDefaultValue(type,options){var value;if(type.indexOf("unsigned ")==0)type=type.substring(9);switch(type){case "radio":case "select":value=options[0];break;case "checkbox":value=false;break;case "int":case "integer":case "float":case "number":value=0;break;default:value=""}return value}
function GM_configField(settings,stored,id,customType,configId){this.settings=settings;this.id=id;this.configId=configId;this.node=null;this.wrapper=null;this.save=typeof settings.save=="undefined"?true:settings.save;if(settings.type=="button")this.save=false;this["default"]=typeof settings["default"]=="undefined"?customType?customType["default"]:GM_configDefaultValue(settings.type,settings.options):settings["default"];this.value=typeof stored=="undefined"?this["default"]:stored;if(customType){this.toNode=
customType.toNode;this.toValue=customType.toValue;this.reset=customType.reset}}
GM_configField.prototype={create:GM_configStruct.prototype.create,toNode:function(){var field=this.settings,value=this.value,options=field.options,type=field.type,id=this.id,configId=this.configId,labelPos=field.labelPos,create=this.create;function addLabel(pos,labelEl,parentNode,beforeEl){if(!beforeEl)beforeEl=parentNode.firstChild;switch(pos){case "right":case "below":if(pos=="below")parentNode.appendChild(create("br",{}));parentNode.appendChild(labelEl);break;default:if(pos=="above")parentNode.insertBefore(create("br",
{}),beforeEl);parentNode.insertBefore(labelEl,beforeEl)}}var retNode=create("div",{className:"config_var",id:configId+"_"+id+"_var",title:field.title||""}),firstProp;for(var i in field){firstProp=i;break}var label=field.label&&type!="button"?create("label",{id:configId+"_"+id+"_field_label","for":configId+"_field_"+id,className:"field_label"},field.label):null;switch(type){case "textarea":retNode.appendChild(this.node=create("textarea",{innerHTML:value,id:configId+"_field_"+id,className:"block",cols:field.cols?
field.cols:20,rows:field.rows?field.rows:2}));break;case "radio":var wrap=create("div",{id:configId+"_field_"+id});this.node=wrap;for(var i=0,len=options.length;i<len;++i){var radLabel=create("label",{className:"radio_label"},options[i]);var rad=wrap.appendChild(create("input",{value:options[i],type:"radio",name:id,checked:options[i]==value}));var radLabelPos=labelPos&&(labelPos=="left"||labelPos=="right")?labelPos:firstProp=="options"?"left":"right";addLabel(radLabelPos,radLabel,wrap,rad)}retNode.appendChild(wrap);
break;case "select":var wrap=create("select",{id:configId+"_field_"+id});this.node=wrap;for(var i=0,len=options.length;i<len;++i){var option=options[i];wrap.appendChild(create("option",{value:option,selected:option==value},option))}retNode.appendChild(wrap);break;default:var props={id:configId+"_field_"+id,type:type,value:type=="button"?field.label:value};switch(type){case "checkbox":props.checked=value;break;case "button":props.size=field.size?field.size:25;if(field.script)field.click=field.script;
if(field.click)props.onclick=field.click;break;case "hidden":break;default:props.type="text";props.size=field.size?field.size:25}retNode.appendChild(this.node=create("input",props))}if(label){if(!labelPos)labelPos=firstProp=="label"||type=="radio"?"left":"right";addLabel(labelPos,label,retNode)}return retNode},toValue:function(){var node=this.node,field=this.settings,type=field.type,unsigned=false,rval=null;if(!node)return rval;if(type.indexOf("unsigned ")==0){type=type.substring(9);unsigned=true}switch(type){case "checkbox":rval=
node.checked;break;case "select":rval=node[node.selectedIndex].value;break;case "radio":var radios=node.getElementsByTagName("input");for(var i=0,len=radios.length;i<len;++i)if(radios[i].checked)rval=radios[i].value;break;case "button":break;case "int":case "integer":case "float":case "number":var num=Number(node.value);var warn='Field labeled "'+field.label+'" expects a'+(unsigned?" positive ":"n ")+"integer value";if(isNaN(num)||type.substr(0,3)=="int"&&Math.ceil(num)!=Math.floor(num)||unsigned&&
num<0){alert(warn+".");return null}if(!this._checkNumberRange(num,warn))return null;rval=num;break;default:rval=node.value;break}return rval},reset:function(){var node=this.node,field=this.settings,type=field.type;if(!node)return;switch(type){case "checkbox":node.checked=this["default"];break;case "select":for(var i=0,len=node.options.length;i<len;++i)if(node.options[i].textContent==this["default"])node.selectedIndex=i;break;case "radio":var radios=node.getElementsByTagName("input");for(var i=0,len=
radios.length;i<len;++i)if(radios[i].value==this["default"])radios[i].checked=true;break;case "button":break;default:node.value=this["default"];break}},remove:function(el){GM_configStruct.prototype.remove(el||this.wrapper);this.wrapper=null;this.node=null},reload:function(){var wrapper=this.wrapper;if(wrapper){var fieldParent=wrapper.parentNode;fieldParent.insertBefore(this.wrapper=this.toNode(),wrapper);this.remove(wrapper)}},_checkNumberRange:function(num,warn){var field=this.settings;if(typeof field.min==
"number"&&num<field.min){alert(warn+" greater than or equal to "+field.min+".");return null}if(typeof field.max=="number"&&num>field.max){alert(warn+" less than or equal to "+field.max+".");return null}return true}};var GM_config=new GM_configStruct;

////////////////////////////////////////////////////////////////
//    END OF GM_CONFIG                                        //
////////////////////////////////////////////////////////////////


var tpul = unsafeWindow.tpul || (function(){





    // =====STYLE SECTION=====



    // Create our own stylesheet to define the styles in:

    var style = document.createElement('style');
    document.head.appendChild(style);
    var styleSheet = style.sheet;

    // THE SETTINGS MENU BUTTONS

    styleSheet.insertRule(` #tpul-settings-menu {
text-align: center;
margin: 0 10%;
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
background: white;
color: black;

transition: top .5s;
top: 100%;
}`);

    styleSheet.insertRule(` .tpul-settings-frame > div::after {
content: "Sorry for the bad design, I'm working on it!";
font-style: italic;
color: gray;
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
            addSettings: function({id, title, fields, icon, tooltipText, buttonText}) {

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
                    icon: icon,
                    tooltipText: tooltipText,
                    buttonText: buttonText,
                });

                settings.button = button;
                settings.config = config;

                all_settings.push(settings);

                if(!last_opened) last_opened = settings;

                return settings;

            },
            addButton: function({onclick, icon, tooltipText, buttonText}) {

                if (!SettingsMenu) {
                    console.error('TPUL: Could not find a place to add the settings button for '+name);
                    return null;
                }

                var button = document.createElement('button');
                button.className = 'btn tpul-settings-btn';

                if (icon) {
                    if (icon.search(/^url\((.*)\)$/) == -1) icon = 'url("'+icon+'")';
                    button.style.backgroundImage = icon;
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
                    container.classList.remove('hidden');
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


