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

  constructor() {
    super();
    this.mounted = false;
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    this.renderController = RenderController.getInstance();
    this.physicsController = PhysicsController.getInstance();
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

  private step = () => {
    this.renderController.renderFrame(this.physicsController.getScene());
    this.physicsController.animate();
  }

  private start() {
    setInterval(this.step, 1000 / 60);
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