export const throttle = (func, delay = 250) => {
  let isThrottled = false;
  let savedArgs = null;
  let savedThis = null;

  return function wrap(...args) {
    if (isThrottled) {
      savedArgs = args,
      savedThis = this;
      return;
    }

    func.apply(this, args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (savedThis) {
        wrap.apply(savedThis, savedArgs);
        savedThis = null;
        savedArgs = null;
      }

    }, delay);
  }
};


// Функция throttle будет принимать 2 аргумента:
// - callee, функция, которую надо вызывать;
// - timeout, интервал в мс, с которым следует пропускать вызовы.
function throttle(callee, timeout) {
  // Таймер будет определять,
  // надо ли нам пропускать текущий вызов.
  let timer = null

  // Как результат возвращаем другую функцию.
  // Это нужно, чтобы мы могли не менять другие части кода,
  // чуть позже мы увидим, как это помогает.
  return function perform(...args) {
    // Если таймер есть, то функция уже была вызвана,
    // и значит новый вызов следует пропустить.
    if (timer) return

    // Если таймера нет, значит мы можем вызвать функцию:
    timer = setTimeout(() => {
      // Аргументы передаём неизменными в функцию-аргумент:
      callee(...args)

      // По окончании очищаем таймер:
      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}
// Функция, которую мы хотим «пропускать»:
function doSomething(arg) {
  // ...
}

doSomething(42)

// А вот — та же функция, но обёрнутая в throttle:
const throttledDoSomething = throttle(doSomething, 250)

// throttledDoSomething — это именно функция,
// потому что из throttle мы возвращаем функцию.

// throttledDoSomething принимает те же аргументы,
// что и doSomething, потому что perform внутри throttle
// прокидывает все аргументы без изменения в doSomething,
// так что и вызов throttledDoSomething будет таким же,
// как и вызов doSomething:
throttledDoSomething(42)
