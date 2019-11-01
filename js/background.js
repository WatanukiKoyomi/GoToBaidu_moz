//设置背景图片的url
var userurl = browser.storage.local.get("userjson").userurl;
if(userurl == null || userurl == ''){
    userurl = 'https://s2.ax1x.com/2019/10/28/K6x46x.png';
}

//browserAction的右键菜单
browser.contextMenus.create({
    title: "更改背景图片",
    contexts: ['browser_action'],
    onclick: () =>{
        browser.browserAction.setPopup({popup: "/popup.html"});
        browser.browserAction.openPopup();
        browser.browserAction.setPopup({popup: ""});
    }
});

//browserAction的左击监听
browser.browserAction.onClicked.addListener(function(tab){
    browser.tabs.create({url:"https://www.baidu.com"});
});

// var target = "https://developer.mozilla.org/*";
var target = "https://www.baidu.com/*";
// function logResponse(responseDetails) {
//     console.log(responseDetails.url);
//     console.log(responseDetails.statusCode);
//   }
browser.webRequest.onCompleted.addListener(function(details){
    console.log("onCompleted details.url: "+ details.url);
    console.log("onCompleted details.statusCode: "+ details.statusCode);
    var newurl = "body {background-image: url("+userurl+") !important;";
    browser.tabs.insertCSS({code: newurl});
},{urls: [target]});

//标签创建监听
browser.tabs.onCreated.addListener(function(tab){
    console.log("this is onCreated info TabId= " + tab.id + " was onCreated");
    browser.tabs.get(tab.id, function(tab){
        console.log("this is onCreated info url:"+tab.url);
    });
});

//标签活动监听
browser.tabs.onActivated.addListener(function(activeInfo){
    console.log("this is onActivated info: tab.tabId="+activeInfo.tabId+"  was onActivated");
    console.log("this is onActivated info: tab.windowId="+activeInfo.windowId);
    let tab1 = browser.tabs.get(activeInfo.tabId,function(tab){
        console.log("tabInfo: title:"+tab.title+"; url:"+tab.url);
        var url = tab.url;
        console.log("回调函数中url: "+url);
        var pattern = /www.baidu.com/;
        if(pattern.test(url)){
            var newurl = "body {background-image: url("+userurl+") !important;";
            browser.tabs.insertCSS({code: newurl});
            console.log("注入css成功");
        }
    });
});

//运行时短消息监听，监听contentScript发来的消息
function handleMessage(request, sender, sendResponse) {
    console.log("Message from the content script: "+request.greeting);
    var newurl = "body {background-image: url("+userurl+") !important;";
    browser.tabs.insertCSS({code: newurl});
    sendResponse({response: "Response from background script"});
}

browser.runtime.onMessage.addListener(handleMessage);

//供popup调用的本地存储方法
function setStorage(userjson){
    browser.storage.local.set({userjson});
}


