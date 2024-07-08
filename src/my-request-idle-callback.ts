import { MyIdleRequestCallbackOptions } from "./typings";

export function MyRequestIdleCallback(
  callback: any,
  options?: MyIdleRequestCallbackOptions
) {
  /** 设置是否超时标记 */
  let didTimeout = false;
  // 设置超时
  if (options?.timeout) {
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

  port2.onmessage = ({
    data: { frameEnd },
  }: {
    data: {
      frameEnd: DOMHighResTimeStamp;
    };
  }) => {
    /** 拿到帧结束时间 */
    const timeRemaining = () => frameEnd - performance.now();
    if (timeRemaining() || didTimeout) {
      callback({
        didTimeout,timeRemaining
      });
    } else {
      sendMsg();
    }
  };

  sendMsg();
}