import * as THREE from 'three'
import Experience from '../Experience.js'
import vertexShader from '../shaders/portalFlowGrill/vertex.glsl'
import fragmentShader from '../shaders/portalFlowGrill/fragment.glsl'

export default class Project
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.image = _options.image
        this.colorPassed = _options.color
 
        if (this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'project'
            })
        }
    
        this.width = 479
        this.height = 800
        this.ratio = this.width / this.height
        this.count = this.width * this.height
        this.group = new THREE.Group()
        this.scene.add(this.group)


        this.setMaterial()  
    }

    setMaterial()
    {

        this.color =  {}
        this.color.value = this.colorPassed
        this.color.instance = new THREE.Color(this.color.value)

        this.material = new THREE.ShaderMaterial({
            uniforms:
            {
                iTime: {value: 0 },
                uTexture: {value: this.image},
                uColor: {value: this.color.instance},
                uStrength: {value: this.sizes.mode ==='smallScreen'? 0.4 : 0.1}
            },
            // transparent:true,
            vertexShader:vertexShader,
            fragmentShader:fragmentShader,
            // color: 0xff0000,
            // wireframe:true
        })
        if(this.debug)
        {
            this.debugFolder
                .addInput(
                    this.color,
                    'value',
                    { label: 'color' }
                )
                .on('change', () =>
                {
                    this.color.instance.set(this.color.value)
                })
            
        }

    }


    update()
    {
       this.material.uniforms.iTime.value = this.time.elapsed * 0.001
    }
}