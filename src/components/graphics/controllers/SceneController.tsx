import * as THREE from 'three';

import BodyController from './BodyController';

const OrbitControls = require('three-orbit-controls')(THREE);

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
    this.initScene();

    this.camera = new THREE.PerspectiveCamera(90, width / height, 1, 10000);
    this.camera.position.set(0.2, 2, 7);

    this.bodyController = new BodyController(this.scene);
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
    const controls = new OrbitControls(this.camera, canvas);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, precision: "mediump", antialias: true });
    this.renderer.setClearColor(this.bgColor, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.initObjects();
  }

  // Initialise objects
  private initObjects() {
    this.bodyController.initGround();
    this.bodyController.initBodies();
  }

  // Renders one frame
  public renderFrame() {
    this.bodyController.animate();
    this.renderer.render(this.scene, this.camera);
  }

  private initScene() {
    this.scene.add(new THREE.AmbientLight(this.bgColor));

    let light = new THREE.DirectionalLight(0xffff00, 1);
    light.position.set(2, 2, 2);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    let d = 500;
    light.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
    this.scene.add(light);
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0128);

    let grid = new THREE.GridHelper(200, 10);
    this.scene.add(grid);
  }
}