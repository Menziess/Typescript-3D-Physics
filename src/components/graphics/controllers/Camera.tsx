import * as THREE from 'three';
import Engine from '../views/Engine';

// const OrbitControls = require('three-orbit-controls')(THREE);
const FirstPersonControls = require('three-first-person-controls')(THREE);

// import Controls from '../controls/Controls';

export default class Camera extends THREE.PerspectiveCamera {
  private static instance: Camera = new Camera();
  private static engine: Engine;
  public controls: any;

  private constructor() {
    let fov = 70;
    let near = 0.1;
    let far = 10000;
    let width = 800;
    let height = 600;
    super(fov, width / height, near, far);
    this.position.set(0.2, 15, 30);
  } 

  public static getInstance(engine: Engine) {
    Camera.engine = engine;
    return this.instance;
  }

  public init() {
    //
  }

  public animate(progress: number) {
    // this.controls.animate(progress);
    this.controls.update(progress);
  }

  public mount(canvas: HTMLCanvasElement) {
    // this.controls = new OrbitControls(this, canvas);
    this.controls = new THREE.FirstPersonControls(this, canvas);

    // this.controls = new Controls(this);
    // Camera.engine.getScene().add(this.controls.getObject());
  }
}