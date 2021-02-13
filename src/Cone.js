// import * as THREE from 'three';
// import OrbitControls from 'three-orbitcontrols'
// import {useEffect} from 'react';

// const Cone = () => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
//     const renderer = new THREE.WebGLRenderer();
//     const controls = new OrbitControls (camera, renderer.domElement);
//     camera.position.z = 5;
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     document.body.appendChild( renderer.domElement );
    
//     const geometry = new THREE.ConeGeometry(2, 2, 200, 200);
//     const material = new THREE.PointCloud({ color: 0xFFFFFF, size: 0.01 });
//     const cone = new THREE.Points( geometry, material );
//     scene.add( cone );
//     return cone;
// }

// export default Cone;