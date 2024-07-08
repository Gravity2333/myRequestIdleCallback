function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {        // 相邻元素两两对比
              var temp = arr[j + 1];        // 元素交换
              arr[j + 1] = arr[j];
              arr[j] = temp;
          }
      }
  }
  return arr;
}

export function random(n) {
  const randomNumbers = [];
 
  for (let i = 0; i < n; i++) {
    randomNumbers.push(Math.random());
  }
   
  return bubbleSort(randomNumbers)
}

export function MyRequestIdleCallback(callback, options) {
  /** 设置是否超时标记 */
  let didTimeout = false;
  // 设置超时
  if (options === null || options === void 0 ? void 0 : options.timeout) {
      setTimeout(() => {
          didTimeout = true;
      }, options.timeout);
  }
  /** 设置管道，保证能最快的执行任务 */
  const messageChannel = new MessageChannel();
  /** 设置两个端口 */
  const port1 = messageChannel.port1;
  const port2 = messageChannel.port2;
  const sendMsg = () => {
      window.requestAnimationFrame((frameStart) => {
          const frameEnd = frameStart + 16.7;
          port1.postMessage({
              frameEnd,
          });
      });
  };
  port2.onmessage = ({ data: { frameEnd }, }) => {
      /** 拿到帧结束时间 */
      const timeRemaining = () => frameEnd - performance.now();
      if (timeRemaining() || didTimeout) {
          callback({
              didTimeout, timeRemaining
          });
      }
      else {
          sendMsg();
      }
  };
  sendMsg();
}