import * as THREE from 'three'
import Experience from '../Experience.js'
// import vertexShader from '../shaders/portalFlowGrill/vertex.glsl'
// import fragmentShader from '../shaders/portalFlowGrill/fragment.glsl'
import Project from './Project.js'


export default class Dungeon
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.debug = this.experience.debug
 
        if (this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'grill'
            })
        }
    
        this.width = 479
        this.height = 800
        this.ratio = this.width / this.height
        this.count = this.width * this.height
        this.group = new THREE.Group()
        this.scene.add(this.group)

        this.setMaterials()
        this.setGeometry()  
    }

    setMaterials()
    {
        this.resources.items.rightWall.flipY = false
        this.resources.items.rightWall.encoding = THREE.sRGBEncoding
        this.rightWallMat = new THREE.MeshBasicMaterial({map: this.resources.items.rightWall})

        
        this.resources.items.leftWall.flipY = false
        this.resources.items.leftWall.encoding = THREE.sRGBEncoding
        this.leftWallMat = new THREE.MeshBasicMaterial({map: this.resources.items.leftWall})

        this.resources.items.contact.flipY = false
        this.resources.items.contact.encoding = THREE.sRGBEncoding
        this.contactMat = new THREE.MeshBasicMaterial({map: this.resources.items.contact})
        
        
        this.resources.items.floor.flipY = false 
        this.resources.items.floor.encoding = THREE.sRGBEncoding
        this.floorMat = new THREE.MeshBasicMaterial({map: this.resources.items.floor})
        
        
        this.resources.items.portals.flipY = false
        this.resources.items.portals.encoding = THREE.sRGBEncoding
        this.portalsMat = new THREE.MeshBasicMaterial({map: this.resources.items.portals})

        this.resources.items.flag.encoding = THREE.sRGBEncoding
        this.resources.items.flag.flipY = false
        this.flagMat = new THREE.MeshBasicMaterial({map: this.resources.items.flag})
        // this.resources.items.floorContact.flipY = false
        // this.resources.items.floorContact.encoding = THREE.sRGBEncoding
        // this.floorContactMat = new THREE.MeshBasicMaterial({map: this.resources.items.floorContact})

        // this.resources.items.portalFloor.flipY = false
        // this.resources.items.portalFloor.encoding = THREE.sRGBEncoding
        // this.floorPortalsMat = new THREE.MeshBasicMaterial({map: this.resources.items.portalFloor})

        this.resources.items.stairs.flipY = false
        this.resources.items.stairs.encoding = THREE.sRGBEncoding
        this.stairsMat = new THREE.MeshBasicMaterial({map: this.resources.items.stairs})

        this.resources.items.details.flipY = false
        this.resources.items.details.encoding = THREE.sRGBEncoding
        this.detailsMat = new THREE.MeshBasicMaterial({map: this.resources.items.details})

        this.resources.items.bridge.flipY = false
        this.resources.items.bridge.encoding = THREE.sRGBEncoding
        this.bridgeMat = new THREE.MeshBasicMaterial({map: this.resources.items.bridge})


    }

    setGeometry()
    {

        // this.color =  {}
        // this.color.value = '#2cff3a'
        // this.color.instance = new THREE.Color(this.color.value)
        // const light = new THREE.AmbientLight(0xffffff, .5)
        // this.group.add(light)
        

        // this.whiteMatCap.wrapS = this.whiteMatCap.wrapT = THREE.RepeatWrapping
        // tuniform.iChannel0.value.wrapS = tuniform.iChannel0.value.wrapT = THREE.RepeatWrapping;
        // this.geometry = new THREE.PlaneBufferGeometry(1.5, 2, 1, 1 )
        // console.log(this.resources.items.dungeonModel.scene)
        this.project1 = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'project1'))
        this.project1.layers.set(2)
        this.project2 = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'project2'))
        this.project2.layers.set(2)
        this.project3 = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'project3'))
        this.project3.layers.set(2)
        console.log(this.resources.items.dungeonModel)

        // this.geometry.portals.material = new THREE.MeshBasicMaterial({color:'#BBBFC2'})
        // this.geometry.floor.material = new THREE.MeshBasicMaterial({color:'#00e3e3'})

        //set Geometry 

        this.rightWalls = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'rightWall'))
        this.leftWalls = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'leftWall'))
        this.stairs = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'pillar'))
        this.floor = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'floor'))
        // this.floorContact = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'floorContact'))
        // this.floorPortals = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'floorPortals'))
        this.portals = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'portals'))
        this.contact = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'contactWall'))
        this.bridge = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'bridge'))
        this.details = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'details'))
        this.flag = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'flag'))

        this.underFloor = this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'underFloor'))



        console.log(this.rightWalls)

        //apply the Materials
        this.rightWalls.material = this.rightWallMat
        this.leftWalls.material = this.leftWallMat
        this.stairs.material = this.stairsMat
        this.floor.material = this.floorMat
        // this.floorContact.material = this.floorContactMat
        // this.floorPortals.material = this.floorPortalsMat
        this.portals.material = this.portalsMat
        this.contact.material = this.contactMat
        this.details.material = this.detailsMat
        this.bridge.material = this.bridgeMat
        this.flag.material = this.flagMat

        this.underFloor.material = new THREE.MeshBasicMaterial({color:'#000000'})



        // this.resources.items.dungeonModel.scene.children.find((child=> child.name === 'project1'))
        // this.walls.material = new THREE.MeshMatcapMaterial({matcap: this.whiteMatCap, flatShading:true})


        // this.walls.material = new THREE.MeshBasicMaterial({wireframe: true, color:'#ffffff'})
        // this.walls.material.needsUpdate = true
             


        this.group.add(
            this.rightWalls,
            this.leftWalls,
            this.stairs,
            this.floor,
            this.portals,
            this.contact,
            this.details,
            this.bridge,
            this.flag,
            this.underFloor
        )

        
        // console.log(this.project1)
        // this.material = new THREE.ShaderMaterial({
        //     uniforms:
        //     {
        //         iTime: {value: 0 },
        //         uTexture: {value: this.resources.items.daPortal},
        //         uColor: {value: this.color.instance}
        //     },
            // transparent:true,
            // vertexShader:vertexShader,
            // fragmentShader:fragmentShader,
            // color: 0xff0000,
            // wireframe:true
        // })
        // this.project1.material = this.material
        // this.resources.items.daPortal.encoding = THREE.sRGBEncoding
        this.resources.items.daPortal.flipY = false
        this.resources.items.cantine.flipY = false
        this.resources.items.scrimba.flipY = false

        this.project1Mat = new Project({image: this.resources.items.daPortal, color: '#2cff3a'})
        this.project2Mat = new Project({image: this.resources.items.cantine, color: '#3473ff'})
        this.project3Mat = new Project({image: this.resources.items.scrimba, color: '#ff343c'})


        this.project1.material = this.project1Mat.material
        this.project2.material = this.project2Mat.material
        this.project3.material = this.project3Mat.material
        // if(this.debug)
        // {
        //     this.debugFolder
        //         .addInput(
        //             this.color,
        //             'value',
        //             { label: 'color' }
        //         )
        //         .on('change', () =>
        //         {
        //             this.color.instance.set(this.color.value)
        //         })
            
        // }
     
        // console.log(this.material)
        // this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.group.add(this.project1, this.project2, this.project3)
    }


    update()
    {
    //    this.material.uniforms.iTime.value = this.time.elapsed * 0.001
       if(this.project1Mat)
       this.project1Mat.update()
       if(this.project2Mat)
       this.project2Mat.update()
       if(this.project3Mat)
       this.project3Mat.update()
    }
}