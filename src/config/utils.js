let debounce = function (fn, delay) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay)
  }
};

let throttle = function (fn, delay) {
  let timer, last = 0;
  return function () {
    let context = this;
    let args = arguments;
    let now = Date.now();

    if (timer) clearTimeout(timer);
    if (now > last + delay) {
      last = now;
      fn.apply(context, args);
    } else {
      timer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, delay)

    }
  }
};

let formatDate = function (date, fmt) {
  let padLeftZero = function (str) {
    return ('00' + str).substr(str.length);
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
export {
  debounce,
  throttle,
  formatDate
}
