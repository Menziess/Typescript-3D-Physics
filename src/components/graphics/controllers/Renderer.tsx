import * as THREE from 'three';
import Engine from '../views/Engine';

export default class Renderer {
  private static instance: Renderer = new Renderer();
  private static engine: Engine;

  private fps: number;
  private running: boolean;
  private antialias: boolean;
  private lastRender: number;
  private renderer: THREE.WebGLRenderer;

  private constructor() {
    this.fps = 60;
    this.running = false;
    this.antialias = true;
    this.lastRender = Date.now();
  };

  public static getInstance(engine: Engine) {
    Renderer.engine = engine;
    return this.instance;
  }

  public init() {
    this.renderer.setClearColor(0xcce6ff, 1);
  }

  private step = (progress: number) => {
    Renderer.engine.getCamera().animate(progress);
    Renderer.engine.getModels().animate(progress);
    Renderer.engine.getPhysics().animate(progress);
  }

  private physicsLoop = () => {
    let self = this;
    this.renderFrame();    
    let progress = (Date.now() - this.lastRender) / 10;
    this.step(progress);
    this.lastRender = Date.now();
    setTimeout(() => {
      requestAnimationFrame(self.physicsLoop);
    }, 1000 / this.fps);
  }

  private normalLoop = () => {
    let self = this;
    this.renderFrame();
    setTimeout(() => {
      requestAnimationFrame(self.normalLoop);
    }, 1000 / this.fps);
  }

  public startRender(enablePhysics: boolean) {
    if (this.running) {
      return;
    }
    if (enablePhysics) {
      this.physicsLoop();
    } else {
      this.normalLoop();
    }
    this.running = true;
  }

  public updateDimensions(width: number, height: number) {
    if (this.renderer) {
      Renderer.engine.getCamera().aspect = width / height;
      Renderer.engine.getCamera().updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  public mount(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, precision: "mediump", antialias: this.antialias });
  }

  public renderFrame() {
    this.renderer.render(Renderer.engine.getScene(), Renderer.engine.getCamera());
  }
}