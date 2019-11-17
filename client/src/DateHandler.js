//Date変換関数

export function DateHandler() {
  return 'start'
}
//yymmdd=>MM/dd
export function GetDateByNum(str) {
  const text = str.substr(4, 2) + '/' + str.substr(6, 2)
  return text
}
//yyyy,MM,dd,=>yyMMdd
export function GetIntDate(year, month, day) {
  return year + ('0' + (month + 1)).slice(-2) + ('0' + day).slice(-2)
}
//yyyy-MM-dd=>yyyy/mm/dd
export function GetSlashFormatDate(str) {
  const date = new Date(str)
  return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
}
//Date=>yyyyMMdd
export function GetFormatDate(date) {
  return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${(
    '0' + date.getDate()
  ).slice(-2)}`
}
