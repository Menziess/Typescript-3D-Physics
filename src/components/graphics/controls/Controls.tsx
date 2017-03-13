import PointerLockControls from './PointerLockControls';
import * as THREE from 'three';

export default class Controls extends PointerLockControls {

  private controlsEnabled = true;
  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private canJump = false;
  private camera: THREE.Camera;

  public velocity = new THREE.Vector3();

  constructor(camera: THREE.Camera) {
    super(camera);
    this.camera = camera;
    document.addEventListener("keydown", this.onKeyDown, false);
    document.addEventListener("keyup", this.onKeyDown, false);
  }

  public onKeyDown = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = true;
        break;
      case 37: // left
      case 65: // a
        this.moveLeft = true;
        break;
      case 40: // down
      case 83: // s
        this.moveBackward = true;
        break;
      case 39: // right
      case 68: // d
        this.moveRight = true;
        break;
      case 32: // space
        if (this.canJump === true) this.velocity.y += 350;
        this.canJump = false;
        break;
    }
  }

  public onKeyUp = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = false;
        break;
      case 37: // left
      case 65: // a
        this.moveLeft = false;
        break;
      case 40: // down
      case 83: // s
        this.moveBackward = false;
        break;
      case 39: // right
      case 68: // d
        this.moveRight = false;
        break;
    }
  }

  public animate(progress: number) {
    
  }
}