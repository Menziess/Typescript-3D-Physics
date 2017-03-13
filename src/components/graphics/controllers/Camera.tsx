import * as THREE from 'three';
import Engine from '../views/Engine';

const OrbitControls = require('three-orbit-controls')(THREE);

export default class Camera extends THREE.PerspectiveCamera {
  private static instance: Camera = new Camera();
  private static engine: Engine;

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

  public mount(canvas: HTMLCanvasElement) {
    new OrbitControls(this, canvas);
  }
}