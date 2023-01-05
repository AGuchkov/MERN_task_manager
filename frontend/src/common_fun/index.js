export const sorting = (arr, prop, reverse = false) => {
  let temp = [...arr]
  return temp.sort((a, b) => (!reverse ? a[prop].toLowerCase() > b[prop].toLowerCase() : a[prop].toLowerCase() < b[prop].toLowerCase()) ? 1 : -1)
}

export const changeFormatDate = () => {
  let changedDate = new Date()
  changedDate = changedDate.toLocaleDateString().replace(".", " ").replace(".", " ").split(" ").reverse()
  changedDate = changedDate[0] + "-" + changedDate[1] + "-" + changedDate[2]
  return changedDate
}