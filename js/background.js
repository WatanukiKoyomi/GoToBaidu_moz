﻿var userurl = 'https://s2.ax1x.com/2019/10/28/K6x46x.png';
browser.contextMenus.create({
    title: "ceshi",
    contexts: ['browser_action'],
    onclick: () =>{
        browser.browserAction.setPopup({popup: "/popup.html"});
        browser.browserAction.openPopup();
        browser.browserAction.setPopup({popup: ""});
    }
});
browser.browserAction.onClicked.addListener(function(tab){
    browser.tabs.create({url:"https://www.baidu.com"});
});

function handleMessage(request, sender, sendResponse) {
    console.log("Message from the content script: "+request.greeting);
    browser.tabs.insertCSS({file:"css/1.css"});
    browser.tabs.insertCSS({code:"body {background-image: url("+userurl+") !important;"});
    sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);
