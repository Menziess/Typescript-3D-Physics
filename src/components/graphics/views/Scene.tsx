import * as React from 'react';
import * as ReactDOM from 'react-dom';

import RenderController from '../controllers/RenderController';
import PhysicsController from '../controllers/PhysicsController';

interface Props {
}
interface State {
  width: number;
  height: number;
}

export default class Scene extends React.Component<Props, State> {
  private renderController: RenderController;
  private physicsController: PhysicsController;
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
    this.renderController = RenderController.getInstance();
    this.physicsController = PhysicsController.getInstance();
  }

  private step = (progress: number) => {
    this.renderController.renderFrame(this.physicsController.getScene());
    this.physicsController.animate(progress);
  }

  private start = () => {
    let self = this;
    let progress = (Date.now() - this.lastRender) / 10;
    this.step(progress);
    this.lastRender = Date.now();
    setTimeout(() => {
      requestAnimationFrame(self.start);
    }, 1000 / 200);
  }

  private componentDidMount() {
    this.mounted = true;
    window.addEventListener("resize", this.updateDimensions.bind(this));
    const canvas = ReactDOM.findDOMNode(this.refs['canvas']);
    this.renderController.mount(canvas);
    this.updateDimensions();
    this.initObjects();
    this.start();
  }

  private componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this.mounted = false;
  }

  private initObjects() {
    this.physicsController.initGround();
    this.physicsController.initBodies();
  }

  private updateDimensions() {
    this.mounted && this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.renderController.updateDimensions(this.state.width, this.state.height);
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