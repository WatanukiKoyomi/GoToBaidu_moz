var btn = document.getElementById("btn");
var bg = browser.extension.getBackgroundPage();
var userjson;
document.getElementById("show").value = bg.userurl;
function btnClick(){
    
    var newurl = document.getElementById("url").value;
    bg.userurl = newurl;
    userjson = {userurl: newurl};
    bg.setStorage(userjson);
    alert("更改成功");
}
btn.onclick = btnClick;