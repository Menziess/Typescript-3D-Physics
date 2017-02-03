import * as React from 'react';
import * as THREE from 'three';

const { PropTypes } = React;

const meshScale = new THREE.Vector3(1, 1, 1).multiplyScalar(0.5);

interface Props { 
  position: number;
  quaternion: number;
  bodyIndex: any;
  meshes: any;
}
interface State { }
declare global {
  namespace JSX {
    interface IntrinsicElements {
      geometryResource: any;
      materialResource: any;
    }
  }
}

export default class RotatingCube extends React.Component<Props, State> {
  static propTypes = {
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
    quaternion: PropTypes.instanceOf(THREE.Quaternion).isRequired,
  };

  render() {
    const {
      position,
      quaternion,
    } = this.props;

    return (<mesh
      position={position}
      quaternion={quaternion}
      scale={meshScale}

      castShadow
    >
      <geometryResource
        resourceId="cubeGeo"
      />
      <materialResource
        resourceId="cubeMaterial"
      />
    </mesh>);
  }
}