import * as THREE from 'https://threejs.org/build/three.module.js';
        
import { OrbitControls } from './OrbitControls.js';

var currentMonth = new Date().getMonth() + 1; 
if (currentMonth === 12) {
	const createSnowflake = () => {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";

        const size = Math.random() * 3 + 2;
        const left = Math.random() * window.innerWidth;
        const duration = Math.random() * 3 + 2;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${left}px`;
        snowflake.style.animationDuration = `${duration}s`;
	
	document.body.insertBefore(snowflake, document.body.firstElementChild);

        snowflake.addEventListener("animationiteration", () => {
          snowflake.style.left = `${Math.random() * window.innerWidth}px`;
        });
      };

      const createSnowfall = () => {
        for (let i = 0; i < 100; i++) {
          createSnowflake();
        }
      };

      createSnowfall();






       //tree
            

      var scene = new THREE.Scene();
      scene.background = null; 

      var camera = new THREE.PerspectiveCamera(
        55,
        5/15,
        0.1,
        1000
      );
      camera.position.z = 40;
      camera.position.y = 25;
      camera.rotation.x = Math.PI / 4;


      var renderer = new THREE.WebGLRenderer({alpha: true});
      renderer.setSize(50,150);

      //for(let i=0; i<4; i++){
      document.getElementsByTagName('h2')[0].appendChild(renderer.domElement);
	//}
      //document.body.appendChild(renderer.domElement);


      //var axesHelper = new THREE.AxesHelper(10);
      //scene.add(axesHelper);


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
        
        
    //camera.lookAt(initialControlsTarget);
      //controls.target.set(new THREE.Vector3(9.24,26.3,41));
      //controls.setPolarAngle(1.0168);
      //controls.setAzimuthalAngle(0.195039);
        

      var coneGeometry = new THREE.ConeGeometry(5, 16, 32);
      var coneMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00, //
        transparent: true,
        opacity: 0.1, // 
      });
    
      var cone = new THREE.Mesh(coneGeometry, coneMaterial);
      cone.position.y = 8;
      scene.add(cone);


      var pinkSphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      var pinkSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff66b2 });


      var greenSphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      var greenSphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      var yellowSphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      var yellowSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

      var spheres = [];


      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          var sphere;
          var r = Math.random();
          if ( r< 0.3) {
            // 
            sphere = new THREE.Mesh(greenSphereGeometry, greenSphereMaterial);
          } else if (r>0.3&r<0.6) {
            // 
            sphere = new THREE.Mesh(pinkSphereGeometry, pinkSphereMaterial);
          } else{
            sphere = new THREE.Mesh(yellowSphereGeometry, yellowSphereMaterial);
          }

          // random translate
          var radius = Math.random() * 5; // r
          var theta = Math.random() * Math.PI * 2; // radius
          var x = radius * Math.cos(theta);
          var z = radius * Math.sin(theta);
          var y = Math.random() * 16; // y
          sphere.position.set(x, y, z);

          scene.add(sphere);
          spheres.push(sphere);
        }, i * 100); // 1s
      }


      var clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);


        var delta = clock.getDelta();
        var speedMultiplier = 1; 
        spheres.forEach((sphere, index) => {
          var t = clock.getElapsedTime() * speedMultiplier; 
          var radius = 5 - (sphere.position.y / 16) * 5; 
          var x = radius * Math.cos(t + index * (Math.PI / 5));
          var z = radius * Math.sin(t + index * (Math.PI / 5));
          var y = sphere.position.y + delta * 2 * speedMultiplier;
          sphere.position.set(x, y, z);

          if (sphere.position.y >= 16) {
            sphere.position.y = 0;
          }
        });


        renderer.render(scene, camera);
      }

      window.addEventListener("resize", function () {
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
      });


      animate();

	
} else {
}
