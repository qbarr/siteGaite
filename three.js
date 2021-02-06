import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
//import { Interaction } from './three.interaction/build/three.interaction.js';

var clock = new THREE.Clock();
const loader = new GLTFLoader();
const scene = new THREE.Scene();
const raycaster = new THREE.Raycaster();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.set(79.610,53.210, -67.580);
camera.rotation.set(-2.313, 0.750,2.507);
camera.scale.set(8, 8, 16.33);
camera.lookAt(0,0,0);
const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set(30,25,2.7);
scene.add( light );
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var mixer;
var boussole;
var action;
var tableauPlanetes;
var audioEnd=true;
var popupopen=false;
var indiceTab=0;
scene.add(camera);
var zoomed=0;
var groupeprec=document.getElementsByClassName('rectangle')[0];
var groupesuiv=document.getElementsByClassName('rectangle')[1];
var popup=document.getElementsByClassName("popup")[0];

var imgBlue1="images/presentations/kamil.png"
var imgBlue2="images/imgTest.png"
var imgBlue3="images/presentations/kamil.png"
var imgGreen1="images/presentations/kamil.png"
var imgGreen2="images/imgTest.png"
var imgGreen3="images/test2.png"
var imgRed1="images/imgTest.png"
var imgRed2="images/imgTest.png"
var imgRed3="images/imgTest.png"
var imgYellow1="images/imgTest.png"
var imgYellow2="images/imgTest.png"
var imgYellow3="images/imgTest.png"

var LienGreen1="https://dcn.eestienne.info/RENDU-vr-v2/andyR/";
var LienGreen2="https://dcn.eestienne.info/QuentinBA/Aframe/";
var LienGreen3="https://dcn.eestienne.info/QuentinBA/Aframe/";
var LienRed1="https://dcn.eestienne.info/Marv/test/ILEfinale.html";
var LienRed2="https://dcn.eestienne.info/Axl/ANASTACIO_RESILIENCE/index.html";
var LienRed3="https://dcn.eestienne.info/RENDU-vr-v2/Quentin_Be/plantopia_vr.html";
var LienBlue1="https://dcn.eestienne.info/QuentinBA/Aframe/";
var LienBlue2="https://dcn.eestienne.info/RENDU-vr-v2/cla-v2/ile_clarisse-cor.html";
var LienBlue3="https://dcn.eestienne.info/RENDU-vr-v2/kamil/";
var LienYellow1="https://dcn.eestienne.info/RENDU-vr-v2/candice/";
var LienYellow2="https://dcn.eestienne.info/RENDU-vr-v2/ltg%20v2/";
var LienYellow3="https://dcn.eestienne.info/Axl/ANASTACIO_RESILIENCE/index.html";

	const listener = new THREE.AudioListener();
	camera.add( listener );
	const soundGroupe0 = new THREE.PositionalAudio( listener );
	const soundGroupe1 = new THREE.PositionalAudio( listener );
	const soundGroupe2 = new THREE.PositionalAudio( listener );
	const soundGroupe3 = new THREE.PositionalAudio( listener );
	const tabSound = [soundGroupe0,soundGroupe1,soundGroupe2,soundGroupe3];
	const soundGlobal = new THREE.PositionalAudio( listener );
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load( 'sounds/boutonOnOff.mp3', function( buffer ) {
		soundGroupe0.setBuffer( buffer );
		soundGroupe0.setRefDistance( 20 );
	});
	audioLoader.load( 'sounds/fioleCasse.mp3', function( buffer ) {
		soundGroupe1.setBuffer( buffer );
		soundGroupe1.setRefDistance( 20 );
		
	});
	audioLoader.load( 'sounds/vibreurPortable.mp3', function( buffer ) {
		soundGroupe2.setBuffer( buffer );
		soundGroupe2.setRefDistance( 20 );
		
	});
	audioLoader.load( 'sounds/voixTraductionMessage.mp3', function( buffer ) {
		soundGroupe3.setBuffer( buffer );
		soundGroupe3.setRefDistance( 20 );
		
	});
	


function onDocumentMouseDown(event){

	event.preventDefault();
	const mouse = new THREE.Vector2();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects(tableauPlanetes,true);
	if(intersects.length>0) {
		if(zoomed !=1 || audioEnd===true) {
			changementUI(intersects);
		}
		boussole.add(soundGroupe1);
	}
}

