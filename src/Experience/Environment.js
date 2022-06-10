import * as THREE from 'three'
import Experience from './Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.renderer = this.experience.renderer

        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'portals'
            })
        }

        if (this.resources)
        this.setTest()
        // this.setImage()
    }
    
    setTest()
    {
        this.geometry = {}

        // this.geometry.dungeons = this.resources.items.portalsModel.scene.children.find((child)=> child.name === 'portals')
        // this.geometry.floor = this.resources.items.portalsModel.scene.children.find((child)=> child.name === 'floor')
        
        // this.geometry.portals.position.y = -1.567
        // this.geometry.floor.position.y = -1.77
        // console.log(this.resources.items.portalsModel)

        // // this.geometry.portals.material = new THREE.MeshBasicMaterial({color:'#BBBFC2'})
        // // this.geometry.floor.material = new THREE.MeshBasicMaterial({color:'#00e3e3'})

        // this.walls = this.resources.items.portalsModel.scene.children.find((child=> child.name === 'walls'))
        // // this.resources.items.portalsModel.scene.children.find((child=> child.name === 'project1'))
        // this.walls.material = new THREE.MeshStandardMaterial({wireframe: true, color:'#ffffff'})
        // this.walls.material.needsUpdate = true
             


        // this.scene.add(this.walls)
        // this.scene.add(this.geometry.portals )
        
        // if(this.debug)
        // {
        //     this.debugFolder
        //         .addInput(
        //             this.geometry.portals.position,
        //             'y',
        //             {
        //                 min: -10, max: 10, step: 0.001
        //             }
        //         )
        // }
    }
    setImage()
    {
        this.imgGeometry = new THREE.PlaneBufferGeometry(1, 1.7, 1, 1)
        this.imgMaterial = new THREE.MeshBasicMaterial({
            map:this.resources.items.daPortal
        })
        
        this.imgMesh = new THREE.Mesh(this.imgGeometry, this.imgMaterial)
        this.imgMesh.position.set(0,-0.4,-3.7)
        this.scene.add(this.imgMesh)
        if(this.debug)
        {
            this.debugFolder
                .addInput(
                    this.imgMesh.position,
                    'x',
                {
                    min:-10,max:10,step:0.1
                }
            )
            this.debugFolder.addInput(
                this.imgMesh.position,
                "y",
                {
                    min:-10,max:10,step:0.1
                }
            )
            this.debugFolder.addInput(
                this.imgMesh.position,
                "z",
                {
                    min:-10,max:10,step:0.1
                }
            )



        }





    }

    
}