import { LowerCasePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('cloud') cloud!: ElementRef
  @ViewChild('pipe') pipe!: ElementRef
  @ViewChild('mario') mario!: ElementRef
  public jumping: boolean = false
  public gameOver: boolean = false
  public jump = () => {
    this.jumping = true
    setTimeout(()=> {
      this.jumping = false
    }, 500)
    
  }

  public loop = setInterval(() => {
    const marioHeight = +window.getComputedStyle(this.mario.nativeElement).bottom.replace('px', '')
    const cloudsPosition = this.cloud.nativeElement.offsetLeft
    const pipePosition = this.pipe.nativeElement.offsetLeft
    if((pipePosition >=1 && pipePosition <= 80)  && marioHeight <= 63){
    this.pipe.nativeElement.style.animation = 'none'
    this.pipe.nativeElement.style.left = `${pipePosition}px`
    this.mario.nativeElement.style.animation = 'none'
    this.mario.nativeElement.style.bottom = `${marioHeight}px`
    this.mario.nativeElement.src = 'assets/game-over.png'
    this.cloud.nativeElement.style.animation = 'none'
    this.cloud.nativeElement.style.left = `${cloudsPosition}px`
    this.gameOver = true
    clearInterval(this.loop)
    }
    console.log(pipePosition)
  }, 10)
  constructor() {
    addEventListener('keydown', this.jump)
  }

}
