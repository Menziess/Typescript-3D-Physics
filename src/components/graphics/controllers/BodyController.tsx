import * as THREE from 'three';
import * as OIMO from 'oimo';

export default class BodyController {

  private world: OIMO.World;
  private bodies: THREE.Mesh[];

  // Initializes attributes
  constructor() {
    this.world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 1, // scale full world 
      random: true,  // randomize sample
      info: false,   // calculate statistic or not
      gravity: [0, -9.8, 0]
    });

    this.bodies = [];
  };

  // Add array of bodies to controller
  protected addBodies(bodies: THREE.Mesh[]) {
    bodies.forEach(body => {
      this.bodies.push(body);
    });
  }

  // Animate bodies with physics
  public animate() {
    this.world.step();
    this.bodies.forEach(element => {
    //   element.position.copy(element.phys.getPosition());
    //   element.quaternion.copy(element.phys.getQuaternion());
      element.rotation.x += 0.1;
      element.rotation.y += 0.1;
    });
  }

  public initBodies(scene: THREE.Scene) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xeeffee });
    const cube = new THREE.Mesh(geometry, material);
    this.addBodies([cube]);
    scene.add(cube);
  }

  // private addBody(body: any) {
  //   this.bodies.push({
  //     'mesh': body,
  //     'phys': this.world.add({
  //       world: this.world,
  //       type: 'box',
  //       size: Object.values(body.getWorldScale()),
  //       pos: Object.values(body.getWorldPosition()),
  //       rot: Object.values(body.getWorldRotation()),
  //       density: 1,
  //       move: true,
  //       mass: -2
  //     })
  //   });
  //   this.scene.add(body);
  // }
}