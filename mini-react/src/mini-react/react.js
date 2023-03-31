import { commitRender, getCurrentFunctionFiber, getHookIndex } from './fiber';

export class Component {
  constructor(props) {
    this.props = props;
  }
}

Component.prototype.isReactComponent = true;

Component.prototype.setState = function (param) {
  if (typeof param === 'function') {
    const result = param(this.state, this.props);
    this.state = {
      ...this.state,
      ...result
    }
  } else {
    this.state = {
      ...this.state,
      ...param
    }
  }

  commitRender();
}

Component.prototype._UpdateProps = function (props) {
  this.props = props;
};

export function useState(initial) {
  const currentFunctionFiber = getCurrentFunctionFiber();
  const hookIndex = getHookIndex();

  const oldHook = currentFunctionFiber?.alternate?.hooks?.[hookIndex];

  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  }

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state)
  });

  const setState = (action) => {
    if (typeof action === 'function') {
      hook.queue.push(action);
    } else {
      hook.queue.push(() => {
        return action;
      });
    }

    commitRender();
  }
  currentFunctionFiber.hooks.push(hook);
  return [hook.state, setState];
}