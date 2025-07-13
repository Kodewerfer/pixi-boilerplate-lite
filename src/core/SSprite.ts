/**
 * Extended PIXI.Sprite
 */

import * as PIXI from 'pixi.js';
import PApp from './PApp.ts';

export type SSpriteOptions = { texture?: PIXI.Texture, baseResolution?: { w: number, h: number } }

export default class SSprite extends PIXI.Sprite {
  
  
  protected GameApp: PApp | null = null;
  
  
  // what resolution is considered "base", affects scaling. if not set from constructor, it will use the resolution when the sprite is first loaded onto the stage.
  private _baseScreenWidth: number | undefined;
  private _baseScreenHeight: number | undefined;
  
  
  constructor({ texture, baseResolution }: SSpriteOptions) {
    super(texture);
    
    if (baseResolution && baseResolution.w && baseResolution.h) {
      this._baseScreenWidth = baseResolution.w;
      this._baseScreenHeight = baseResolution.h;
    }
    
  }
  
  
  public isAttached(): boolean {
    return this.parent !== null;
  }
  
  public isOnStage(): boolean {
    return this.parent !== null && this.GameApp !== null;
  }
  
  public isTextureValid(): boolean {
    
    if (!this.texture)
      return false;
    
    return !(this.texture.width === 0 || this.texture.height === 0);
    
  }
  
  public onAddedToStage(GameApp: PApp) {
    this.GameApp = GameApp;
    
    GameApp.Instance.ticker.add(this.onTick.bind(this));
    GameApp.addListener(PApp.EVENT_RESIZE, this.onResize.bind(this));
    
    if (this._baseScreenWidth === undefined)
      this._baseScreenWidth = GameApp.Screen.width;
    if (this._baseScreenHeight === undefined)
      this._baseScreenHeight = GameApp.Screen.height;
    
    // Attach to App Resize
    this.GameApp.addListener(PApp.EVENT_RESIZE, this.onResize.bind(this));
  }
  
  public onRemovedFromStage(GameApp: PApp) {
    GameApp.Instance.ticker.remove(this.onTick.bind(this));
    GameApp.removeListener(PApp.EVENT_RESIZE, this.onResize.bind(this));
  }
  
  
  protected onResize(): void {
    
    if (!this.isOnStage() || !this.isTextureValid()) {
      return;
    }
    // the rest are up to the subclasses
  }
  
  protected reCenterSprite() {
    
    if (!this.GameApp) return;
    
    this.x = this.GameApp.Screen.width / 2;
    this.y = this.GameApp.Screen.height / 2;
  }
  
  protected reScaleSprite() {
    
    if (!this.GameApp || !this._baseScreenWidth || !this._baseScreenHeight) return;
    
    // Calculate the new width and height while maintaining the aspect ratio
    const scaleFactorX = this.GameApp.Screen.width / this._baseScreenWidth;
    const scaleFactorY = this.GameApp.Screen.height / this._baseScreenHeight;
    
    const finalScalingFactor = Math.min(scaleFactorX, scaleFactorY);
    
    
    this.width = this.texture.width * finalScalingFactor;
    this.height = this.texture.height * finalScalingFactor;
  }
  
  // @ts-ignore to be implemented in subclasses
  protected onTick(ticker: PIXI.Ticker): void {
  }
}
