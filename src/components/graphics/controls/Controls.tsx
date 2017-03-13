import PointerLockControls from './PointerLockControls';
import * as THREE from 'three';

export default class Controls extends PointerLockControls {

  private static moveForward: boolean;
  private static moveBackward: boolean;
  private static moveLeft: boolean;
  private static moveRight: boolean;
  private static canJump: boolean;
  private static camera: THREE.Camera;

  public velocity = new THREE.Vector3();

  constructor(camera: THREE.Camera) {
    super(camera);
    Controls.camera = camera;
    Controls.moveForward = false;
    Controls.moveBackward = false;
    Controls.moveLeft = false;
    Controls.moveRight = false;
    Controls.canJump = false;
    document.addEventListener("keydown", this.onKeyDown, false);
    document.addEventListener("keyup", this.onKeyDown, false);
  }

  public onKeyDown = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        Controls.moveForward = true;
        break;
      case 37: // left
      case 65: // a
        Controls.moveLeft = true;
        break;
      case 40: // down
      case 83: // s
        Controls.moveBackward = true;
        break;
      case 39: // right
      case 68: // d
        Controls.moveRight = true;
        break;
      case 32: // space
        if (Controls.canJump === true) this.velocity.y += 350;
        Controls.canJump = false;
        break;
    }
  }

  public onKeyUp = function (event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        Controls.moveForward = false;
        break;
      case 37: // left
      case 65: // a
        Controls.moveLeft = false;
        break;
      case 40: // down
      case 83: // s
        Controls.moveBackward = false;
        break;
      case 39: // right
      case 68: // d
        Controls.moveRight = false;
        break;
    }
  }

  public animate(progress: number) {
    const SPEED = 0.005;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.velocity.z = 0;
    if (Controls.moveForward) this.velocity.z -= SPEED * progress;
    else this.velocity.z += SPEED * progress;
    if (Controls.moveBackward) this.velocity.z += SPEED * progress;
    else this.velocity.z -= SPEED * progress;

    if (Controls.moveLeft) this.velocity.x -= SPEED * progress;
    else this.velocity.x -= SPEED * progress;
    if (Controls.moveRight) this.velocity.x += SPEED * progress;
    else this.velocity.x -= SPEED * progress;

    Controls.camera.translateX(this.velocity.x * progress);
    Controls.camera.translateY(this.velocity.y * progress);
    Controls.camera.translateZ(this.velocity.z * progress);
  }
}