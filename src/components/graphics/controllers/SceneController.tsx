import * as THREE from 'three';

import BodyController from './BodyController';

const OrbitControls = require( 'three-orbit-controls' )( THREE );

export default class SceneController {

  private bgColor: number;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private bodyController: BodyController;

  // Initializes attributes
  constructor(width: number, height: number) {
    this.bgColor = 0x252627;

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(this.bgColor));

    this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
    this.camera.position.z = 6;

    this.bodyController = new BodyController();
  };

  // Updates dimensions
  public updateDimensions(width: number, height: number) {
    if (this.renderer) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  // Mounts renderer
  public mount(canvas: HTMLCanvasElement) {
    const controls = new OrbitControls( this.camera, canvas);  
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, precision: "mediump" });
    this.renderer.setClearColor(this.bgColor, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.bodyController.initBodies(this.scene);
  }

  // Renders one frame
  public renderFrame() {
    this.bodyController.animate();
    this.renderer.render(this.scene, this.camera);
  }
}