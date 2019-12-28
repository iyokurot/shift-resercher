//締切日や表示開始日
const deadlineEarly = 9
const deadlineLate = 23
const today = new Date()
export function DeadEarly() {
  return deadlineEarly
}
export function DeadLate() {
  return deadlineLate
}
//直近の締め切り日テキスト
export function getNowDeadline() {
  const month = today.getMonth()
  const date = today.getDate()
  if (deadlineEarly >= date) {
    return month + 1 + '/' + deadlineEarly
  } else if (deadlineLate >= date) {
    return month + 1 + '/' + deadlineLate
  } else {
    if (11 === month) {
      return 1 + '/' + deadlineEarly
    } else {
      return month + 2 + '/' + deadlineEarly
    }
  }
}
//締め切り開始日 1日or16日
export function getReceptionDate() {
  const year = today.getFullYear()
  const month = today.getMonth()
  const date = today.getDate()
  if (date <= deadlineEarly) {
    //日付１～deadE
    return new Date(year, month, 16)
  } else if (date <= deadlineLate) {
    if (month === 11) {
      return new Date(year + 1, 0, 1)
    } else {
      return new Date(year, month + 1, 1)
    }
  } else {
    if (month === 11) {
      return new Date(year + 1, 0, 16)
    } else {
      return new Date(year, month + 1, 16)
    }
  }
}

//締め切られた開始日 1日or16日
export function getWishReceptionDate() {
  const year = today.getFullYear()
  const month = today.getMonth()
  const date = today.getDate()
  if (date <= deadlineEarly) {
    return new Date(year, month, 1)
  } else if (date <= deadlineLate) {
    return new Date(year, month, 16)
  } else {
    if (month === 11) {
      return new Date(year + 1, 0, 1)
    } else {
      return new Date(year, month + 1, 1)
    }
  }
}
//期間さかのぼりPre
export function getPreReceptionDate(reception) {
  const year = reception.getFullYear()
  const month = reception.getMonth()
  const date = reception.getDate()
  if (date === 16) {
    return new Date(year, month, 1)
  } else {
    if (month === 0) {
      return new Date(year - 1, 11, 16)
    } else {
      return new Date(year, month - 1, 16)
    }
  }
}
//期間すすみBack
export function getBackReceptionDate(reception) {
  const year = reception.getFullYear()
  const month = reception.getMonth()
  const date = reception.getDate()
  if (date === 1) {
    return new Date(year, month, 16)
  } else {
    if (month === 11) {
      return new Date(year + 1, 0, 1)
    } else {
      return new Date(year, month + 1, 1)
    }
  }
}
//期間テキスト　0/0～0/0
export function receptionText(date) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  if (1 === day) {
    return month + '/1～' + month + '/15'
  } else if (day === 16) {
    const finaldate = new Date(date.getFullYear(), month, 0)
    return month + '/16～' + month + '/' + finaldate.getDate()
  } else {
    return ''
  }
}
