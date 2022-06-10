import * as THREE from "three"
import Experience from "./Experience.js"
// import PreLoader from "./Preloader.js"



export default class Raycaster
{   
    constructor()
    {
        this.experience = new Experience()
        this.preLoader = this.experience.preloader
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.config = this.experience.config
        this.camera = this.experience.camera
        this.logic = this.camera.logic
        this.preLoader.on('start', ()=>
        {
            
            this.config.touch = this.experience.config.touch
            this.scene = this.experience.world.dungeon
            this.raycaster  = new THREE.Raycaster()
            this.raycaster.layers.set(1)
            
            this.cursorDown = new THREE.Vector2()
            this.cursor = new THREE.Vector2()
            this.setUp()
            if (this.sizes.mode === 'bigScreen')
            {
                this.setUpHover()
            }
        })
        
        
    }
    setUp()
    {
        this.objectsToTest = []
        console.log(this.scene)
        //projects
        this.objectsToTest.push( this.scene.project1)
        this.objectsToTest.push( this.scene.project2)
        this.objectsToTest.push( this.scene.project3)
        
       
            

       
        this.touchedPoints = []
        window.addEventListener('pointerdown', (event) =>
            {
                this.touchedPoints.push(event.pointerId)

                //testing with bigger range for not that sensitive touch
                this.cursorXMin = Math.abs((event.clientX / this.sizes.width * 2 - 1)*0.5) 
                this.cursorXMax = Math.abs((event.clientX / this.sizes.width * 2 - 1)*1.6) 

                this.cursorYMin = Math.abs((event.clientY / this.sizes.height * 2 - 1)*0.5) 
                this.cursorYMax = Math.abs((event.clientY / this.sizes.height * 2 - 1)*1.6) 

            })

        window.addEventListener('pointerup', (event) =>
            {
                this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1

                this.absX = Math.abs(this.cursor.x) 
                this.absY = Math.abs(this.cursor.y) 
                
                if(this.touchedPoints.length === 1 && 
                this.absX > this.cursorXMin && this.absX < this.cursorXMax &&
                this.absY > this.cursorYMin && this.absY < this.cursorYMax) 

                {
                this.click(this.cursor)

                this.touchedPoints = []
                }
                else
                {this.touchedPoints = []}
            })

    }
    
    click(cursor)
    {
        
        this.raycaster.setFromCamera(cursor, this.camera.instance)

        // this.intersectsObjects = this.raycaster.intersectObjects(this.experience.scene.children)
        this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)

        if(this.intersectsObjects.length)
        {
            this.selectedModel = this.intersectsObjects[0].object
            if (this.selectedModel.name === "project1")
            {
                console.log('project1 clicked')
                // https://digitalaccounting.gr/
            }
            if (this.selectedModel.name === "project2")
            {
                console.log('project2 clicked')
                // https://kantinatisannoulas.gr/
            }
            if (this.selectedModel.name === "project3")
            {
                console.log('project3 clicked')
                // https://dfdwebsites.github.io/scrimba-project/
            }

            // if (this.selectedModel.name === "vespa" || this.selectedModel.name ==="deliverySign")
            // {
            //     if(this.logic.buttonsLocked === false && this.logic.mode === 'delivery')
            //     {
            //         this.camera.camControls.toDefault()
            //     }
            //     this.camera.camControls.toDelivery()
                
            // }

            // if (this.selectedModel.name ==="tv")
            // {
                
            //     this.experience.world.portal.changeVideo()
            // }


            // if (this.selectedModel.name ==="creditTv" || this.selectedModel.name === 'creditSign'|| this.selectedModel.name ==='exitCredits')
            // {
            //     if(this.logic.buttonsLocked === false && this.logic.mode === 'credits')
            //     {
            //         this.experience.world.portal.changeTv()
            //         this.experience.world.logo.changeVisibility()
            //         this.experience.world.logo.linkArea.layers.set(2)
            //         this.experience.world.logo.exitArea.layers.set(2)
            //         this.camera.camControls.toDefault()
            //     }
                
            //     this.camera.camControls.toCredits()
            // }
            // if(this.selectedModel.name === 'exitCredits' && this.logic.buttonsLocked === false && this.logic.mode === 'burgers')
            // {
            //     this.experience.world.logo.exitArea.layers.set(2)
            //     this.camera.camControls.toDefault()
            // }

            // if(this.selectedModel.name === 'tel' && this.logic.mode === 'delivery')
            // {
            //     // window.open('tel: +302310445184')
            //     window.location.href ='tel: +302310445184'
            // }
          
            // if(this.selectedModel.name === 'link' && this.logic.mode === 'credits')
            // {

            //     window.open('https://dfdwebsites.netlify.app/', '');
            // }
        }
    }
    setUpHover()
    {
        
        window.addEventListener('pointermove', (event)=>
        {
            this.cursor.x = event.clientX / this.sizes.width * 2 - 1
            this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1
        })
        
    }
    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    update()
    {
        if (this.sizes.mode === 'bigScreen' && this.cursor)
            {
          
                // document.body.style.cursor = 'default';
                // console.log(this.cursor)
                this.raycaster.setFromCamera(this.cursor, this.camera.instance)

                // this.intersectsObjects = this.raycaster.intersectObjects(this.experience.scene.children)
                this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)
                if(this.intersectsObjects.length)
                {
                    document.documentElement.style.cursor = 'pointer';
                    
                    this.hoveredObj = this.intersectsObjects[0].object
                if (this.hoveredObj.name === "project1")
                    {
                        this.scene.project1.material.uniforms.uStrength.value += this.scene.project1.material.uniforms.uStrength.value >= 0.4? 0 : 0.003
                        // this.scene.project1.material.needsUpdate = true
                        
                    }
                
                 if (this.hoveredObj.name === "project2")
                {
                    this.scene.project2.material.uniforms.uStrength.value += this.scene.project2.material.uniforms.uStrength.value >= 0.4? 0 : 0.003
                    // this.scene.project2.material.needsUpdate = true
                   
                }
                if (this.hoveredObj.name === "project3")
                {
                    this.scene.project3.material.uniforms.uStrength.value += this.scene.project3.material.uniforms.uStrength.value >= 0.4? 0 : 0.003
                    // this.scene.project3.material.needsUpdate = true
                    
                }
                
                    
                }
                else
                {
                    this.scene.project1.material.uniforms.uStrength.value -= this.scene.project1.material.uniforms.uStrength.value <= 0.1? 0 : 0.003
                    this.scene.project2.material.uniforms.uStrength.value -= this.scene.project2.material.uniforms.uStrength.value <= 0.1? 0 : 0.003
                    this.scene.project3.material.uniforms.uStrength.value -= this.scene.project3.material.uniforms.uStrength.value <= 0.1? 0 : 0.003
                    document.documentElement.style.cursor = 'default';
                }
                
                
            }
    }

    
}

