import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import { RenderPass } from './three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from './three/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from './three/examples/jsm/postprocessing/UnrealBloomPass.js';

//import { Interaction } from './three.interaction/build/three.interaction.js';

var clock = new THREE.Clock();
const loader = new GLTFLoader();
const scene = new THREE.Scene();
const raycaster = new THREE.Raycaster();
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.set(0,52,0);
camera.rotation.set(-1.57,0,2.273);

camera.scale.set(8, 8, 16.33);
//camera.lookAt(0,0,0);

/* RENDU */
const ambiantlight = new THREE.AmbientLight( 0xffffff, 0.000 ); // soft white light
scene.add( ambiantlight );
const pointlight = new THREE.PointLight( 0xffffff, 2 );
pointlight.power = (45);
pointlight.distance = (0.9);
scene.add( pointlight ); //centre
const pointlight1 = new THREE.PointLight( 0x9E0059, 0.6 );
pointlight1.position.set(30,25,2.7);
pointlight1.power = (4);
pointlight1.distance = (4);
scene.add( pointlight1 ); //bleu
const pointlight2 = new THREE.PointLight( 0xFF0054, 0.6 );
pointlight2.position.set(10,35,2);
pointlight2.power = (4);
pointlight2.distance = (4);
scene.add( pointlight2 ); //jaune
const pointlight3 = new THREE.PointLight( 0xFF5400, 0.6 );
pointlight3.position.set(-15,25,-35);
pointlight3.power = (4);
pointlight3.distance = (4);
scene.add( pointlight3 ); //rouge
const pointlight4 = new THREE.PointLight( 0x390099, 0.6 );
pointlight4.position.set(45,25,-40);
pointlight4.power = (4);
pointlight4.distance = (4);
scene.add( pointlight4 ); //vert

/* FIN RENDU  */


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var mixer;
var boussole;
var action;
var tableauPlanetes;
var audioEnd=false;
var popupopen=false;
var indiceTab=0;
scene.add(camera);
var zoomed=0;
var compteRebour = 0;
var groupeprec=document.getElementsByClassName('rectangle')[0];
var groupesuiv=document.getElementsByClassName('rectangle')[1];
var popup=document.getElementsByClassName("modal")[0];
var rond = document.getElementsByClassName('rond')[0];

var vignettePink1="images/vignettes/clarisse.png";
var vignettePink2="images/vignettes/amelle.png";
var vignettePink3="images/vignettes/benel.png";
var vignettePurple1="images/vignettes/clarisse.png";
var vignettePurple2="images/vignettes/amelle.png";
var vignettePurple3="images/vignettes/benel.png";
var vignetteOrange1="images/vignettes/clarisse.png";
var vignetteOrange2="images/vignettes/clarisse.png";
var vignetteOrange3="images/vignettes/clarisse.png";
var vignetteRed1="images/vignettes/clarisse.png";
var vignetteRed2="images/vignettes/clarisse.png";
var vignetteRed3="images/vignettes/clarisse.png";

var imgPink1="images/presentations/kamil.png"
var imgPink2="images/presentations/kamil.png"
var imgPink3="images/presentations/kamil.png"
var imgPurple1="images/presentations/kamil.png"
var imgPurple2="images/presentations/kamil.png"
var imgPurple3="images/presentations/kamil.png"
var imgOrange1="images/presentations/kamil.png"
var imgOrange2="images/presentations/kamil.png"
var imgOrange3="images/presentations/kamil.png"
var imgRed1="images/presentations/kamil.png"
var imgRed2="images/presentations/kamil.png"
var imgRed3="images/presentations/kamil.png"

