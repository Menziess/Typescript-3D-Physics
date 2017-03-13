import * as THREE from 'three';
import Engine from '../views/Engine';


export default class Camera extends THREE.Camera {
  private static instance: Camera = new Camera();
  private static engine: Engine;

  private constructor() {
    super();
  } 

  public static getInstance(engine: Engine) {
    Camera.engine = engine;
    return this.instance;
  }

  public init() {
    //
  }

}