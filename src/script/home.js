

window.addEventListener('DOMContentLoaded', function () {
    onLoad();
})
//初期読み込み
function onLoad() {
    //alert("Hello");
    setDate();
}
function setDate() {
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDay();
    var printday = 0;
    if (day > 10 && day < 24) {
        printday = 15;
    } else {
        printday = 1;
    }
    const dateText = document.getElementById("dateText");
    dateText.innerHTML = month + "月" + printday + "日～";
}
function getTest() {
    const dateText = document.getElementById("dateText");
    //dateText.innerHTML = "<span>test text</span>";
    //document.write("this is test");
    alert("test");
}
