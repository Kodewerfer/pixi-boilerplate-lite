/**
 * Pixi Application
 */

import * as PIXI from 'pixi.js';
import EventEmitter from 'eventemitter3';
import SSprite from './SSprite.ts';
import CContainer from './CContainer.ts';

export default class PApp extends EventEmitter {
  
  
  public static readonly EVENT_INITIALIZE_SUCCESS: string = 'INITIALIZE_SUCCESS';
  public static readonly EVENT_INITIALIZE_FAILED: string = 'INITIALIZE_FAILED';
  public static readonly EVENT_RESIZE: string = 'RESIZE';
  
  
  private readonly _width: number;
  private readonly _height: number;
  private readonly _Instance: PIXI.Application; //stores the instance for the running app
  private readonly _RenderTargetID: string; //the HTML ID for the scene root
  
  private _Screen: PIXI.Rectangle = new PIXI.Rectangle();// for ease of use
  
  
  get Screen() {
    return this._Screen;
  }
  
  get RenderTargetID() {
    return this._RenderTargetID;
  }
  
  get Instance(): PIXI.Application {
    return this._Instance;
  }
  
  
  constructor({ screenWidth, screenHeight, renderTargetID }: {
    screenWidth: number,
    screenHeight: number,
    renderTargetID: string
  }) {
    
    super();
    
    this._width = screenWidth;
    this._height = screenHeight;
    this._RenderTargetID = renderTargetID;
    
    this._Instance = new PIXI.Application();
    
  }
  
  
  public async Init({ bgColor = '#e57373' }: { bgColor: string }) {
    try {
      await this.Instance.init({
        width: this._width,
        height: this._height,
        backgroundColor: bgColor,
        resizeTo: window,
        textureGCActive: true,
        textureGCMaxIdle: 3600,
        textureGCCheckCountMax: 1200
      });
      
      const CanvasContainer = document.getElementById(this._RenderTargetID);
      const AppCanvas = this.Instance.canvas;
      
      if (!CanvasContainer) {
        console.error('Render target not found. Check container ID.');
        this.emit(PApp.EVENT_INITIALIZE_FAILED, this);
        return;
      }
      
      (CanvasContainer as HTMLElement).appendChild(AppCanvas);
      
      this._Screen = this.Instance.screen;
      
      this.attachToWindowResize();
      
      this.emit(PApp.EVENT_INITIALIZE_SUCCESS, this);
      
    } catch (e) {
      console.error('PApp:', e);
      
      this.emit(PApp.EVENT_INITIALIZE_FAILED, this);
      
    }
  }
  
  public resize() {
    this.emit(PApp.EVENT_RESIZE, this); // effectively triggers Containers/Sprites resizing
  };
  
  //make it so that when the window resizes, the app resize alongside it.
  private attachToWindowResize() {
    const delayedResize = () => {
      setTimeout(this.resize.bind(this), 200);
    };
    
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('resize', delayedResize);
    window.addEventListener('orientationchange', this.resize.bind(this));
    window.addEventListener('orientationchange', delayedResize);
  }
  
  public addToStage(target: CContainer): any
  public addToStage(target: SSprite): any
  public addToStage(target: PIXI.Sprite): any
  public addToStage(target: PIXI.Container): any {
    
    this.Instance.stage.addChild(target);
    
    if (target instanceof SSprite || target instanceof CContainer)
      target.onAddedToStage(this);
    
    this.resize();
  };
  
  public removeFromStage(target: CContainer): any
  public removeFromStage(target: SSprite): any
  public removeFromStage(target: PIXI.Sprite): any
  public removeFromStage(target: PIXI.Container): any {
    
    this.Instance.stage.removeChild(target);
    
    if (target instanceof SSprite || target instanceof CContainer)
      target.onRemovedFromStage(this);
    
    this.resize();
  };
  
}

