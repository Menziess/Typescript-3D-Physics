import * as THREE from 'three';
import Engine from '../views/Engine';

// const OrbitControls = require('three-orbit-controls')(THREE);
import Controls from '../controls/Controls';

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
    console.log(this.controls.moveForward);
    if (this.controls.controlsEnabled) {
      // console.log("x: " + this.controls.velocity.x + " y: " + this.controls.velocity.y + " z: " + this.controls.velocity.z);
      this.controls.velocity.x -= this.controls.velocity.x * 10.0 * progress;
      this.controls.velocity.z -= this.controls.velocity.z * 10.0 * progress;
      this.controls.velocity.y -= 9.8 * 100.0 * progress;
      if (this.controls.moveForward) this.controls.velocity.z -= 400.0 * progress;
      if (this.controls.moveBackward) this.controls.velocity.z += 400.0 * progress;
      if (this.controls.moveLeft) this.controls.velocity.x -= 400.0 * progress;
      if (this.controls.moveRight) this.controls.velocity.x += 400.0 * progress;
      this.controls.getObject().translateX(this.controls.velocity.x * progress);
      this.translateY(this.controls.velocity.y * progress);
      this.translateZ(this.controls.velocity.z * progress);
      if (this.position.y < 10) {
        this.controls.velocity.y = 0;
        this.position.y = 10;
        this.controls.canJump = true;
      }
    }
    this.controls.animate(progress);
  }

  public mount(canvas: HTMLCanvasElement) {
    // this.controls = new OrbitControls(this, canvas);
    this.controls = new Controls(this);
    Camera.engine.getScene().add(this.controls.getObject());
  }
}