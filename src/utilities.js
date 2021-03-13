function deepCloneArray(arr) {
    const newArr = Array(arr.length)
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            newArr[i] = deepCloneArray(arr[i])
        } else if (arr[i] !== null && typeof arr[i] === "object") {
            newArr[i] = deepCloneObj(arr[i])
        } else {
            newArr[i] = arr[i]
        }
    }
    return newArr
}

function deepCloneObj(obj) {
    const newObj = {}
    for (const p in obj) {
        if (Array.isArray(obj[p])) {
            newObj[p] = deepCloneArray(obj[p])
        } else if (obj[p] !== null && typeof obj[p] === "object") {
            newObj[p] = deepCloneObj(obj[p])
        } else {
            newObj[p] = obj[p]
        }
    }
    return newObj
}

function deepClone(target) {
    if (Array.isArray(target)) {
        return deepCloneArray(target)
    } else if (target !== null && typeof target === "object") {
        return deepCloneObj(target)
    } else {
        return target
    }
}

function formatFileSize(size) {
    let formatted = size
    let unit = "B"
    const units = ["KB", "MB", "GB", "TB"]
    for (let i = 0; i < units.length && formatted > 1024; i++) {
        formatted /= 1024
        unit = units[i]
    }
    formatted = formatted.toFixed(2).replace(/\.?0+$/, "")
    formatted += unit
    return formatted
}

function formatTimestamp(timestamp) {
    let date = new Date(timestamp)
    let diff = new Date() - date
    if (diff > 0) {
        if (diff < 1000) {
            return "现在"
        }

        let sec = Math.floor(diff / 1000)
        if (sec < 60) {
            return sec + "秒前"
        }

        let min = Math.floor(diff / 60000)
        if (min < 60) {
            return min + "分钟前"
        }
    }

    let d = date
    d = [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes()
    ].map(component => component.toString().padStart(2, "0"))

    return d.slice(0, 3).join('/') + ' ' + d.slice(-2).join(':')

}


export {deepClone, formatFileSize, formatTimestamp};
