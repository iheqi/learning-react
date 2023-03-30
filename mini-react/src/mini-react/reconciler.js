import { deleteFiber } from './fiber';

// 将 performUnitOfWork 函数中的构造 fiber 树逻辑迁移到该函数中
// 与之前的逻辑相比，就是diff后打 flag 标签，后续commit时要依据flag来操作dom

export function reconcileChildren(workInProgress, elements) {
  let index = 0; // 当前遍历的子元素在父节点下的下标
  let prevSibling = null; // 记录上一个兄弟节点
  let oldFiber = workInProgress?.alternate?.child; // 对应的旧 fiber

  while (index < elements.length || oldFiber) {
    // 遍历子元素
    const element = elements[index];

    let isSameType =
      element?.type &&
      oldFiber?.element?.type &&
      element.type === oldFiber.element.type;

    if (typeof element === 'string' && typeof oldFiber?.element === 'string') {
      isSameType = true
    }

    // if (!isSameType) {
    //   console.log('fuck');
    // }
    // 创建新的 fiber
    // 原代码初始化为null，但走下去可能报错
    let newFiber = null;
    // let newFiber = {
    //   element,
    //   stateNode: null,
    //   return: workInProgress // 指向父fiber
    // }

    // 添加 flag 副作用
    if (isSameType) {
      // type相同，表示更新
      newFiber = {
        element: {
          ...element,
          props: element.props,
        },
        stateNode: oldFiber.stateNode,
        return: workInProgress,
        alternate: oldFiber,
        flag: 'Update', // 打上更新标签
      };
    } else {
      // type 不同，表示添加或者删除
      if (element || element === 0) {
        // element 存在，表示添加
        newFiber = {
          element,
          stateNode: null,
          return: workInProgress,
          alternate: null,
          flag: 'Placement',
          index,
        };
      }
      if (oldFiber) {
        // oldFiber存在，删除 oldFiber
        oldFiber.flag = 'Deletion';
        deleteFiber(oldFiber);
      }
    }

    if (oldFiber) {
      // oldFiber 存在，则继续遍历其 sibling
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      // 如果下标为 0，则将当前fiber设置为父 fiber 的 child
      workInProgress.child = newFiber;
      prevSibling = newFiber;
    } else if (newFiber) {
      // newFiber 和 prevSibling 存在，通过 sibling 作为兄弟 fiber 连接
      prevSibling.sibling = newFiber;
      prevSibling = newFiber;
    }

    index++;
  }
}