function audioHistoireGroupe() {
	var blue1=scene.getObjectByName("blue1");
	var green1=scene.getObjectByName("green1");
	var red1=scene.getObjectByName("red1");
	var yellow1=scene.getObjectByName("yellow1");
	audioEnd=false;
	switch(tableauPlanetes[0]) {
		case blue1:
			blue1.add(soundGroupe1);
			soundGroupe1.play();
			soundGroupe1.addEventListener('finished',()=> {
				audioEnd=true;
			})
			soundGroupe1.source.onended= ()=> {
				audioEnd=true;
			};
			break;
		case red1:
			red1.add(soundGroupe3);
			soundGroupe3.play();
			soundGroupe3.source.onended= ()=> {
				audioEnd=true;
			};
			
			break;
		case green1:
			green1.add(soundGroupe0)
			soundGroupe0.play();
			soundGroupe0.source.onended= ()=> {
				audioEnd=true;
			};
			
			break;
		case yellow1:
			yellow1.add(soundGroupe2);
			soundGroupe2.play();
			soundGroupe2.source.onended= ()=> {
				audioEnd=true;
			};
			break;
	}
}
function changementUI(intersects) {
		if(zoomed===0){
			transitionCamera(61.190,15.230, -40);
			groupesuiv.querySelector("p").innerHTML="Revenir à la carte";
			groupeprec.style.display="none";
		//	tabSound[indiceTab].play();
			zoomed=1;
		} else if(zoomed===1){
			changerImageEtLien(intersects);
			popup.style.pointerEvents="auto";
			popup.style.opacity=1;
			groupesuiv.querySelector("p").innerHTML="Revenir au groupe";
			zoomed=2;
		} 
		
}
function changerImageEtLien(intersects) {
	var img = popup.querySelector("img");
		//TODOegzrogpzgznognzgzgongzno
		var iframe = document.querySelector("iframe")

	switch(intersects[0].object.name) {
		case "green1": 
			img.src=imgGreen1;
			iframe.src=LienGreen1;
			break;
		case "green2": 
			img.src=imgGreen2;
			iframe.src=LienGreen2;
			break;
		case "green3": 
			img.src=imgGreen3;	
			iframe.src=LienGreen3;
			break;
		case "blue1": 
			img.src=imgBlue1;
			iframe.src=LienBlue1;
			break;
		case "blue2": 
			img.src=imgBlue2;
			iframe.src=LienBlue2;
			break;
		case "blue3": 
			img.src=imgBlue3;
			iframe.src=LienBlue3;
			break;
		case "red1": 
			img.src=imgRed1;
			iframe.src=LienRed1;
			break;
		case "red2": 
			img.src=imgRed2;
			iframe.src=LienRed2;
			break;
		case "red3": 
			img.src=imgRed3;
			iframe.src=LienRed3;
			break;
		case "yellow1": 
			img.src=imgYellow1;
			iframe.src=LienYellow1;
			break;
		case "yellow2": 
			img.src=imgYellow2;
			iframe.src=LienYellow2;
			break;
		case "yellow3": 
			img.src=imgYellow3;
			iframe.src=LienYellow3;
			break;		
	}

}


function onDocumentMouseMove(event){
	event.preventDefault();
	var canvas =document.querySelector('canvas');
	const mouse = new THREE.Vector2();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( tableauPlanetes,true);
	if(intersects.length>0) {
		if(zoomed !=1 || audioEnd===true) {
			canvas.style.cursor="pointer";
		}
	} else {
		canvas.style.cursor="auto";
	}
}

function stopAndResetAudios(){
	tabSound.forEach(sound => {
		if(sound.isPlaying) {
			sound.stop();
			sound.currentTime=0;
		}

	})
}

