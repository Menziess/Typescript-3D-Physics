import * as THREE from 'three';

export default class Box extends THREE.Mesh {
  constructor(
    geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1), 
    material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xeeffee }),
    name: string = ''
  ) { 
    super(geometry, material);
    let rand = Math.floor(Math.random() * 10) + 1;
    this.castShadow = true;
    this.receiveShadow = true;
    this.position.set(0, rand, 0);
    this.name = name;
  }
}