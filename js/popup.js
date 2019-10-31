var btn = document.getElementById("btn");
var bg = browser.extension.getBackgroundPage();
document.getElementById("show").value = bg.userurl;
function btnClick(){
    bg.userurl = document.getElementById("url").value;
}
btn.onclick = btnClick;