function load() {
/*	loader.load( 'models/TestLight.glb', function ( glb ) {
	var modelgl = glb.scene;
	scene.add(modelgl);
}, undefined, function ( error ) {

	console.error( error );

} );*/

 

loader.load( 'models/boussole.glb', function ( glb ) {
	tableauPlanetes=[glb.scene.getObjectByName("green1"),glb.scene.getObjectByName("green2"),glb.scene.getObjectByName("green3")];
	var canvas = document.querySelector("canvas");
	var groupeprec=document.getElementsByClassName('rectangle')[0];
		boussole=glb.scene;
	  mixer = new THREE.AnimationMixer(glb.scene);
    canvas.addEventListener('mousedown',onDocumentMouseDown,false); //on supprime pendant les transitions de camera 
	canvas.addEventListener('mousemove',onDocumentMouseMove,false);
	
	groupeprec.addEventListener('mousedown',()=> {  
		groupeprec.style.pointerEvents="none";
		groupesuiv.style.pointerEvents="none";
		if(zoomed===0) {
			stopAndResetAudios();
		}
		mixer = new THREE.AnimationMixer(glb.scene);
		indiceTab--; // indice du groupe 
			if(indiceTab<0) {
				indiceTab=3;
			}
			glb.animations.forEach(animation => {
				//action.play();			
		    if(animation.name.substr(animation.name.length-1)===indiceTab.toString()) {
				action = mixer.clipAction(animation);
				action.clampWhenFinished=true;
				action.setLoop(THREE.LoopOnce);
				changementGroupePrecedent(); 	
				
		    }
			mixer.addEventListener('finished',() => {
				groupeprec.style.pointerEvents="auto";
				groupesuiv.style.pointerEvents="auto";
			})

			changerInteractionPlanetes(glb.scene);
		}) 
		
	}, false);
	groupesuiv.addEventListener('mousedown',()=> {
		if(zoomed===0) {
			groupeprec.style.pointerEvents="none";
			groupesuiv.style.pointerEvents="none";
			mixer = new THREE.AnimationMixer(glb.scene);
	
			glb.animations.forEach(animation => {
					//action.play();			
				if(animation.name.substr(animation.name.length-1)===indiceTab.toString()) {
					action = mixer.clipAction(animation);
					action.clampWhenFinished=true;
					action.setLoop(THREE.LoopOnce);
					changementGroupeSuivant(); 	
					
				}
				mixer.addEventListener('finished',() => {
					groupesuiv.style.pointerEvents="auto";
					groupeprec.style.pointerEvents="auto";
				})
			}) 
			
			indiceTab++;
			if(indiceTab>3) {
				indiceTab=0;
			}
			changerInteractionPlanetes(glb.scene);

		} else if(zoomed===1) {
			groupesuiv.querySelector("p").innerHTML="Groupe suivant >";
			groupeprec.style.display="block";
			transitionCamera(75.090,52.400, -50.180);
			groupesuiv.style.pointerEvents="auto";
			stopAndResetAudios();
		} else if(zoomed===2) {
			groupesuiv.querySelector("p").innerHTML="Revenir à la carte";
			if(document.querySelector('.jeu')) {
				document.querySelector('.jeu').style.display="none";

			}
			groupesuiv.style.pointerEvents="auto";

			popup.style.pointerEvents="none";
			popup.style.opacity=0;
			zoomed=1;
		}


	}, false);

    /*      	glb.animations.forEach(animation => {
          		action = mixer.clipAction(animation);
           		action.clampWhenFinished=true;
          		action.setLoop(THREE.LoopOnce);
				//action.play();	
				
			
				canvas.addEventListener('mousedown',onDocumentMouseDown,false); //on supprime pendant les transitions de camera 
				canvas.addEventListener('mousemove',onDocumentMouseMove,false);
				
          	})*/
          	
    
     
    scene.add(glb.scene);

} );
}

function changerInteractionPlanetes(scene) {

	if(indiceTab===0) {
		tableauPlanetes=[scene.getObjectByName("green1"),scene.getObjectByName("green2"),scene.getObjectByName("green3")];
	}else if(indiceTab===1) {
		tableauPlanetes=[scene.getObjectByName("blue1"),scene.getObjectByName("blue2"),scene.getObjectByName("blue3")];
	}else if(indiceTab===2) {
		tableauPlanetes=[scene.getObjectByName("yellow1"),scene.getObjectByName("yellow2"),scene.getObjectByName("yellow3")];
	}else if(indiceTab===3) {
		tableauPlanetes=[scene.getObjectByName("red1"),scene.getObjectByName("red2"),scene.getObjectByName("red3")];

	}
}

function changementGroupePrecedent(){
	action.time=action.getClip().duration;
	action.timeScale=-1;
	action.paused = false;
	action.play();
}

function changementGroupeSuivant() {
					/*camera.position.set(55.370,15.230, -38.890);
					camera.rotation.set(-2.593,0.800,2.720);*/

					if(zoomed===0) {
						action.time=0;
						action.timeScale=1;
					    action.paused = false;
					    action.play();
					   

					} 
					
}


function animate() {
	var dt = clock.getDelta();
	setTimeout(()=> {
		mixer.update(dt); // a revoir dès que possible 
	},500);
	TWEEN.update();
	requestAnimationFrame( animate );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.render( scene, camera );

  
}	


function transitionCamera(x,y,z) {
	var canvas = document.querySelector("canvas");
	canvas.removeEventListener('mousedown',onDocumentMouseDown);
	//ESSAYE DE COUPER AVEC LE CSS pointerEvents
	var posX=x;
	var posY=y;
	var posZ=z;
		var from = {
        x : camera.position.x,
        y : camera.position.y,
        z : camera.position.z
      };

      var to = {
        x : posX,
        y : posY,
        z : posZ
      };

      var tween = new TWEEN.Tween(from)
      .to(to,3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function (object) {

        camera.position.set(object.x,object.y, object.z);
        camera.lookAt(new THREE.Vector3(0,0,0));
      })
      .onComplete(function () {
        canvas.addEventListener('mousedown',onDocumentMouseDown);
        //remettre point
        if(groupeprec.style.display==="block") {
        	zoomed=0;
		}
		if(zoomed===1) {
			audioHistoireGroupe(); //Lance l'audio a la fin de l'animation camera pour arriver sur le groupe
		}

      })
      .start();

}

function EventIframe() {
var popup = document.getElementsByClassName("popup")[0];

	document.querySelector(".popup .rectangle").addEventListener("click",()=> {
		popup.style.pointerEvents="none";
		popup.style.opacity=0;
		if(document.querySelector('.jeu')) {
			
			document.querySelector('.jeu').style.display="block";

		}
	})
}

function main() {
	load();
	EventIframe();
	animate();


}	
main();