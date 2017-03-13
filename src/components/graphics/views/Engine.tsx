import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Renderer from '../controllers/Renderer';
import Physics from '../controllers/Physics';
import Camera from '../controllers/Camera';
import Scene from '../controllers/Scene';

interface Props {
}
interface State {
  width: number;
  height: number;
}

export default class Engine extends React.Component<Props, State> {
  private static renderer: Renderer;
  private static physics: Physics;
  private static camera: Camera;
  private static scene: Scene;

  private mounted: boolean;
  private lastRender: number;

  private constructor() {
    super();
    this.mounted = false;
    this.lastRender = Date.now();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    Engine.renderer = Renderer.getInstance(this);
    Engine.physics = Physics.getInstance(this);
    Engine.camera = Camera.getInstance(this);
    Engine.scene = Scene.getInstance(this);
  }

  public getRenderer() { return Engine.renderer; }
  public getPhysics() { return Engine.physics; }
  public getCamera() { return Engine.camera; }
  public getScene() { return Engine.scene; }

  private init() {
    Engine.renderer.init();
    Engine.physics.init();
    Engine.camera.init();
    Engine.scene.init();
  }

  private step = (progress: number) => {
    Engine.renderer.renderFrame(Engine.scene);
    Engine.physics.animate(progress);
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
    Engine.renderer.mount(canvas);
    this.updateDimensions();
    this.init();
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
    Engine.renderer.updateDimensions(this.state.width, this.state.height);
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