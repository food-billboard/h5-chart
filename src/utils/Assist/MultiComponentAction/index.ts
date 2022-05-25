import { EventEmitter } from 'eventemitter3';

export class MultiComponentAction extends EventEmitter {
  static DRAG_START = 'DRAG_START';
  static DRAG = 'DRAG';
  static DRAG_STOP = 'DRAG_STOP';
  static RESIZE_START = 'RESIZE_START';
  static RESIZE = 'RESIZE';
  static RESIZE_STOP = 'RESIZE_STOP';
}

const instance = new MultiComponentAction();

// 组件判断是否被选中，选中的绑定对应的事件
// 被操作的组件触发对应的事件，让别的绑定的组件接收到
// 接收到事件的组件计算相关的参数啥的

export default instance;
