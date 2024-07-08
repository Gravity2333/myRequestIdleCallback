export interface IMyDeadline {
  didTimeout: boolean;
  timeRemaining: () => DOMHighResTimeStamp;
}

export interface MyIdleRequestCallback {
  (deadline: IMyDeadline): void;
}

export interface MyIdleRequestCallbackOptions {
  timeout?: number;
}
