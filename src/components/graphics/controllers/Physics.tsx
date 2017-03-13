import * as THREE from 'three';
import * as OIMO from 'oimo';
import Engine from '../views/Engine';

import Box from '../models/Box';

export default class Physics {
  private static instance: Physics = new Physics();
  private static engine: Engine;
  private world: OIMO.World;
  private bodies: THREE.Mesh[];
  private physics: OIMO.Body[];

  // material
  matSphere = new THREE.MeshLambertMaterial({ name: 'sph', transparent: true, opacity: 0.6, reflectivity: 120 });
  matHead = new THREE.MeshLambertMaterial({ color: 0xe8b36d, name: 'sphHH', reflectivity: 60 });
  matBox = new THREE.MeshLambertMaterial({ name: 'box', reflectivity: 100 });
  matBox2 = new THREE.MeshLambertMaterial({ name: 'box2', reflectivity: 100 });
  matBox3 = new THREE.MeshLambertMaterial({ name: 'box3', reflectivity: 100 });
  matSphereSleep = new THREE.MeshLambertMaterial({ name: 'ssph', transparent: true, opacity: 0.8 });
  matBoxSleep = new THREE.MeshLambertMaterial({ name: 'sbox' });
  matBoxSleep2 = new THREE.MeshLambertMaterial({ name: 'sbox2' });
  matBoxSleep3 = new THREE.MeshLambertMaterial({ name: 'sbox3' });
  matGround = new THREE.MeshLambertMaterial({ color: 0x3D4143, transparent: true, opacity: 0.5, reflectivity: 10 });

  private constructor() {
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
    this.physics = [];
  };

  public static getInstance(engine: Engine) {
    Physics.engine = engine;
    return this.instance;
  }

  public init() {
    this.initBodies();
    this.initGround();
  }

  public animate(progress: number) {
    for (let i = 0; i < progress; i++) {
      this.world.step();  
    }
    this.bodies.forEach((element, index) => {
      element.position.copy(this.physics[index].getPosition());
      element.quaternion.copy(this.physics[index].getQuaternion());
    });
  }

  public initBodies() {
    let cube = new Box(undefined, this.matHead, 'body1');
    let cube1 = new Box(undefined, this.matBox);
    let cube2 = new Box(undefined, this.matBox3);
    let cube3 = new Box(undefined, this.matBoxSleep2);
    let cube4 = new Box(undefined, this.matSphere);
    let cube5 = new Box(undefined, this.matHead, 'body2');
    this.addBodies([cube, cube1, cube2, cube3, cube4, cube5]);
    this.world.add({ type: "joint", body1: 'body1', body2: 'body2'
      , pos1: [0, 1, 0], pos2: [0, -1, 0], min: 20, max: 200, collision: true, spring: false 
    });
  }

  public initGround() {
    let ground0 = this.world.add({ size: [40, 40, 390], pos: [-180, 20, 0], world: this.world });
    let ground1 = this.world.add({ size: [40, 40, 390], pos: [180, 20, 0], world: this.world });
    let ground2 = this.world.add({ size: [400, 80, 400], pos: [0, -40, 0], world: this.world });
  }

  private addBodies(bodies: THREE.Mesh[]) {
    bodies.forEach(body => {
      this.bodies.push(body);
      Physics.engine.getScene().add(body);
    });
    bodies.forEach((body, index) => {
      this.physics[index] = this.world.add({
        name: body.name,
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