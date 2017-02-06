import * as THREE from 'three';
import * as OIMO from 'oimo';

import Box from '../models/Box';

export default class BodyController {

  private world: OIMO.World;
  private scene: THREE.Scene;
  private bodies: THREE.Mesh[];
  private physics: OIMO.Body[];
  public ToRad: number;

  // material
  matSphere = new THREE.MeshBasicMaterial({ name: 'sph', transparent: true, opacity: 0.6, reflectivity: 120});
  matHead = new THREE.MeshBasicMaterial({ color: 0xe8b36d, name: 'sphHH', reflectivity: 60 });
  matBox = new THREE.MeshBasicMaterial({ name: 'box', reflectivity: 100 });
  matBox2 = new THREE.MeshBasicMaterial({ name: 'box2', reflectivity: 100 });
  matBox3 = new THREE.MeshBasicMaterial({ name: 'box3', reflectivity: 100 });
  matSphereSleep = new THREE.MeshBasicMaterial({ name: 'ssph', transparent: true, opacity: 0.8 });
  matBoxSleep = new THREE.MeshBasicMaterial({ name: 'sbox' });
  matBoxSleep2 = new THREE.MeshBasicMaterial({ name: 'sbox2' });
  matBoxSleep3 = new THREE.MeshBasicMaterial({ name: 'sbox3' });
  matGround = new THREE.MeshBasicMaterial({ color: 0x3D4143, transparent: true, opacity: 0.5, reflectivity: 10 });

  // Initializes attributes
  constructor(scene: THREE.Scene) {
    this.world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 1, // scale full world 
      random: true,  // randomize sample
      info: false,   // calculate statistic or not
      gravity: [0, -9.8, 0]
    });

    this.scene = scene;
    this.bodies = [];
    this.physics = [];
    this.ToRad = 0.0174532925199432957;
  };

  // Animate bodies with physics
  public animate() {
    this.world.step();
    this.bodies.forEach((element, index) => {
      element.position.copy(this.physics[index].getPosition());
      element.quaternion.copy(this.physics[index].getQuaternion());
    });
  }

  // Create some bodies
  public initBodies() {
    let cube = new Box(undefined, this.matHead);
    let cube1 = new Box(undefined, this.matBox);
    let cube2 = new Box(undefined, this.matBox3);
    let cube3 = new Box(undefined, this.matBoxSleep2);
    let cube4 = new Box(undefined, this.matSphere);
    let cube5 = new Box(undefined, this.matHead);
    this.addBodies([cube, cube1, cube2, cube3, cube4, cube5]);
  }

  public initGround() {
    let ground0 = this.world.add({ size: [40, 40, 390], pos: [-180, 20, 0], world: this.world });
    let ground1 = this.world.add({ size: [40, 40, 390], pos: [180, 20, 0], world: this.world });
    let ground2 = this.world.add({ size: [400, 80, 400], pos: [0, -40, 0], world: this.world });
  }

  // Add array of bodies to controller
  private addBodies(bodies: THREE.Mesh[]) {
    bodies.forEach(body => {
      this.bodies.push(body);
      this.scene.add(body);
    });
    bodies.forEach((body, index) => {
      this.physics[index] = this.world.add({
        world: this.world,
        type: 'box',
        size: Object.values(body.getWorldScale()),
        pos: Object.values(body.getWorldPosition()),
        rot: Object.values(body.getWorldRotation()),
        collision: true,
        density: 20,
        move: true,
        mass: 30,
      })
    });
  }
}