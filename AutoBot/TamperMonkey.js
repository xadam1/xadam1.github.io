// ==UserScript==
// @name			Grepobot - Bot for Grepolis
// @namespace		Grepobot - Bot for Grepolis
// @description		Grepobot is a automated script that helps you do stuff in Grepolis automaticaly! One of the best Grepolis bots out there.
// @autor			Grepobot
// @verison			3.2
// @include			http://*.grepolis.*/*
// @include			https://*.grepolis.*/*
// ==/UserScript==
(function(){
    var script = document.createElement('script'),
        link = document.createElement('link'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    //script.src = location.protocol+'//bot.grepobot.com/Autobot.js?_=' + Math.random();
    script.src = location.protocol+'//cdn.jsdelivr.net/gh/rubensei/grepobot-cracked@2.0/Autobot-Cracked.js';
    link.href = location.protocol+'//bot.grepobot.com/Autobot.css?_=' + Math.random();
    head.appendChild(script);
    head.appendChild(link);
    head.setAttribute('xhttps', 1);
})();
