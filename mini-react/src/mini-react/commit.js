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

import { updateAttributes } from './react-dom';
import { getDeletions } from './fiber';

export function commitRoot(rootFiber) {
  // 删除操作
  const deletions = getDeletions();
  deletions.forEach(commitWork);

  commitWork(rootFiber.child);
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  let parentDom = fiber.return.stateNode;

  // 对于删除 dom，我们只要对 deletions 数组遍历一遍执行删除动作即可，删除完毕直接 return
  if (fiber.flag === 'Deletion') {
    if (typeof fiber.element?.type !== 'function') {
      parentDom.removeChild(fiber.stateNode);
    }
    return;
  }

  // 深度优先遍历，先遍历 child，后遍历 sibling
  commitWork(fiber.child);

  if (fiber.flag === 'Placement') {
    const targetPositionDom = parentDom.childNodes[fiber.index];

    if (targetPositionDom) {
      // targetPositionDom 存在，则插入
      parentDom.insertBefore(fiber.stateNode, targetPositionDom);
    } else {
      // targetPositionDom 不存在，插入到最后
      parentDom.appendChild(fiber.stateNode);
    }
  } else if (fiber.flag === 'Update') {
    const { children, ...newAttributes } = fiber.element.props;
    const oldAttributes = Object.assign({}, fiber.alternate.element.props);
    delete oldAttributes.children;

    updateAttributes(fiber.stateNode, newAttributes, oldAttributes);
  }

  // parentDom.appendChild(fiber.stateNode);
  commitWork(fiber.sibling);
}