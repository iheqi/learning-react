import { renderDom } from './react-dom';
import { commitRoot } from './commit.js';
import { reconcileChildren } from './reconciler';

// 深度优先遍历去进行迭代处理任务单元及 fiber，所以我们需要一个全局的 nextUnitOfWork 变量，
// 作为下一个要处理的任务单元。
let nextUnitOfWork = null;

//  fiber 的迭代是从 rootFiber 开始的，
// 因此我们需要根据 ReactDOM.render 接收的 element 和 container 参数，创建一个 workInProgressRoot
let workInProgressRoot = null; // 当前工作的 fiber 树
let currentRoot = null; // 上一次渲染的 fiber 树


// 创建 workInProgressRoot 作为首个 nextUnitOfWork
export function createRoot(element, container) {
  workInProgressRoot = {
    stateNode: container, // 记录对应的真实 dom 节点
    element: {            // element 指向 fiber 所对应的 React.element
      props: {
        children: [element],
      }
    },
    alternate: currentRoot
  }

  nextUnitOfWork = workInProgressRoot;
}

// 执行当前工作单元并设置下一个要执行的工作单元
function performUnitOfWork(workInProgress) {
  // 1.创建当前 fiber 的dom
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = renderDom(workInProgress.element);
  }

  // render 和 commit 分离。在 render 阶段去只处理工作单元，创建 dom 但是不挂载 dom，
  // 等到所有的工作单元全部处理完成之后，再在 commit 阶段同步执行 dom 的挂载。

  // if (workInProgress.return && workInProgress.stateNode) {
  //   let parentFiber = workInProgress.return;

  //   // 什么情况下直接父组件stateNode还没创建好？
  //   // 比如 <ClassComponent value={666} />，其子组件为render的返回值，其本身就是个类似Fragment的套壳（renderDom返回stateNode为null）
  //   // 父组件为div.deep1-box。所以子组件直接找到div.deep1-box进行挂载。
  //   while (!parentFiber.stateNode) {
  //     parentFiber = parentFiber.return;
  //   }

  //   parentFiber.stateNode.appendChild(workInProgress.stateNode);
  // }

  // 2.深度遍历创建子fiber，构建fiber树
  // console.log("workInProgressRoot", workInProgressRoot, workInProgress);

  let children = workInProgress.element?.props?.children;
  let type = workInProgress.element?.type;

  if (typeof type === 'function') {
    // 当前 fiber 对应 React 组件时，对其 return 迭代
    if (type.prototype.isReactComponent) {
      // 类组件，通过生成的类实例的 render 方法返回 jsx
      const { props, type: Comp } = workInProgress.element;
      const component = new Comp(props);
      const jsx = component.render();
      children = [jsx];
    } else {
      // 函数组件，直接调用函数返回 jsx
      const { props, type: Fn } = workInProgress.element;
      const jsx = Fn(props);
      children = [jsx];
    }
  }

  if (children || children === 0) {
    let elements = Array.isArray(children) ? children : [children];
    elements = elements.flat();
    // diff
    reconcileChildren(workInProgress, elements);
  }

  // 3.设置下一个工作单元
  if (workInProgress.child) { // 深度遍历，优先遍历子节点
    nextUnitOfWork = workInProgress.child;
  } else {
    let nextFiber = workInProgress;

    while (nextFiber) {
      if (nextFiber.sibling) {
        nextUnitOfWork = nextFiber.sibling;
        return;
      } else {
        // 子 fiber 和兄弟 fiber 都没有，深度优先遍历返回上一层
        nextFiber = nextFiber.return;
      }
    }

    if (!nextFiber) {
      // 若返回最顶层，表示迭代结束，将 nextUnitOfWork 置空
      nextUnitOfWork = null;
    }
  }

}

// packages/scheduler/src/Scheduler.js 

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    // 循环执行工作单元任务
    performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // 在 workLoop 中，当 nextUnitOfWork 为 null 且 workInProgressRoot 存在时，
  // 表示 render 阶段执行结束，开始调用 commitRoot 函数进入 commit 阶段
  if (!nextUnitOfWork && workInProgressRoot) {
    // 表示进入 commit 阶段
    commitRoot(workInProgressRoot);
    currentRoot = workInProgressRoot;
    workInProgressRoot = null;
    deletions = [];
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);


// 1.对于打上了 Deletion flag 的 fiber，说明是在之前 current fiber 树中有，
//   但是 workInProgress fiber 树中没有的，那么我们在 workInProgress fiber 树中遍历是找不到它的。
// 2.要删除的元素，只需要从它的父节点上直接删除它就行，不需要再去遍历整个 fiber 树 所以基于以上两点，
//   我们需要一个全局的 deletions 数组，存储所有要删除 dom 的对应 fiber。

let deletions = []; // 要执行删除 dom 的 fiber

// 将某个 fiber 加入 deletions 数组
export function deleteFiber(fiber) {
  deletions.push(fiber);
}

// 获取 deletions 数组
export function getDeletions() {
  return deletions;
}