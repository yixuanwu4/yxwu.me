

$(document).ready(function(){

    $nav = $('.nav');
    $toggleCollapse = $('.toggle-collapse');

        /** click event on toggle menu */
    $toggleCollapse.click(function(){
        $nav.toggleClass('collapse');
    })

    //owl-carousel for blog
//     $('.owl-carousel').owlCarousel({
//         loop: true,
//         autoplay:true,
//         autoplayTimeout: 3000,
//         dots:false,
//         nav: true,
//         nevText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')],
// });

});


import * as THREE from '../js/three.module.js';

import { OBJLoader } from '../js/OBJLoader.js';

    let container;

    let camera, scene, renderer;

    let mouseX = 0, mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    let object;

    const canvas = document.querySelector('#c');
    const backgroundColor = 0xf1f1f1;

    init();
    animate();


    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 250;

        // scene

        const canvas = document.querySelector('#c');
        const backgroundColor = 0xf1f1f1;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(backgroundColor);
        // var scene = new THREE.Scene(); // initialising the scene
        
        const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
        scene.add( ambientLight );

        const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
        camera.add( pointLight );
        scene.add( camera );

        // manager

        function loadModel() {

            object.traverse( o => {
                if (o.isMesh) {
                    o.castShadow = true;
                    o.receiveShadow = true;

                }
            });

            object.position.y = - 11;
            scene.add( object );
            object.scale.set(50, 50, 50);

        }

        

        const manager = new THREE.LoadingManager( loadModel );

        manager.onProgress = function ( item, loaded, total ) {

            console.log( item, loaded, total );

        };


        // model

        function onProgress( xhr ) {

            if ( xhr.lengthComputable ) {

                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

            }

        }

        function onError() {}

        const loader = new OBJLoader( manager );
        loader.load( 'pinkface.obj', function ( obj ) {

            object = obj;

        }, onProgress, onError );

        //

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove );

        //

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