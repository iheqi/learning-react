// render 和 commit 分离

// performUnitOfWork的代码中还有一个问题，我们在迭代的过程中，每处理完一个 fiber，就创建相应 dom 挂载到页面上。
// 但是我们的迭代任务是可中断的，如果中途中断，那么在页面上用户就会看到不完整的 ui：

// function performUnitOfWork(fiber) {
//   // ...

//   if (workInProgress.return && workInProgress.stateNode) {
//     // 如果 fiber 有父 fiber且有 dom
//     // 向上寻找能挂载 dom 的节点进行 dom 挂载
//     let parentFiber = workInProgress.return;
//     while (!parentFiber.stateNode) {
//       parentFiber = parentFiber.return;
//     }
//     parentFiber.stateNode.appendChild(workInProgress.stateNode);
//   }

//   // ...
// }

// 这并不是我们理想的效果，我们可以考虑将所有的 dom 都创建完成之后再挂载到页面上。
// 这就要分成 react 的 render 和 commit 阶段，我们在 render 阶段去只处理工作单元，创建 dom 但是不挂载 dom，
// 等到所有的工作单元全部处理完成之后，再在 commit 阶段同步执行 dom 的挂载。


export function commitRoot(workInProgressRoot) {
  commitWork(workInProgressRoot.child);
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  commitWork(fiber.child);
  let parentDom = fiber.return.stateNode;

  if (fiber.stateNode === null) {
    console.log(fiber);
  }

  parentDom.appendChild(fiber.stateNode);
  commitWork(fiber.sibling);
}