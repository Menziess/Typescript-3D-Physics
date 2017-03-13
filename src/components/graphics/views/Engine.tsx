import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Renderer from '../controllers/Renderer';
import Physics from '../controllers/Physics';
import Camera from '../controllers/Camera';
import Scene from '../controllers/Scene';

import Models from '../controllers/Models';

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
  private static models: Models;
  private static scene: Scene;

  private static CANVAS_ID = "canvas";
  private mounted: boolean;
  private physicsEnabled: boolean;

  private constructor() {
    super();
    this.mounted = false;
    this.physicsEnabled = true;
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    Engine.renderer = Renderer.getInstance(this);
    Engine.physics = Physics.getInstance(this);
    Engine.camera = Camera.getInstance(this);
    Engine.models = Models.getInstance(this);
    Engine.scene = Scene.getInstance(this);
  }

  public getRenderer() { return Engine.renderer; }
  public getPhysics() { return Engine.physics; }
  public getModels() { return Engine.models; }
  public getCamera() { return Engine.camera; }
  public getScene() { return Engine.scene; }

  private init() {
    Engine.renderer.init();
    Engine.physics.init();
    Engine.models.init();
    Engine.camera.init();
    Engine.scene.init();
  }

  private start() {
    Engine.renderer.startRender(this.physicsEnabled);
  }

  private componentDidMount() {
    this.mounted = true;
    window.addEventListener("resize", this.updateDimensions.bind(this));
    const canvas = ReactDOM.findDOMNode(this.refs[Engine.CANVAS_ID]);
    Engine.renderer.mount(canvas);
    Engine.camera.mount(canvas);
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