var LienPurple1="https://dcn.eestienne.info/RENDU-vr-v2/andyR/";
var LienPurple2="https://dcn.eestienne.info/QuentinBA/Aframe/";
var LienPurple3="https://dcn.eestienne.info/QuentinBA/Aframe/";
var LienOrange1="https://dcn.eestienne.info/Marv/test/ILEfinale.html";
var LienOrange2="https://dcn.eestienne.info/Axl/ANASTACIO_RESILIENCE/index.html";
var LienOrange3="https://dcn.eestienne.info/RENDU-vr-v2/Quentin_Be/plantopia_vr.html";
var LienPink1="https://dcn.eestienne.info/QuentinBA/Aframe/";
var LienPink2="https://dcn.eestienne.info/RENDU-vr-v2/cla-v2/ile_clarisse-cor.html";
var LienPink3="https://dcn.eestienne.info/RENDU-vr-v2/kamil/";
var LienRed1="https://dcn.eestienne.info/RENDU-vr-v2/candice/";
var LienRed2="https://dcn.eestienne.info/RENDU-vr-v2/ltg%20v2/";
var LienRed3="https://dcn.eestienne.info/Axl/ANASTACIO_RESILIENCE/index.html";

	const listener = new THREE.AudioListener();
	camera.add( listener );
	const soundGlobal = new THREE.Audio( listener );
	const soundGroupe0 = new THREE.Audio( listener );
	const soundGroupe1 = new THREE.Audio( listener );
	const soundGroupe2 = new THREE.Audio( listener );
	const soundGroupe3 = new THREE.Audio( listener );

	const soundVoixGroupe0 =new THREE.Audio( listener );
	const soundVoixGroupe1 =new THREE.Audio( listener );
	const soundVoixGroupe2 =new THREE.Audio( listener );
	const soundVoixGroupe3=new THREE.Audio( listener );

	const tabSound = [soundGroupe0,soundGroupe1,soundGroupe2,soundGroupe3];
	const tabVoixSound=[soundVoixGroupe0,soundVoixGroupe1,soundVoixGroupe2,soundVoixGroupe3];

	const audioLoader = new THREE.AudioLoader();

	audioLoader.load( 'sounds/zones/memoire.mp3', function( buffer ) {
		soundGroupe0.setBuffer( buffer );
	//	soundGroupe0.setRefDistance( 20 );
		soundGroupe0.setLoop(true);
		soundGroupe0.setVolume(0.3);

	});
	audioLoader.load( 'sounds/zones/jeu.mp3', function( buffer ) {
		soundGroupe1.setBuffer( buffer );
		//soundGroupe1.setRefDistance( 20 );
		soundGroupe1.setLoop(true);
		soundGroupe1.setVolume(0.3);
	});
	audioLoader.load( 'sounds/zones/introspection.mp3', function( buffer ) {
		soundGroupe2.setBuffer( buffer );
	//	soundGroupe2.setRefDistance( 20 );
		soundGroupe2.setLoop(true);
		soundGroupe2.setVolume(0.3);


	});
	audioLoader.load( 'sounds/zones/contemplation.mp3', function( buffer ) {
		soundGroupe3.setBuffer( buffer );
	//	soundGroupe3.setRefDistance( 20 );
		soundGroupe3.setLoop(true);

		soundGroupe3.setVolume(0.3);


	});



	audioLoader.load( 'sounds/zones/voix/memoire.wav', function( buffer ) {
		soundVoixGroupe0.setBuffer( buffer );
	//	soundGroupe3.setRefDistance( 20 );
			soundVoixGroupe0.setVolume(1.5);


	});
	audioLoader.load( 'sounds/zones/voix/jeu.wav', function( buffer ) {
		soundVoixGroupe1.setBuffer( buffer );
	//	soundGroupe3.setRefDistance( 20 );
			soundVoixGroupe1.setVolume(1.5);

	});
	audioLoader.load( 'sounds/zones/voix/introspection.wav', function( buffer ) {
		soundVoixGroupe2.setBuffer( buffer );
	//	soundGroupe3.setRefDistance( 20 );
				soundVoixGroupe2.setVolume(1.5);


	});
	audioLoader.load( 'sounds/zones/voix/contemplation.wav', function( buffer ) {
		soundVoixGroupe3.setBuffer( buffer );
	//	soundGroupe3.setRefDistance( 20 );
				soundVoixGroupe3.setVolume(1.5);


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
			changementUI(event,intersects);
			//j'enleve le rond 
			rond.style.opacity=0;
			rond.style.pointerEvents="none";
			
		}

		boussole.add(soundGroupe1);
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
			changerImageEtLien(intersects);

		}
		if(zoomed===1 && audioEnd===true) {
			addImageHover(event);

		}
	} else {
		canvas.style.cursor="auto";
		rond.style.opacity=0;

	}
}

