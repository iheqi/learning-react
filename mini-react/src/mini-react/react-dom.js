import { createRoot } from './fiber';


function render(element, container) {
  // const dom = renderDom(element);
  // container.appendChild(dom);
  createRoot(element, container);
}

// 将 React.Element 渲染为真实 dom
// 这里不进行深度遍历来创建所有dom，而是只创建当前dom
// 深度遍历将放到 performUnitOfWork 中，随着fiber的遍历而调用renderDom来创建当前dom
export function renderDom(element) {
  let dom = null; // 要返回的 dom

  if (!element && element !== 0) {
    // 条件渲染为假，返回 null
    return null;
  }

  if (typeof element === 'string') {
    // 如果 element 本身为 string，返回文本节点
    dom = document.createTextNode(element);
    return dom;
  }

  if (typeof element === 'number') {
    // 如果 element 本身为 number，将其转为 string 后返回文本节点
    dom = document.createTextNode(String(element));
    return dom;
  }

  const {
    type,
    props: { children, ...attributes },
  } = element;

  if (typeof type === 'string') {
    // 常规 dom 节点的渲染
    dom = document.createElement(type);
  } else if (typeof type === 'function') {
    dom = document.createDocumentFragment();
  } else {
    // 其他情况暂不考虑
    return null
  }

  updateAttributes(dom, attributes);
  return dom;
}

export function updateAttributes(dom, attributes, oldAttributes) {
  if (oldAttributes) {
    // 有旧属性，移除旧属性
    Object.keys(oldAttributes).forEach((key) => {
      if (key.startsWith('on')) {
        // 移除旧事件
        const eventName = key.slice(2).toLowerCase();
        dom.removeEventListener(eventName, oldAttributes[key]);
      } else if (key === 'className') {
        // className 的处理
        const classes = oldAttributes[key].split(' ');
        classes.forEach((classKey) => {
          dom.classList.remove(classKey);
        });
      } else if (key === 'style') {
        // style处理
        const style = oldAttributes[key];
        Object.keys(style).forEach((styleName) => {
          dom.style[styleName] = 'initial';
        });
      } else {
        // 其他属性的处理
        dom[key] = '';
      }
    });
  }

  // 添加新属性
  Object.keys(attributes).forEach((key) => {
    if (key.startsWith('on')) {
      // 事件的处理
      const eventName = key.slice(2).toLowerCase();
      dom.addEventListener(eventName, attributes[key]);
    } else if (key === 'className') {
      // className 的处理
      const classes = attributes[key].split(' ');
      classes.forEach((classKey) => {
        dom.classList.add(classKey);
      });
    } else if (key === 'style') {
      // style处理
      const style = attributes[key];
      Object.keys(style).forEach((styleName) => {
        dom.style[styleName] = style[styleName];
      });
    } else {
      // 其他属性的处理
      dom[key] = attributes[key];
    }
  });
}

const ReactDOM = {
  render
}

export default ReactDOM;