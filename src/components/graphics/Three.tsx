import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as React3 from 'react-three-renderer';
import * as THREE from 'three';
import * as OIMO from 'oimo';

interface Props {
}
interface State {
  width: number;
  height: number;
}

export default class Three extends React.Component<Props, State> {
  world: any;
  scene: any;
  camera: any;
  renderer: any;
  mounted: boolean;
  bodies: any;

  constructor() {
    super();
    this.mounted = false;

    // Initialize width and height
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    // Create physics world
    this.world = new OIMO.World({info:false, worldscale:100});
    this.world.add({ size: [50, 10, 50], pos: [0, -5, 0] });
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
    this.camera = new THREE.PerspectiveCamera(75, this.state.width / this.state.height, 0.1, 1000);
    this.camera.position.z = 6;

    // Instantiate bodies array
    this.bodies = new Array();
  }

  private updateDimensions() {
    this.mounted && this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    if (this.renderer) {
      this.camera.aspect = this.state.width / this.state.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.state.width,
        this.state.height,
        false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.updateDimensions();

    // Render scene
    const canvas = ReactDOM.findDOMNode(this.refs['canvas']);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
    this.initModels();
    this.loop();
  }

  private initModels() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xeeffee });
    const cube = new THREE.Mesh(geometry, material);
    this.addBody(cube);
  }

  private addBodies(elements: any[]) {
    elements.forEach(element => {
      this.addBody(element);
    });
  }

  private addBody(element: any) {
    this.bodies.push({
      'mesh': element,
      'phys': this.world.add({
        type: 'sphere',
        size: [element.geometry.depth, element.geometry.width, element.geometry.height],
        pos: Array.from(element.getWorldPosition()),
        position: [1,1,1],
        density: 1,
        move: true
      })
    });
    console.log(this.bodies[0].phys.position);
    this.scene.add(element);
  }

  /*
   * Main render loop
   */
  private loop = () => {
    this.animate();
    requestAnimationFrame(this.loop);
    this.renderer.render(this.scene, this.camera);
  }

  /*
   * Animation definitions
   */
  private animate() {
    this.world.step();
    this.bodies.forEach(element => {
      element.mesh.position.copy(element.phys.getPosition());
      // console.log(element.phys.getPosition());
    });
    this.bodies[0].mesh.rotation.x += 0.02;
    this.bodies[0].mesh.rotation.y += 0.01;
  }

  render() {
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