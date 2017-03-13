import * as THREE from 'three';
import Engine from '../views/Engine';

export default class Models {
  private static instance: Models = new Models();
  private static engine: Engine;

  private meshes: THREE.Mesh[];

  private constructor() {
    this.meshes = [];
  }

  public static getInstance(engine: Engine) {
    Models.engine = engine;
    return this.instance;
  }

  public init() {
    this.initGeometry();
    this.addMeshesToScene();
  }

  public animate(progress: number) {
    this.meshes.forEach((element) => {
      element.rotateX(progress * 0.002);
      element.rotateY(progress * 0.002);
    });
  }

  private initGeometry() {
    let material = new THREE.MeshLambertMaterial({ color: 0xffeeff });

    let boxGeometry = new THREE.BoxBufferGeometry(100, 100, 100)
    let mesh = new THREE.Mesh(boxGeometry, material);
    mesh.position.z = -100;
    this.meshes.push(mesh);

    let torusGeometry = new THREE.TorusBufferGeometry(100, 30, 16, 100);
    let mesh2 = new THREE.Mesh(torusGeometry, material);
    this.meshes.push(mesh2);
  }

  private addMeshesToScene() {
    this.meshes.forEach((element) => {
      Models.engine.getScene().add(element);
    })
  }
}