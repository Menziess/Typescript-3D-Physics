import * as React from 'react';
import * as THREE from 'three';
import * as OIMO from 'oimo';
import * as React3 from 'react-three-renderer';

interface Props { }
interface State {
  cubeRotation: any;
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      scene: any;
      perspectiveCamera: any;
      ambientLight: any;
      axisHelper: any;
      mesh: any;
      meshBasicMaterial: any;
      boxGeometry: any;
    }
  }
}

var world = new OIMO.World({ 
  timestep: 1/60, 
  iterations: 8, 
  broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
  worldscale: 1, // scale full world 
  random: true,  // randomize sample
  info: false,   // calculate statistic or not
  gravity: [0,-9.8,0] 
});

var body = world.add({ 
  type:'sphere', // type of shape : sphere, box, cylinder 
  size:[1,1,1], // size of shape
  pos:[0,0,0], // start position in degree
  rot:[0,0,90], // start rotation in degree
  move:true, // dynamic or statique
  density: 1,
  friction: 0.2,
  restitution: 0.2,
  belongsTo: 1, // The bits of the collision groups to which the shape belongs.
  collidesWith: 0xffffffff; // The bits of the collision groups with which the shape collides.
});

var body = world.add({ 
  type:'jointHinge', // type of joint : jointDistance, jointHinge, jointPrisme, jointSlide, jointWheel
  body1: "b1", // name or id of attach rigidbody
  body2: "b1", // name or id of attach rigidbody
});


// update world
world.step();

// and copy position and rotation to three mesh
myMesh.position.copy( body.getPosition() );
myMesh.quaternion.copy( body.getQuaternion() );

export default class Oimo extends React.Component<Props, State> {

  cameraPosition;
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });
    };
  }

  _onAnimate() {

  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight - 70; // canvas height

    return (
      <React3
        mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
        width={width}
        height={height}
        onAnimate={this._onAnimate}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}

            position={this.cameraPosition}
          />
          <mesh
            rotation={this.state.cubeRotation}
          >
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <meshBasicMaterial
              color={0x64b5f6}
            />
          </mesh>
        </scene>
      </React3>
    );
  }
}