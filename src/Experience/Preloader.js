import * as THREE from 'three'
import Experience from './Experience.js'
import EventEmitter from './Utils/EventEmitter.js'
import gsap from 'gsap'

export default class PreLoader extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.camera = this.experience.camera
        this.scene = this.experience.scene
        this.sounds = this.experience.sounds
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.overlay = document.querySelector('.overlay')
        this.cooking = document.querySelector('#cooking')
        this.leftDoor = document.querySelector(".leftDoor")
        this.rightDoor = document.querySelector(".rightDoor")
        // this.startButton = document.querySelector('.start')  
        // this.menu = document.querySelector('.menu')     



        // Progress
        this.resources.on('progress', () =>
        {
           
            // this.progressRatio = (this.resources.loaded + 1)/ this.resources.toLoad
            this.progressRatio = this.resources.groups.current.loaded  / this.resources.groups.current.toLoad
        
            document.getElementById("progressPercentage").innerHTML = Math.trunc(this.progressRatio * 100)
        })

        //Loaded
        this.resources.on('end', () =>
        {

            gsap.to('.leftDoor', {xPercent:'-100', duration: 1.5})
            gsap.to('.rightDoor', {xPercent:'100', duration: 1.5})
            window.setTimeout(() =>
            {
                this.cooking.classList.add('fade')
            }, 1500)

            window.setTimeout(() =>
            {
                this.start()
                // this.readyScreen()
                // this.startButton.click()
            }, 1500)
        })
    }
    
    start = async () => {
        this.overlay.classList.add('fade')
        this.cooking.remove()

        window.setTimeout(() =>
        {
            this.overlay.remove()
        }, 2000)

        // this.camera.camControls.toDefault()
        // window.setTimeout(() =>
        // {
        //     this.menu.style.display = "inline"
        //     this.menu.classList.add('fadeIn')
        // }, 1500)
        
        this.trigger('start')
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}