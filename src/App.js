import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'
// import FBXLoader from 'three-fbx-loader'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

var loader = new GLTFLoader().setPath('assets/garbage-sack');
var trashbag;

class App extends React.Component {
    componentDidMount() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls (camera, renderer.domElement);
        camera.position.z = 5;
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        var uniforms = {
            color:     { value: new THREE.Color( 0xffffff ) },
            texture:   { value: new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/ball.png") }
    
        };
      
    var shaderMaterialInstanced = new THREE.RawShaderMaterial( {
    
        uniforms:       uniforms,
        vertexShader:   `
        precision highp float;
    
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
    
        attribute vec3 position;
    
        attribute float size;
        attribute vec3 customColor;
        attribute vec3 offset;
        attribute float alpha;
    
        varying float vAlpha;
        varying vec3 vColor;
    
        void main() {
          vColor = customColor;
          vAlpha = alpha;
          vec3 newPosition = position + offset;
          vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );
          gl_PointSize = size * ( 300.0 / -mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
    
        }`,
        fragmentShader: `
        precision highp float;
        uniform vec3 color;
        uniform sampler2D texture;
    
        varying vec3 vColor;
        varying float vAlpha;
    
        void main() {
        gl_FragColor = vec4( color * vColor, vAlpha );
        gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
        }`,
    
        depthTest:      true,
      transparent:    true,
      alphaTest: 0.5,
      blending: THREE.NormalBlending,
    
    });
    
        const vertices = [];

        for ( let i = 0; i < 2000; i ++ ) {
            let x = THREE.Math.randFloatSpread(4);
            let z = THREE.Math.randFloatSpread(4);
            let y = (-(x*x)-(z*z)) / 1 + 1.6;
            if(y > 0) {
                vertices.push( x, y, z ); 
            }
        }

        loader.load('Plasticbag.glb', (obj) => {
            trashbag = obj;
            console.log('started loading');
            console.log(trashbag);
            scene.add(trashbag);
        }, undefined , (err) => {
            console.log('plastic bag err:')
            console.error(err);
        })

        const geometry = new THREE.ConeGeometry(2, 2, 200, 200);
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        const material = new THREE.PointsMaterial({ color: 0xFF0000, size: 10});
        const cone = new THREE.Points( geometry, material );
        scene.add( cone );
        const animate = () => {
            requestAnimationFrame( animate );
              
            // cone.rotation.x += 0.01;
            cone.rotation.y += 0.001;
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
