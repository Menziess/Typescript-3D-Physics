import * as THREE from 'three';
import Engine from '../views/Engine';


export default class Scene extends THREE.Scene {
  private static instance: Scene = new Scene();
  private static engine: Engine;

  private constructor() {
    super();
  } 

  public static getInstance(engine: Engine) {
    Scene.engine = engine;
    return this.instance;
  }

  public init() {
    this.add(new THREE.AmbientLight(0x252627));
    let light = new THREE.DirectionalLight(0xffff00, 1);
    light.position.set(2, 2, 2);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    let d = 500;
    light.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
    this.add(light);
    this.fog = new THREE.FogExp2(0x000000, 0.0128);
    let grid = new THREE.GridHelper(200, 10);
    this.add(grid);
  }

}