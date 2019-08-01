const weeks = ['日', '月', '火', '水', '木', '金', '土']
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
const config = {
    show: 3,
}
let prevMonth;
let nextMonth;

window.addEventListener('DOMContentLoaded', function () {
    onLoad();
    prevMonth = document.getElementById("prevMonth");
    nextMonth = document.getElementById("nextMonth");
    prevMonth.addEventListener('click', moveCalendar);
    nextMonth.addEventListener('click', moveCalendar);
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("calendar_td")) {
            alert('クリックした日付は' + e.target.dataset.date + 'です')
        }
    })
})
//初期読み込み
function onLoad() {
    setDate();
    showCalendar(year, month);
}
function setDate() {
    //var date = new Date();
    //var month = date.getMonth() + 1;
    var day = date.getDate();
    var printday = 0;
    if (day > 10 && day < 24) {
        printday = 15;
    } else {
        printday = 1;
    }
    const dateText = document.getElementById("dateText");
    dateText.innerHTML = month + "月" + printday + "日～";
    //console.log(month + "/" + day);
}

function showCalendar(year, month) {
    const calendarHtml = setCalender(year, month)
    document.getElementById("calendar").innerHTML = calendarHtml;
}

function setCalender(year, month) {
    const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
    const endDate = new Date(year, month, 0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    const lastMonthEndDate = new Date(year, month - 1, 0) // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日
    const startDay = startDate.getDay() // 月の最初の日の曜日を取得
    let dayCount = 1 // 日にちのカウント
    let calendarHtml = '' // HTMLを組み立てる変数

    calendarHtml += '<h1>' + year + '/' + month + '</h1>'
    calendarHtml += '<table>'
    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += '<td>' + weeks[i] + '</td>'
    }

    for (let w = 0; w < 6; w++) {
        calendarHtml += '<tr>'

        for (let d = 0; d < 7; d++) {
            if (w == 0 && d < startDay) {
                // 1行目で1日の曜日の前
                let num = lastMonthendDayCount - startDay + d + 1
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
            } else if (dayCount > endDayCount) {
                // 末尾の日数を超えた
                let num = dayCount - endDayCount
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
                dayCount++
            } else {
                calendarHtml += '<td class="calendar_td" data-date=' + month + '/' + dayCount + '>' + dayCount + '</td>'
                dayCount++
            }
        }
        calendarHtml += '</tr>'
    }
    calendarHtml += '</table>'

    return calendarHtml;
}
function moveCalendar(e) {
    document.getElementById('calendar').innerHTML = ''

    if (e.target.id === 'prevMonth') {
        month--

        if (month < 1) {
            year--
            month = 12
        }
    }

    if (e.target.id === 'nextMonth') {
        month++

        if (month > 12) {
            year++
            month = 1
        }
    }

    showCalendar(year, month)
}






function getTest() {
    const dateText = document.getElementById("dateText");
    //dateText.innerHTML = "<span>test text</span>";
    //document.write("this is test");
    alert("test");
}