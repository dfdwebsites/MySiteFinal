import * as THREE from 'three'
import Experience from './Experience.js'
import Dungeon from './Portal/Dungeon.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {enableScroll, disableScroll} from './scrollingFunctions'
gsap.registerPlugin(ScrollTrigger)
//helps with the focus on the input
ScrollTrigger.config({syncInterval: 999999999});


export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.onProjects = false
        this.preLoader = this.experience.preloader
        
        this.allbtns = document.querySelectorAll('.sideBtn')

        // this.height = this.experience.config.maxHeight
        // console.log(this.height)
        // disableScroll()
        this.resources.on('groupEnd', (_group) =>
        {
            this.setPortals()
        this.preLoader.on('start', ()=> 
        {  
            this.setScrolls()
            this.setKeyDowns()
            
        })
        })
    }

    setPortals()
    {
        this.dungeon = new Dungeon()
        gsap.to(".arrow", {y: 12, ease: "power1.inOut", repeat: -1, yoyo: true});
    }
    setScrolls()
    {
        

        const heroD = document.querySelector('.heroD')
        const heroF = document.querySelector('.heroF')
        const heroD2 = document.querySelector('.heroD2')
        const logo = document.querySelector('.logo')

        const navD = document.querySelector('.d1')
        const navF = document.querySelector('.f')
        const navD2 = document.querySelector('.d2')
        const logo2 = document.querySelector('.logo2')

        const distanceTopD = heroD.getBoundingClientRect().top
        const distanceTopF = heroF.getBoundingClientRect().top
        const distanceTopD2 = heroD2.getBoundingClientRect().top
        const distanceToplogo = logo.getBoundingClientRect().top + logo.height /3

        const distanceLeftD = heroD.getBoundingClientRect().left
        const distanceLeftF = heroF.getBoundingClientRect().left
        const distanceLeftD2 = heroD2.getBoundingClientRect().left
        const distanceLeftlogo = logo.getBoundingClientRect().left + logo.width/3

        


        navD.style.top = `${distanceTopD}px`
        navD.style.left = `${distanceLeftD}px`

        navF.style.top = `${distanceTopF}px`
        navF.style.left = `${distanceLeftF}px`

        navD2.style.top = `${distanceTopD2}px`
        navD2.style.left = `${distanceLeftD2}px`

        logo2.style.top = `${distanceToplogo}px`
        logo2.style.left = `${distanceLeftlogo}px `

        let smallScreen = this.sizes.mode === 'smallScreen'? true : false
        

        const allowScroll = () => {
            gsap.set(body, { overflowY: "auto" })
            this.setSideNav()
            this.setMenu()
            
           

        //     gsap.timeline({
        //     // yes, we can add it to an entire timeline!
        //     scrollTrigger: {
        //       trigger: ".landing",
        //       pin: true,   // pin the trigger element while active
        //       start: "top top", // when the top of the trigger hits the top of the viewport
        //       end: "+=500", // end after scrolling 500px beyond the start
        //       scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        //       snap: {
        //         snapTo: "labels", // snap to the closest label in the timeline
        //         duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        //         delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
        //         ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
        //       }
        //     }
        //   })
        
        /*********** 
        ** Landing **
        ************/
       
        gsap.timeline({
            scrollTrigger: {
                trigger: ".landing",
                start: "0px top",
                // pin: true,
                markers: true,
                // end: "+=" + window.innerHeight * 3,
                scrub: 0.5,
                onToggle: self => {
                    // console.log('landing'+self.isActive)
                  self.isActive? document.getElementById('home').classList.add('active') : document.getElementById('home').classList.remove('active')
                },
                onEnterBack: ()=> {
                    this.experience.camera.controls.target.set(-20., 0.7, .4)
                  
                },
                onUpdate: self=>
                {
                    document.getElementById('homeUnderLine').style.width = `${100 * self.progress}%`

                    if(self.isActive)
                    {
                        for(let btn of this.allbtns){ if (btn.classList.contains('active'))btn.classList.remove('active')}
                        if(self.progress>.66)
                        this.allbtns[2].classList.add('active')
                        else if (self.progress>0.33)
                        this.allbtns[1].classList.add('active')
                        else
                        this.allbtns[0].classList.add('active')
                    }
                    
                },
                // snap:true,
                // end:'+=3000px',
                // preventOverlaps: true,
                // fastScrollEnd: true
            }
        })
        .to('.hero', {duration:0.01, display:'none'}) 
        .to('.logo2', {duration:0.2, display:'block', transform: 'scale(1)', top:0, left:0 }) 
        .to('.d1', {duration:0.2, display:'block', transform: 'scale(1)', top: smallScreen? '22px': '26px', left: smallScreen?'64px' : '110px' }, '-=<')   
        .to('.f', {duration:0.2, display:'block', transform: 'scale(1)', top: smallScreen? '22px': '26px', left: smallScreen? '83px' :'135px' }, '-=<')   
        .to('.d2', {duration:0.2, display:'block', transform: 'scale(1)', top: smallScreen? '22px': '26px', left: smallScreen? '100px' :'160px' }, '-=<')   
        .to('.landingPage2', {duration:0.1, opacity:1, transform:'scale(1)'})  
        .to('.landingPage2', {duration:0.1, left:"-100%",}, '+=0.2') 
        .to('.landingPage3', {duration:0.1, opacity:1, transform:'scale(1)' },'-=0.1') 
        .to('.landingPage3', {duration:0.05, opacity:0}, '+=0.1' ) 
        .to(this.experience.camera.instance.position, {ease: "none",
        x: -6.8,
        y:2.4,
        z:0.6
        }, '-=<')

        .to(this.experience.camera.instance.position, {ease: "none", 
        x: smallScreen? -12.7 : -12.9,
        y:smallScreen? 1.0 : 0.9,
        z:0.6}, '-=.25')
        
        // .to(this.experience.camera.controls.target, { ease: "none", 
        // x: -14.6,
        // y:0.9,
        // z:2.9
        // })



        /*********** 
        ** Work **
        ************/
       
        gsap.timeline({
            scrollTrigger: {
                trigger: ".projects",
                start:  '-1px top',
                pin: true,
                onEnter:()=>
                {
                    this.dungeon.project1.layers.set(1)
                    this.dungeon.project2.layers.set(1)
                    this.dungeon.project3.layers.set(1)
                    
                },
                onEnterBack:()=>
                {
                    this.dungeon.project1.layers.set(1)
                    this.dungeon.project2.layers.set(1)
                    this.dungeon.project3.layers.set(1)
                    
                },
                onLeave:()=>
                {
                    this.dungeon.project1.layers.set(2)
                    this.dungeon.project2.layers.set(2)
                    this.dungeon.project3.layers.set(2)
                    
                },
                onLeaveBack:()=>
                {
                    this.dungeon.project1.layers.set(2)
                    this.dungeon.project2.layers.set(2)
                    this.dungeon.project3.layers.set(2)
                    
                },
                onToggle: self => {
                    // console.log("work, isActive:", self.isActive)
                    this.onProjects = self.isActive
                    self.isActive? document.getElementById('work').classList.add('active') : document.getElementById('work').classList.remove('active')
                    document.querySelector('.projectBtns').style.display = self.isActive? 'flex' : 'none'
                    document.querySelector('.projectTitle').style.display = self.isActive? 'block' : 'none'
                    document.querySelector('.projectInfo').style.display = self.isActive? 'block' : 'none'

                    if(self.isActive)
                    {
                        for(let btn of this.allbtns){ if (btn.classList.contains('active'))btn.classList.remove('active')}
                        this.allbtns[3].classList.add('active')
                    }
                },
                onUpdate: self => {
                    // console.log("work", self.progress)
                    document.getElementById('workUnderLine').style.width = `${100 * self.progress}%`
                },
                markers: true,
                // end: "+=2px", //+ window.innerHeight,
                // snap:true,
                pinSpacer:false,
                scrub: 0.1,
                // preventOverlaps: true,
                // fastScrollEnd: true
            }
        }) 
        
        /*********** 
        **Contact**
        ************/
    
    gsap.timeline({
        scrollTrigger: {
            trigger: ".contact",
            start: "0px top",
            // pin: true,
            
            onToggle: self => 
            {
            self.isActive? document.getElementById('contact').classList.add('active') : document.getElementById('contact').classList.remove('active')

            if(self.isActive)
            {
                for(let btn of this.allbtns){ if (btn.classList.contains('active'))btn.classList.remove('active')}
                this.allbtns[4].classList.add('active')
            }
            },
            onEnter: ()=>
            {     
                smallScreen? this.experience.camera.instance.position.set(-12.7,1.0, 0.6) : this.experience.camera.instance.position.set(-12.9, 0.9, 0.6)
                this.goingtoContact()
                // this.experience.camera.projectLoc = 3
                // this.experience.camera.transitions.workRight(0)
                // this.experience.camera.transitions.contact(2)
                // disableScroll()
                // await this.sleep(3000)
                // enableScroll()
            },
            // onLeave: ()=>
            // {
            //     document.querySelector(".contact").style.opacity = 1
            // },
            // onEnterBack: ()=> {
            //     document.querySelector(".contact").style.opacity = 0
            //     this.leavingContact()
            // },
            onUpdate: self => {
                // console.log("progress", self.progress)
                document.getElementById('contactUnderLine').style.width = `${100 * self.progress}%`
                if (self.progress > 0.50) 
                {
                    document.querySelector('.scroll-down').style.display = 'none'
                    document.querySelector(".contact").style.opacity = 1
                }
                else
                {
                    document.querySelector('.scroll-down').style.display = 'block'
                    document.querySelector(".contact").style.opacity = 0
                } 
                if (self.progress < 0.40 && self.direction === -1)
                {
                    // this.leavingContact()
                }
            },
            invalidateOnRefresh: true,
            onRefresh: ({progress, direction, isActive}) => {
                if(progress) 
                gsap.to(window , .1, {scrollTo: {y: "max"}})
                } ,
            // snap:true,
            markers: true,
            // end: "+=2000px",// + window.innerHeight * 2.5,
            scrub: 0.2,
            // preventOverlaps: true,
            // fastScrollEnd: true
        }
        
    })
    // contact
    // this.experience.camera.controls.target
    // .to(this.experience.camera.instance.position, { 
    //         x: -12.7,
    //         y:0.9,
    //         z:0.7})
    
    // .to(this.experience.camera.controls.target, { ease: "none",
    // x: -12.7,
    // y:0.9,
    // z:-13.4})
    //then going up to end of wall 
    .to(this.experience.camera.controls.target, { duration:1, ease: "none", 
    x: -12.6,
    y: 1.1,
    z:-9.1})
    .to(this.experience.camera.instance.position, { duration:1, ease: "none", 
    x: -12.7,
    y:1.1,
    z:-6.1}, '-=<') 
    .to(this.experience.camera.instance.position, { duration:1.7, ease: "none", 
    x: -12.7,
    y:1.1,
    z:-6.2})          
    }

   
    gsap.timeline({ onComplete: allowScroll})
    
    .set('.landing', {display:"flex"})
    .set('.nav', {display:"flex"})
    .from(".landing_text1", { xPercent: -100, opacity: 0, duration: 2 }, "<")
    .from(".landing_text2", { xPercent: 100, opacity: 0, duration: 2 }, "<+0.25")
    .from(".landing_text3", { xPercent: -100, opacity: 0, duration: 2 }, "<+0.25")
    .from('.navBtns', {yPercent:-200 , delay:1}, '<')
    .to(".sideBtns", { opacity: 1 }, "<+=0.5")
    .duration(3)
   
    }
    setMenu()
    {
        document.getElementById('home').addEventListener('click', ()=>
        {
                gsap.to(window , { duration:2, scrollTo:{y:0}})
    
        })
       
        document.getElementById('work').addEventListener('click', ()=>
        {
            
            gsap.to(window , {duration: 1.5, scrollTo: 3004})
        })
        document.getElementById('contact').addEventListener('click', ()=>
        {
           
            gsap.to(window ,{duration: 2 ,scrollTo: {y: "max"}})
     
        })
        document.querySelector(".ctaBtn").addEventListener("click", ()=>
        {
            gsap.to(window ,{duration: 2 ,scrollTo: {y: "max"}})
        })
    }
    setSideNav()
    {
        
        
        this.allbtns.forEach((btn,i)=>{
            btn.addEventListener('click', (e)=>
            {
                if(i===4)
                {
                    gsap.to(window , 1.5, {scrollTo: "max"})
                    for(let btn of this.allbtns){ if (btn.classList.contains('active'))btn.classList.remove('active')}
                    e.target.classList.add('active')

                }
                else
                gsap.to(window , 1.5, {scrollTo: {y: 1001 * i}})
                for(let btn of this.allbtns){ if (btn.classList.contains('active'))btn.classList.remove('active')}
                e.target.classList.add('active')
            })
        })
    }
    setKeyDowns()
    {
        document.addEventListener('keydown', (e)=>
        {
            if(e.key ==="ArrowLeft" && this.onProjects)
            {
                document.getElementById('projectLeft').click()
            }
            if(e.key ==="ArrowRight" && this.onProjects)
            {
                document.getElementById('projectRight').click()
            }
        })



    }
    goingtoContact = async ()=> 
    {  
        this.experience.camera.projectLoc = 3
        this.experience.camera.transitions.workRight(0)
        disableScroll()
        gsap.to(window ,  {duration: 1.5, scrollTo: {y: "max"}})
        await this.sleep(1000)
        enableScroll()
    }
    leavingContact = async ()=>
    {
        disableScroll()
        gsap.to(window , 1, {scrollTo:'#projects'})
        await this.sleep(1000)
        enableScroll()
    }
    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    resize()
    {
    }

    update()
    {
        if(this.dungeon)
            this.dungeon.update()
    }

    destroy()
    {
    }
}