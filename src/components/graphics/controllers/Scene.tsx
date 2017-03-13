import * as THREE from 'three';
import Engine from '../views/Engine';


export default class Scene extends THREE.Scene {
  private static instance: Scene = new Scene();
  private static engine: Engine;

  private lights: THREE.Light[];

  private constructor() {
    super();
    this.lights = [];
  } 

  public static getInstance(engine: Engine) {
    Scene.engine = engine;
    return this.instance;
  }

  public init() {
    this.initLights();
    this.fog = new THREE.FogExp2(0x000000, 0.0128);
    let grid = new THREE.GridHelper(200, 10);
    this.add(grid);
  }

  private initLights() {
    // AMBIENT
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.lights.push(ambientLight);
    
    // DIRECTIONAL
    let directionalLight = new THREE.DirectionalLight(0xffff00, 1);
    directionalLight.position.set(2, 2, 2);
    directionalLight.target.position.set(0, 0, 0);
    this.lights.push(directionalLight);

    // ADD TO SCENE
    this.lights.forEach((element) => {
      this.add(element);
    });
  }
}