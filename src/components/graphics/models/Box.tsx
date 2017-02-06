import * as THREE from 'three';

export default class Box extends THREE.Mesh {

  constructor(
    geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1), 
    material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xeeffee })
  ) { 
    super(geometry, material);
    this.castShadow = true;
    this.receiveShadow = true;
    this.position.set(0, 5, 0);
  }
}