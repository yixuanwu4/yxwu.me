$(document).ready(function(){

  $nav = $('.nav');
  $toggleCollapse = $('.toggle-collapse');

      /** click event on toggle menu */
  $toggleCollapse.click(function(){
      $nav.toggleClass('collapse');
  })


});



  // Set our main variables
  let scene,
  container,
  renderer,
  camera,
  model; // Our character

  let mouseX = 0, mouseY = 0;


  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  const MODEL_PATH = 'human.glb';
  
  const canvas = document.querySelector('#c');
  const backgroundColor = 0xf1f1f1;

  init();
  animate()

  function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 200;

    // Init the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.3 );
    scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xffffff, 0.7 );
    camera.add( pointLight );
    scene.add( camera );

    //manager

    function onProgress( xhr ) {

      if ( xhr.lengthComputable ) {
  
          const percentComplete = xhr.loaded / xhr.total * 100;
          console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
  
      }
  
  }
    function loadModel() {

      model.traverse( o => {
          if (o.isMesh) {
              o.castShadow = true;
              o.receiveShadow = true;

          }
      });

    model.position.y = - 11;
    scene.add( model );
  }
    const manager = new THREE.LoadingManager( loadModel );

    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

  //model



  function onError() {}


    const loader = new THREE.GLTFLoader();

    loader.load(MODEL_PATH, function (gltf) {
      model = gltf.scene;
      

      model.scale.set(10, 10, 10);
      model.position.y = -11;

      scene.add(model);

    },
    undefined, 
    function (error) {
      console.error(error);
    });

  // Init the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove );

  window.addEventListener( 'resize', onWindowResize );

  }


  function onWindowResize() {

      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function onDocumentMouseMove( event ) {

      mouseX = -( event.clientX - windowHalfX ) / 2;
      mouseY = -( event.clientY - windowHalfY ) / 2;

  }

  document.addEventListener( 'mousemove', onDocumentMouseMove );

  //

  function animate() {

      requestAnimationFrame( animate );
      render();

  }

  function render() {

      camera.position.x += ( mouseX - camera.position.x ) * .05;
      camera.position.y += ( - mouseY - camera.position.y ) * .05;

      camera.lookAt( scene.position );

      renderer.render( scene, camera );

  }



