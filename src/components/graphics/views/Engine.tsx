import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Renderer from '../controllers/Renderer';
import Physics from '../controllers/Physics';

interface Props {
}
interface State {
  width: number;
  height: number;
}

export default class Engine extends React.Component<Props, State> {
  private renderer: Renderer;
  private physics: Physics;
  private mounted: boolean;
  private lastRender: number;

  constructor() {
    super();
    this.mounted = false;
    this.lastRender = Date.now();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    this.renderer = Renderer.getInstance();
    this.physics = Physics.getInstance();
  }

  private step = (progress: number) => {
    this.renderer.renderFrame(this.physics.getScene());
    this.physics.animate(progress);
  }

  private start = () => {
    let self = this;
    let progress = (Date.now() - this.lastRender) / 10;
    this.step(progress);
    this.lastRender = Date.now();
    setTimeout(() => {
      requestAnimationFrame(self.start);
    }, 1000 / 60);
  }

  private componentDidMount() {
    this.mounted = true;
    window.addEventListener("resize", this.updateDimensions.bind(this));
    const canvas = ReactDOM.findDOMNode(this.refs['canvas']);
    this.renderer.mount(canvas);
    this.updateDimensions();
    this.start();
  }

  private componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this.mounted = false;
  }

  private updateDimensions() {
    this.mounted && this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.renderer.updateDimensions(this.state.width, this.state.height);
  }

  render() {
    const self = this;
    const canvasStyle = {
      top: 0,
      zIndex: -1,
      position: "fixed",
    }

    return (
      <div>
        <canvas id="canvas" ref="canvas"
          width={this.state.width} height={this.state.height}
          style={canvasStyle} />
      </div>
    )
  }
}