import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)


export default class Camera
{
    constructor(_options)
    {
        // Options
        this.experience = new Experience()
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.targetElement = this.experience.targetElement
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.height = this.experience.config.maxHeight
    

        if (this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'camera'
            })
        }
        this.setInstance()
        this.setControls()
        this.setTransitions()
        
        this.setProjectNav() 
        // this.setModes()
    }

    setInstance()
    {
        const camAng = this.config.widht > 600? 50 : 75
        // Set up
        this.instance = new THREE.PerspectiveCamera(camAng, this.config.width / this.config.height, 0.1, 100)
        this.instance.rotation.reorder('YXZ')
        this.instance.layers.enableAll()
        this.instance.position.set(2.2, 2.1, 0.7)
        this.scene.add(this.instance)
    }

    setModes()
    {
        this.modes = {}

        // Default
        this.modes.default = {}
        this.modes.default.instance = this.instance.clone()
        this.modes.default.instance.rotation.reorder('YXZ')

        // Debug
        this.modes.debug = {}
        this.modes.debug.instance = this.instance.clone()
        this.modes.debug.instance.rotation.reorder('YXZ')
        this.modes.debug.instance.position.set(3.2, 2.4, 0.6)
        
        this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
        this.modes.debug.orbitControls.enabled = this.modes.debug.active
        this.modes.debug.orbitControls.screenSpacePanning = true
        this.modes.debug.orbitControls.enableKeys = false
        this.modes.debug.orbitControls.zoomSpeed = 1
        this.modes.debug.orbitControls.enableDamping = true
        this.modes.debug.orbitControls.target.x = -20
        this.modes.debug.orbitControls.target.y = 0
        this.modes.debug.orbitControls.target.z = 0.4
        
        this.modes.debug.orbitControls.update()
        if (this.debug)
        {
            this.debugFolder
            .addInput(
                this.modes.debug.instance.position,
                'x',
                { label: 'posx', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.modes.debug.orbitControls.update()
            })
            this.debugFolder
            .addInput(
                this.modes.debug.instance.position,
                'y',
                { label: 'posy', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.modes.debug.orbitControls.update()
            })
            this.debugFolder
            .addInput(
                this.modes.debug.instance.position,
                'z',
                { label: 'posz', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.modes.debug.orbitControls.update()
            })
            this.debugFolder
            .addInput(
                this.modes.debug.orbitControls.target,
                'x',
                { label: 'targetx', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.modes.debug.orbitControls.update()
            })
            this.debugFolder
            .addInput(
                this.modes.debug.orbitControls.target,
                'y',
                { label: 'targety', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.modes.debug.orbitControls.update()
            })
            this.debugFolder
            .addInput(
                this.modes.debug.orbitControls.target,
                'z',
                { label: 'targetz', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.modes.debug.orbitControls.update()
            })

        }
    }


    //need fix
    setLogic()
    {
        this.logic = {}
        this.logic.buttonsLocked = false
        this.logic.mode = 'landingPage'
        this.logic.lockButtons = async (lockDuration) =>
        {
            this.logic.buttonsLocked = true
            await this.sleep(lockDuration)
            this.logic.buttonsLocked = false
        }
    }



    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.targetElement)
        // this.controls.enableDamping = true
        // this.controls.enablePan = false
    
        // this.controls.rotateSpeed = 0.8
        // this.controls.zoomSpeed = 0.8
        // this.controls.maxPolarAngle = 1.34   //vertical
        // this.controls.minPolarAngle = -Math.PI / 8
        // this.controls.maxAzimuthAngle = Math.PI * 2   // orizontal
        // // this.controls.minAzimuthAngle =
        // this.controls.maxDistance = 30
        this.controls.enableRotate = false
        this.controls.enableZoom = false
        this.controls.enablePan = false
        // this.controls.enabled = this.modes.debug.active
        this.controls.screenSpacePanning = true
        this.controls.enableKeys = false
        this.controls.zoomSpeed = 1
        this.controls.enableDamping = true
        this.controls.target.x = -20
        this.controls.target.y = this.sizes.mode === 'smallScreen'? 1.0 : 0.9
        this.controls.target.z = 0.4
        this.controls.update()

        if (this.debug)
        {
            this.debugFolder
            .addInput(
                this.instance.position,
                'x',
                { label: 'posx', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.controls.update()
            })
            this.debugFolder
            .addInput(
                this.instance.position,
                'y',
                { label: 'posy', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.controls.update()
            })
            this.debugFolder
            .addInput(
                this.instance.position,
                'z',
                { label: 'posz', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.controls.update()
            })
            this.debugFolder
            .addInput(
                this.controls.target,
                'x',
                { label: 'targetx', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.controls.update()
            })
            this.debugFolder
            .addInput(
                this.controls.target,
                'y',
                { label: 'targety', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.controls.update()
            })
            this.debugFolder
            .addInput(
                this.controls.target,
                'z',
                { label: 'targetz', min:-40, max:40, step:0.1 }
            )
            .on('change', () =>
            {
                this.controls.update()
            })

        }
        
    }

    setCamAngles()
    {
        this.camAngle = {}

        this.camAngle.unlocked = () =>
        {
            this.controls.target.x = 0
            this.controls.target.y = 0
            this.controls.target.z = 0
            this.controls.maxDistance = 30
            this.controls.minDistance = 0
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
            this.cam = true
        }

        this.camAngle.default = () =>
        {
            this.controls.minDistance = 9
            this.controls.maxDistance = 26
            this.controls.minAzimuthAngle = 0 
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = 0.487
            this.controls.maxPolarAngle = 1.429
            this.cam = false
        }

    }

    setCamControls()
    {
        this.camControls = {}

        this.camControls.toDefault = async () =>
        {
            if (this.logic.buttonsLocked === false)
            {
                if(this.backToDefault.classList.contains('fadeIn'))
                {
                    this.backToDefault.classList.remove('fadeIn')
                }

                window.location.hash= '#home'
                this.instance.layers.enableAll()
                this.instance.layers.disable(5)

                if(this.logic.mode==='menu')
                {
                    if(this.menuList.classList.contains('block'))
                    {
                        this.menuList.classList.remove('block')
                    }
                }
            
                this.logic.mode = 'car'
                this.logic.lockButtons(1600)
                this.camAngle.unlocked()
                this.transitions.default(1.5)
                await this.sleep(1500)
                this.camAngle.default()
                
            }
        }

        this.camControls.toMenu = async () =>
        {
            
            if (this.logic.buttonsLocked === false && this.logic.mode === 'car' || 
                this.logic.buttonsLocked=== false && this.logic.mode ==='delivery')
            {
                this.instance.layers.disable(5)
                this.logic.mode = 'menu'
                window.location.hash = "#menu"
                this.logic.lockButtons(3100)
                this.camAngle.unlocked()
                this.transitions.menu(3)
                await this.sleep(3000)
                if(this.logic.mode==='menu')
                {this.toggleMenu()
                this.instance.layers.disableAll()
                window.pageYOffset = 0}
            }
        }

        this.camControls.toDelivery = async () =>
        {
            if (this.logic.buttonsLocked === false && this.logic.mode === 'car')
            {
                if(this.logic.mode='menu')
                {
                    if(this.menuList.classList.contains('block'))
                    {
                        this.menuList.classList.remove('block')
                    }
                }
                this.logic.mode = 'delivery'
                window.location.hash = "#delivery"
                this.logic.lockButtons(2500)
                this.camAngle.unlocked()
                this.transitions.delivery(1.5)
                await this.sleep(1500)
                this.backToDefault.classList.add('fadeIn')
                if (this.logic.mode==='delivery')this.instance.layers.enable(5)
            }
        }
        this.camControls.toCredits = async () =>
        {
            
            if (this.logic.buttonsLocked === false && this.logic.mode === 'car')
            {
                this.logic.mode = 'credits'
                window.location.hash = "#credits"
                this.logic.lockButtons(3500)
                this.camAngle.unlocked()
                this.transitions.credits(1.5)
                await this.sleep(1500)
                this.experience.world.logo.toCenter()
                this.backToDefault.classList.add('fadeIn')
            }
        }
        this.camControls.toBurgers = async () =>
        {
            
            if (this.logic.buttonsLocked === false && this.logic.mode === 'car')
            {
                this.logic.mode = 'burgers'
                window.location.hash = "#burgers"
                this.logic.lockButtons(1500)
                this.camAngle.unlocked()
                this.transitions.burgers(1.5)
                await this.sleep(1500)
                this.backToDefault.classList.add('fadeIn')
            }
        }
    }
    setTransitions()
    {
            this.transitions = {}

            /* ************
            ***  Landing  ****
            **************/
            this.transitions.landingPage = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false
                // console.log(this.sizes.mode)
                // this.instance.position.set(3.2, 2.4, 0.6)
                // if(this.sizes.mode === 'bigScreen'){
                    gsap.to(this.instance.position, { duration: duration / 2, ease: "power1.inOut",
                    x: 3.2,
                    y:2.4,
                    z:0.6})
                    // z:this.projectsDistance
                
                    gsap.to(this.controls.target, { duration: duration / 2, ease: "power1.inOut",
                    x: -20.0,
                    y:0,
                    z:1.0})

                    // gsap.to(this.instance.position, {delay:duration / 2, duration: duration / 2, ease: "power1.inOut",
                    // x: 1.7,
                    // y:1.4,
                    // z:2.0})
                    // gsap.to(this.controls.target, {delay:duration / 2, duration: duration / 2, ease: "power1.inOut",
                    // x: 1.7,
                    // y:1.4,
                    // z:0})
                    
                    // await this.sleep(1500)
                // }
                // else if(this.sizes.mode === 'smallScreen')
                // {
                //     gsap.to(this.instance.position, { duration: duration / 2, ease: "power1.inOut",
                //     x: 1.7,
                //     y:1.9,
                //     z:2.8})
                //     // z:this.projectsDistance
                
                //     gsap.to(this.controls.target, { duration: duration / 2, ease: "power1.inOut",
                //     x: 1.7,
                //     y:1.9,
                //     z:0.3})
                //     gsap.to(this.instance.position, {delay:duration / 2, duration: duration / 2, ease: "power1.inOut",
                //     x: 1.7,
                //     y:1.5,
                //     z:2.8})
                //     gsap.to(this.controls.target, {delay:duration / 2, duration: duration / 2, ease: "power1.inOut",
                //     x: 1.7,
                //     y:1.5,
                //     z:0.3})
                    
                // }
            }

            /* ****************
            ***  About  ****
            ******************/
            this.transitions.about = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false
                // console.log(this.sizes.mode)
                // if(this.sizes.mode === 'bigScreen'){
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: -1.9,
                    y:2.4,
                    z:0.6})
                    
 
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: -20,
                    y:0.8,
                    z:1.0})
                // }
                // else if(this.sizes.mode === 'smallScreen')
                // {
                //     gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                //     x: 8.5,
                //     y:2,
                //     z:-2.3})

                //     gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                //     x: 1,
                //     y:2,
                //     z:6.6})        
                // }
              
            }
            /* ***************
            ***  Work  ****
            *****************/
            this.transitions.work = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false    
                    if(this.sizes.mode === 'bigScreen'){
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: -12.8,
                    y: 0.9,
                    z: 1.0})
                    
 
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: -18.7,
                    y: 0.9,
                    z: 7.0})
                    
                   
                }
                else if(this.sizes.mode === 'smallScreen')
                {
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: -12.7,
                    y:1.0,
                    z:1})
                
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: -17.7,
                    y:1.0,
                    z:5.6})

                }
            }
            this.transitions.workLeft = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false
                // console.log(this.sizes.mode)
                if(this.sizes.mode === 'bigScreen'){
                   
                    //turn left

                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut", 
                    x: -12.2,
                    y: 0.9,
                    z: 1.3})
                    
 
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut", 
                    x: -12.1,
                    y: 0.9,
                    z: 7.0})
                    
                   
                }
                else if(this.sizes.mode === 'smallScreen')
                {
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: -12.3,
                    y:1.0,
                    z:1})
                
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
                    x: -12.3,
                    y:1.0,
                    z:5.8})

                }
            }
            this.transitions.workRight = async (duration) =>
            {
                this.controls.enableRotate = false
                this.controls.enableZoom = false
                // console.log(this.sizes.mode)
                if(this.sizes.mode === 'bigScreen'){
                 
                    //turn right

                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut", 
                    x: -12.9,
                    y:0.9,
                    z:0.6})
                    
         
                    // this.experience.camera.controls.target.set(-20., 0.7, .4)
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut", 
                    x: -20.0,
                    y:0.9,
                    z:0.4})
                    
                   
                }
                else if(this.sizes.mode === 'smallScreen')
                {
            
                    gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
                    x: -12.7,
                    y:1.0,
                    z:0.6})
                
                    gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut", 
                    x: -20.0,
                    y:1.0,
                    z:0.4})

                }
            }
            

            /* ***************
            ***  Contact  ****
            *****************/
            this.transitions.contact = async (duration) =>
            {
                gsap.to(this.instance.position, { duration: duration / 2, ease: "power1.inOut",
                x: -12.7,
                y:0.9,
                z:0.7})
                

                gsap.to(this.controls.target, { duration: duration / 2, ease: "power1.inOut",
                x: -12.7,
                y:0.9,
                z:-13.4})
                //then going up to end of wall 

                gsap.to(this.instance.position, { duration: duration / 2, ease: "power1.inOut", delay:duration / 2,
                x: -12.5,
                y:2.5,
                z:-3.1})
                

                gsap.to(this.controls.target, { duration: duration / 2, ease: "power1.inOut", delay:duration / 2,
                x: -12.5,
                y:2.4,
                z:-6.5})
    
                await this.sleep(1500)
                // this.controls.enableRotate = true
                // this.controls.enableZoom = true
            }
    }

   
    setProjectNav()
    {
        this.projectLoc = 3
        document.getElementById('projectLeft').addEventListener('click', ()=>
        {
            // if(this.logic.mode ==='project' && projectLocation !== 1)
            if (this.projectLoc === 3)
            {
                this.transitions.work(1)
                this.projectLoc--
            }
            else if (this.projectLoc === 2)
            {
                this.transitions.workLeft(1)
                this.projectLoc --
            }
            else if (this.projectLoc === 1)
            {
                this.transitions.workRight(1)
                this.projectLoc = 3
            }

        })
        document.getElementById('projectRight').addEventListener('click', ()=>
        {
            // if(this.logic.mode ==='project' && projectLocation !== 1)
            if (this.projectLoc === 1)
            {
                this.transitions.work(1)
                this.projectLoc++
            }
            else if (this.projectLoc === 2 )
            {
                this.transitions.workRight(1)
                this.projectLoc ++
            }
            else if (this.projectLoc === 3 )
            {
                this.transitions.workLeft(1)
                this.projectLoc = 1
            }
        })

    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    resize()
    {
        this.instance.aspect = this.config.width / this.config.height
        this.instance.updateProjectionMatrix()

        // this.modes.default.instance.aspect = this.config.width / this.config.height
        // this.modes.default.instance.updateProjectionMatrix()

        // this.modes.debug.instance.aspect = this.config.width / this.config.height
        // this.modes.debug.instance.updateProjectionMatrix()
    }

    update()
    {
        // Update debug orbit controls
        this.controls.update()

        // Apply coordinates
        // this.instance.position.copy(this.modes[this.mode].instance.position)
        // this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
        this.instance.updateMatrixWorld() // To be used in projection
    }

    destroy()
    {
        this.modes.debug.orbitControls.destroy()
    }
}
