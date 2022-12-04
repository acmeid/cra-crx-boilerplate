import { Base64 } from 'js-base64'
import { debounce, round } from 'lodash-es'

// 复制文本
export const copyText = (value: any, callback: () => void): void => {
  const input = document.createElement('input')
  input.setAttribute('readonly', 'readonly')
  input.setAttribute('value', value)
  document.body.appendChild(input)
  input.select()
  input.setSelectionRange(0, 9999) //控制光标的位置
  if (document.execCommand) {
    document.execCommand('copy')
    // add tips
    if (callback) {
      callback()
    }
  }
  document.body.removeChild(input)
}

// 将文本，转换为中间是...
export const cutText = (val: string, startNum = 6, endNum = 6): string => {
  if (typeof val !== 'string') {
    return ''
  }
  return `${val?.slice(0, startNum)}...${val?.slice(0 - endNum)}`
}

// 计算某个时间距离当前时间多少秒
export const howLongAgo = (val: string): string => {
  const date = new Date(val)
  const now = new Date()
  // const offset = now.getTimezoneOffset() * 60 * 1000
  const diff = Math.ceil((now.getTime() - date.getTime()) / 1000)
  if (diff < 60) {
    return `${diff > 0 ? diff : 0}s ago`
  } else if (diff >= 60 && diff < 3600) {
    return `${round(diff / 60, 0)}minutes  ago`
  } else if (diff >= 3600 && diff < 86400) {
    return `${round(diff / 3600, 0)}hours ago`
  }
  return `${round(diff / 86400, 0)}days ago`
}

// 总费用
export const totalGas = (gas: any, amount: any): string => {
  gas = gas ? Number(gas) : 0
  amount = amount || 0

  return gas + (amount || 0)
}

// 处理区块类型
export const dealType = (type: string) => {
  if (!type) {
    return ''
  }
  const typeArr = type.split('.')
  const typeName = typeArr[typeArr.length - 1].replace(/^Msg/, '')
  return typeName
}

// 固定小数位数
export const setDigit = (val: string, len: number) => {
  if (val === null || val === undefined) {
    return ''
  }
  const arr = `${val}`.split('.')
  let temp = arr[1] || ''

  while (len - temp.length > 0) {
    temp = `${temp}0`
  }

  return `${arr[0]}.${temp}`
}

function formatNum(num: number) {
  return num < 10 ? `0${num}` : `${num}`
}
export const formatDate = (oldDate: any, format = 'yyyy-MM-dd HH:mm:ss') => {
  const date = new Date(oldDate)
  const hours: number | string = formatNum(date.getHours())

  const config: any = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    MM: formatNum(date.getMonth() + 1),
    W: date.getDay(),
    WW: formatNum(date.getDay()),
    d: date.getDate(),
    dd: formatNum(date.getDate()),
    H: date.getHours(),
    HH: hours,
    h: date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
    hh: Number(hours) > 12 ? Number(hours) - 12 : hours,
    m: date.getMinutes(),
    mm: formatNum(date.getMinutes()),
    s: date.getSeconds(),
    ss: formatNum(date.getSeconds()),
    A: date.getHours() < 12 ? 'AM' : 'PM',
    a: date.getHours() < 12 ? 'am' : 'pm',
  }
  const formatConfigs = format.match(/[a-zA-Z]+/g)
  formatConfigs?.forEach((item) => {
    format = format.replace(item, config[item])
  })
  return format
}

// 获取出块平均时间
export const getAverageTime = (list: any[]) => {
  const totalTime = list.reduce((prev, item, index) => {
    if (index === 0) {
      return prev
    }
    const temp = new Date(list[index - 1].block.header.time).getTime() - new Date(item.block.header.time).getTime()
    // console.log('temp::', temp)
    return temp + prev
  }, 0)

  return round(totalTime / 10 / 1000, 2)
}

export const uint8Array = (uint8Array: Uint8Array) => {
  return Array.prototype.map.call(uint8Array, (x) => ('00' + x.toString(16)).slice(-2)).join('')
}

export const hash16 = (hash: string) => {
  if (!hash) {
    return ''
  }
  const temp = Base64.toUint8Array(hash)
  return uint8Array(temp)
}

export const sliceArray = (array: any[], size: number) => {
  const result = []
  for (let x = 0; x < Math.ceil(array.length / size); x++) {
    const start = x * size
    const end = start + size
    result.push(array.slice(start, end))
  }
  return result
}

export default copyText