function audioHistoireGroupe() {
	var pink1=scene.getObjectByName("blue1");
	var purple1=scene.getObjectByName("green1");
	var orange1=scene.getObjectByName("red1");
	var red1=scene.getObjectByName("yellow1");
	audioEnd=false;
	switch(tableauPlanetes[0]) {
		case pink1:
			/* blue1.add(soundGroupe1);
			soundGroupe1.play(); */
			for(var i=0;i<tabSound.length;i++) {
				if(i!=3) {
					transitionSonTo0AndSetVoix(tabSound[i],3);
				}
			}
			/* soundGroupe1.source.onended= ()=> {
				audioEnd=true;
			}; */
			break;
		case orange1:
			/* red1.add(soundGroupe3);
			soundGroupe3.play(); */
			for(var i=0;i<tabSound.length;i++) {
				if(i!=1) {
					transitionSonTo0AndSetVoix(tabSound[i],1);

				}
			}
		/* 	soundGroupe3.source.onended= ()=> {
				audioEnd=true;
			};
			 */
			break;
		case purple1:
			/*green1.add(soundGroupe0)
			soundGroupe0.play();*/
			for(var i=0;i<tabSound.length;i++) {
				if(i!=0) {
					transitionSonTo0AndSetVoix(tabSound[i],0);
				}
			}
			/* soundGroupe0.source.onended= ()=> {
				audioEnd=true;
			}; */
			
			break;
		case red1:
			/* yellow1.add(soundGroupe2);
			soundGroupe2.play(); */
			for(var i=0;i<tabSound.length;i++) {
				if(i!=2) {
					transitionSonTo0AndSetVoix(tabSound[i],2);
				}
			}
		/* 	soundGroupe2.source.onended= ()=> {
				audioEnd=true;
			}; */
			break;
	}

}
function changementUI(event,intersects) {
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

function addImageHover(event) {
	console.log(event.clientX+"hey"+event.clientY);
	rond.style.left=(event.clientX-250)+"px";
	console.log(event.pageX,event.pageY);
	rond.style.top=(event.clientY-250)+"px";
	rond.style.opacity=1;		

}
function changerImageEtLien(intersects) {
	var img = popup.querySelector("img");
		//TODOegzrogpzgznognzgzgongzno
		var iframe = document.querySelector("iframe")

	switch(intersects[0].object.name) {
		case "green1": 
			img.src=imgPurple1;
			iframe.src=LienPurple1;
			rond.src=vignettePurple1;
			break;
		case "green2": 
			img.src=imgPurple2;
			iframe.src=LienPurple2;
			rond.src=vignettePurple2;
			break;
		case "green3": 
			img.src=imgPurple3;	
			iframe.src=LienPurple3;
			rond.src=vignettePurple3;
			break;
		case "blue1": 
			img.src=imgPink1;
			iframe.src=LienPink1;
			rond.src=vignettePink1;
			break;
		case "blue2": 
			img.src=imgPink2;
			iframe.src=LienPink2;
			rond.src=vignettePink2;
			break;
		case "blue3": 
			img.src=imgPink3;
			iframe.src=LienPink3;
			rond.src=vignettePink3;
			break;
		case "red1": 
			img.src=imgOrange1;
			iframe.src=LienOrange1;
			rond.src=vignetteOrange1;
			break;
		case "red2": 
			img.src=imgOrange2;
			iframe.src=LienOrange2;
			rond.src=vignetteOrange2;
			break;
		case "red3": 
			img.src=imgOrange3;
			iframe.src=LienOrange3;
			rond.src=vignetteOrange3;
			break;
		case "yellow1": 
			img.src=imgRed1;
			iframe.src=LienRed1;
			rond.src=vignetteRed1;
			break;
		case "yellow2": 
			img.src=imgRed2;
			iframe.src=LienRed2;
			rond.src=vignetteRed2;
			break;
		case "yellow3": 
			img.src=imgRed3;
			iframe.src=LienRed3;
			rond.src=vignetteRed3;
			break;		
	}

}




function stopAndResetVoixAudios(){
	tabVoixSound.forEach(sound => {
		if(sound.isPlaying){
			sound.stop();
			sound.currentTime=0;
		}

		

	})
}

function stopAndResetAmbianceAudios(){
	tabSound.forEach(sound => {
		if(sound.isPlaying){
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

 

loader.load( 'models/boussolev2.1.glb', function ( glb ) {
	//LANCER SON 
	/*tabSound.forEach(sound => {
		sound.play();
	})*/
	for(var i=0;i<tabSound.length;i++) {
		tabSound[i].play();
		

	}
//	soundGlobal.play();
	tableauPlanetes=[glb.scene.getObjectByName("green1"),glb.scene.getObjectByName("green2"),glb.scene.getObjectByName("green3")];
	var canvas = document.querySelector("canvas");
	var groupeprec=document.getElementsByClassName('rectangle')[0];
		boussole=glb.scene;
	  mixer = new THREE.AnimationMixer(glb.scene);

	  animate();

    canvas.addEventListener('mousedown',onDocumentMouseDown,false); //on supprime pendant les transitions de camera 
	canvas.addEventListener('mousemove',onDocumentMouseMove,false);

/* GESTION de la transition du debut */
	glb.animations.forEach(animation => {
		//action.play();			
	if(animation.name.substr(animation.name.length-1)==="r") {
		var action2 = mixer.clipAction(animation);
		action2.clampWhenFinished=true;
		var nbTour=1;
		action2.setLoop(THREE.LoopRepeat,nbTour);
		var interval = setInterval(()=>{
			action2.setLoop(THREE.LoopRepeat,++nbTour);
		},19000);

		document.querySelector("button").addEventListener("click",()=> {
						clearInterval(interval);
						console.log(nbTour);
					
			action2.timeScale=4;
			
				//action.play();	
			var secToMilli = action2.getClip().duration*1000;	
			var expr=(secToMilli-(compteRebour%secToMilli));
				/*	setTimeout(function(){
						action2.paused=true;
					},expr/2);	*/
			//Quand le joueur click, il attend le temps restant jusqu'à la fin de la boucle puis l'anim s'arrete;
			setTimeout(()=>{
				transitionCamera(79.610,52.210, -67.580);

			},(expr/4)-1000);
		})
		action2.play();
	}
	mixer.addEventListener('finished',() => {
		groupeprec.style.pointerEvents="auto";
		groupesuiv.style.pointerEvents="auto";
	})
	
	changerInteractionPlanetes(glb.scene);
}) 

/* FIN gestion transition debut */


	groupeprec.addEventListener('mousedown',()=> {  
		groupeprec.style.pointerEvents="none";
		groupesuiv.style.pointerEvents="none";
		if(zoomed===0) {
			stopAndResetVoixAudios();
			audioEnd=false;
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
			tabSound.forEach(sound => {
				transitionSonTo1(sound);
			});
			stopAndResetVoixAudios();
			zoomed=0;
		} else if(zoomed===2) {
			playAndTransitionAmbianceAudios();
			groupesuiv.querySelector("p").innerHTML="Revenir à la carte";
			if(document.querySelector('.jeu')) {
				document.querySelector('.jeu').style.display="none";

			}
			document.querySelector("iframe").src="https://dcn.eestienne.info/QuentinBA/Aframe/" //degueu c'est pour enlever le son quand on revient au groupe
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

function playAndTransitionAmbianceAudios() {
	tabSound.forEach(sound => {
		if(!sound.isPlaying) {
			sound.play();
			transitionSonTo1(sound);
		}

	})
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

function transitionSonTo0AndSetVoix(sound,i) {
	var volume = {x:0.3};
	console.log("n1 : indexVoix")
	console.log(i);
	console.log("n1 : tabVoixSound");
	console.log(tabVoixSound);
	var index = {indexVoix:i}
	new TWEEN.Tween(volume).to({
		x: 0
	}, 7000).onUpdate(function(object) {
	   sound.setVolume(object.x);
	}).start();


	//ATTENTION c'est degueu le onComplete c'est ça 
	setTimeout(()=> {
		if(zoomed===1){
			tabVoixSound[i].play();
			tabVoixSound[i].source.onended= ()=> {
				audioEnd=true;
			};
		}
		
	},7000);
}


function transitionSonTo1(sound) {
	var volume = {x:0};
	new TWEEN.Tween(volume).to({
		x: 0.3
	}, 7000).onUpdate(function(object) {
	   sound.setVolume(object.x);
	}).onComplete(function() {
	
	}).start();
	
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
        camera.lookAt(0,0,0);
      })
     .onComplete(function () {
        canvas.addEventListener('mousedown',onDocumentMouseDown);
        //remettre point
     /*   if(groupeprec.style.display==="block") {
        	zoomed=0;
		}*/
		if(zoomed===1) {
			audioHistoireGroupe(); //Lance l'audio a la fin de l'animation camera pour arriver sur le groupe
			console.log("SALUT");
		}

      })
      .start();

}

function EventIframe() {
var popup = document.getElementsByClassName("modal")[0];

	document.querySelector(".modal a").addEventListener("click",()=> {
		popup.style.pointerEvents="none";
		popup.style.opacity=0;
		stopAndResetAmbianceAudios(); //arretr et reset avant le lancement aframe
		if(document.querySelector('.jeu')) {
			
			document.querySelector('.jeu').style.display="block";

		}
		
	})
}

function decompte() {
		setInterval(()=> {
			compteRebour+=100;
		},100);
	
	
}

function renderPass() {

	const params = {
		exposure: 0.75,
		bloomStrength: 3,
		bloomThreshold: 0.1,
		bloomRadius: 0.25
	};
	const renderScene = new RenderPass( scene, camera );

				const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
				bloomPass.threshold = params.bloomThreshold;
				bloomPass.strength = params.bloomStrength;
				bloomPass.radius = params.bloomRadius;

				const composer = new EffectComposer( renderer );
				composer.addPass( renderScene );
				composer.addPass( bloomPass );

}

function main() {
	renderPass();
	load();
	decompte();
	EventIframe();



}	


main();