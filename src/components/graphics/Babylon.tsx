import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props { }
interface State {
  width: number;
  height: number;
}

export default class Babylon extends React.Component<Props, State> {
  BABYLON: any;
  canvas: any;
  engine: any;
  scene: any;
  camera: any;
  light: any;

  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  updateDimensions() {
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    if (this.engine)
      this.engine.resize();    
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.canvas = ReactDOM.findDOMNode(this.refs['canvas']);
    this.BABYLON = require('babylonjs');
    if (this.BABYLON.Engine.isSupported()) {
      this.initScene(this.BABYLON);
    }
  }

  initScene(BABYLON) {
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    // this.scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.OimoJSPlugin());
    this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,4,-10), this.scene);
    this.camera.setTarget(new BABYLON.Vector3(0,0,10));
    this.camera.attachControl(this.canvas);
    this.light = new BABYLON.PointLight("light", new BABYLON.Vector3(0,5,-5), this.scene);
    this.engine.runRenderLoop(() => {
      this.initModels(BABYLON);
      this.scene.render();
    });
  }

  initModels(BABYLON) {
    BABYLON.Mesh.CreateSphere("sphere", 10, 1, this.scene);
    BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this.scene);
  }
  
  render() {
    const canvasStyle = {
      top: 0,
      position: "fixed",
      width: window.innerWidth,
      height: window.innerHeight,
      zIndex: -1
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