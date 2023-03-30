import { renderDom } from './react-dom';

// 深度优先遍历去进行迭代处理任务单元及 fiber，所以我们需要一个全局的 nextUnitOfWork 变量，
// 作为下一个要处理的任务单元。
let nextUnitOfWork = null;

//  fiber 的迭代是从 root fiber 开始的，
// 因此我们需要根据 ReactDOM.render 接收的 element 和 container 参数，创建一个 rootFiber
let rootFiber = null;

// 创建 rootFiber 作为首个 nextUnitOfWork
export function createRoot(element, container) {
  rootFiber = {
    stateNode: container, // 记录对应的真实 dom 节点
    element: {            // element 指向 fiber 所对应的 React.element
      props: {
        children: [element],
      }
    }
  }

  nextUnitOfWork = rootFiber;
}

