import React from 'react';

export default class StateDemo extends React.Component {
  constructor(props) {
    super(props);

    // 第一：state要在构造函数中声明
    this.state = {
      count: 0
    }
  }

  render() {
    return <div>
      <p>{this.state.count}</p>
      <button onClick={this.increase}>add</button>
    </div>
  }

  // increase = () => {
  //   // 第二：不要直接修改state，不可变值
  //   // this.state.count++; // 无效
  //   this.setState({ count: this.state.count + 1 }, () => {
  //     console.log('count by callback', this.state.count); // 可以传递第二个参数，获取更新后的值
  //   });

  //   // 第三，setState 可能是异步的，也有可能是同步的
  //   console.log('count', this.state.count);

  //   // setTimeout 中 setState 是同步的
  //   setTimeout(() => {
  //     this.setState({ count: this.state.count + 1 });
  //     console.log('count in setTimeout', this.state.count);
  //   })
  // }

  componentDidMount() {
    // 自己定义的 DOM 事件，setState 是同步的
    document.body.addEventListener('click', () => {
      this.setState({ count: this.state.count + 1 });
      console.log('count in body event', this.state.count);
    })
  }
}