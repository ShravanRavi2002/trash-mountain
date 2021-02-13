import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'


class App extends React.Component {
    componentDidMount() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls (camera, renderer.domElement);
        camera.position.z = 5;
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const vertices = [];

        for ( let i = 0; i < 10000; i ++ ) {

            let x = THREE.Math.randFloatSpread(10);
            let z = THREE.Math.randFloatSpread(10);
            let y = (-(x*x)-(z*z)) / 25;

          vertices.push( x, y, z );

        }

        const geometry = new THREE.ConeGeometry(2, 2, 200, 200);
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        const material = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
        const cone = new THREE.Points( geometry, material );
        scene.add( cone );
        const animate = () => {
            requestAnimationFrame( animate );
              
            // cube.rotation.x += 0.01;
            // cone.rotation.y += 0.001;
            controls.update();
            renderer.render( scene, camera );
          }; 
          animate();
    }
    
    render(){
        return(
            <div ref = {ref => {this.mount = ref}}></div>
        )
    }

}



export default App;
