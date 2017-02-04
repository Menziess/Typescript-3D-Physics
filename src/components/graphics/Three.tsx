import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as THREE from 'three';
import * as OIMO from 'oimo';

const OrbitControls = require( 'three-orbit-controls' )( THREE );

interface Props {
}
interface State {
  width: number;
  height: number;
}

export default class Three extends React.Component<Props, State> {
  world: any;
  scene: any;
  camera: any;
  center: any;
  renderer: any;
  mounted: boolean;
  bodies: any;
  bgColor = 0x252627;
  camPos = { horizontal: 90, vertical: 75, distance: 200, automove: false };
  mouse = { ox:0, oy:0, h:0, v:0, mx:0, my:0, down:false, over:false, moving:true };

  constructor() {
    super();
    this.mounted = false;

    // Initialize width and height
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    // Create physics world
    this.world = new OIMO.World({ 
      timestep: 1/60, 
      iterations: 8, 
      broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 1, // scale full world 
      random: true,  // randomize sample
      info: false,   // calculate statistic or not
      gravity: [0,-9.8,0] 
    });
    this.world.add({ size: [50, 10, 50], pos: [0, -5, 0] });
    this.scene = new THREE.Scene();
    this.scene.add( new THREE.AmbientLight( this.bgColor ) );
    this.camera = new THREE.PerspectiveCamera(60, this.state.width / this.state.height, 1, 3000);
    this.center = new THREE.Vector3(0,50,0);
    this.camera.position.z = 6;
    this.moveCamera();

    // Instantiate bodies array
    this.bodies = new Array();
  }

  private initModels() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xeeffee });
    const cube = new THREE.Mesh(geometry, material);
    this.addBody(cube);
  }

  private addBodies(elements: any[]) {
    elements.forEach(element => {
      this.addBody(element);
    });
  }

  private addBody(element: any) {
    this.bodies.push({
      'mesh': element,
      'phys': this.world.add({
        world: this.world,
        type: 'box',
        size: Object.values(element.getWorldScale()),
        pos: Object.values(element.getWorldPosition()),
        rot: Object.values(element.getWorldRotation()),
        density: 1,
        move: true,
        mass: -2
      })
    });
    this.scene.add(element);
  }

  /*
   * Main render loop
   */
  private loop = () => {
    requestAnimationFrame(this.loop);
    this.animate();
    this.renderer.render(this.scene, this.camera);
  }

  /*
   * Animation definitions
   */
  private animate() {
    this.world.step();
    this.bodies.forEach(element => {
      element.mesh.position.copy(element.phys.getPosition());
      element.mesh.quaternion.copy(element.phys.getQuaternion());
    });
  }

  private updateDimensions() {
    this.mounted && this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    if (this.renderer) {
      this.camera.aspect = this.state.width / this.state.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.state.width, this.state.height,);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.updateDimensions();

    // Render scene
    const canvas = ReactDOM.findDOMNode(this.refs['canvas']);
    const controls = new OrbitControls( this.camera, canvas);    
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, precision: "mediump" });
    this.renderer.setClearColor( this.bgColor, 1 );
    this.renderer.shadowMap.enabled = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.initModels();
    this.loop();
  }

  render() {
    const self = this;
    const canvasStyle = {
      top: 0,
      zIndex: -1,
      position: "fixed",
    }

    function onMouseDown(e) {
      self.onMouseDown(e);
    }
    function onMouseUp(e) {
      self.onMouseUp(e);
    }
    function onMouseWheel(e) {
      self.onMouseWheel(e);
    }

    return (
      <div>
        <canvas id="canvas" ref="canvas"
          width={this.state.width} height={this.state.height}
          style={canvasStyle} onMouseDown={onMouseDown} 
          onMouseUp={onMouseUp} />
      </div>
    )
  }

  moveCamera() {
    // this.camera.position.copy( Orbit(this.center, this.camPos.horizontal, this.camPos.vertical, this.camPos.distance));
    // this.camera.lookAt(this.center);
  }

  onMouseDown(e) {
    e.preventDefault();
    this.mouse.ox = e.clientX;
    this.mouse.oy = e.clientY;
    this.mouse.h = this.camPos.horizontal;
    this.mouse.v = this.camPos.vertical;
    this.mouse.down = true;
  }

  onMouseUp(e) {
    this.mouse.down = false;
    document.body.style.cursor = 'auto';
  }

  onMouseMove(e) {
    e.preventDefault();
    if (this.mouse.down ) {
        document.body.style.cursor = 'move';
        this.camPos.horizontal = ((e.clientX - this.mouse.ox) * 0.3) + this.mouse.h;
        this.camPos.vertical = (-(e.clientY - this.mouse.oy) * 0.3) + this.mouse.v;
        this.moveCamera();
    }
  }

  onMouseWheel(e) {
    var delta = 0;
    if(e.wheelDeltaY){delta=e.wheelDeltaY*0.01;}
    else if(e.wheelDelta){delta=e.wheelDelta*0.05;}
    else if(e.detail){delta=-e.detail*1.0;}
    this.camPos.distance-=(delta*10);
    this.moveCamera();   
  }
}