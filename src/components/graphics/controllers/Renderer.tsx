import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

export default class RenderController {
  private static instance: RenderController = new RenderController();
  private fps: number;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private constructor(width?: number, height?: number) {
    let fov = 80;
    let near = 0.1;
    let far = 10000;
    width = (width) ? width : 800;
    height = (height) ? height : 600;
    this.fps = 60;
    this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    this.camera.position.set(0.2, 15, 30);
  };

  public static getInstance() {
    return this.instance;
  }

  public updateDimensions(width: number, height: number) {
    if (this.renderer) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  public mount(canvas: HTMLCanvasElement) {
    const controls = new OrbitControls(this.camera, canvas);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, precision: "mediump", antialias: true });
    this.renderer.setClearColor(0x252627, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
  }

  public renderFrame(scene: THREE.Scene) {
    this.renderer.render(scene, this.camera);
  }
}