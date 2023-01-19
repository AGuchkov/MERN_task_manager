export const sorting = (arr, props) => {
  let temp = [...arr]
  return temp.sort(compare(props))
}

function compare(props) {
  return function (a, b) {
    for (let i = 0; i < props.length; i++) {
      let prop = props[i]
      let field = prop.field
      let reverse = prop.reverse
      if (a[field] < b[field])
        return reverse ? 1 : -1
      if (a[field] > b[field])
        return reverse ? -1 : 1
    }
    return 0
  }
}

export const changeFormatDate = (date) => {
  let changedDate = new Date()
  if (date) {
    changedDate = new Date(date)
  }
  changedDate = changedDate.toLocaleDateString().replace(".", " ").replace(".", " ").split(" ").reverse()
  changedDate = changedDate[0] + "-" + changedDate[1] + "-" + changedDate[2]
  return changedDate
}