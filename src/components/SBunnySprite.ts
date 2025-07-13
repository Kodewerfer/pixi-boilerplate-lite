import * as PIXI from 'pixi.js';
import PApp from '../core/PApp.ts';
import SSprite, { SSpriteOptions } from '../core/SSprite.ts';

export default class SBunnySprite extends SSprite {
  
  private readonly _filtersArray: PIXI.Filter[] = [];
  private _filterInUseIndex: number = 0;
  
  
  set filterInUseIndex(value: number) {
    this._filterInUseIndex = value;
  }
  
  get filterInUseIndex(): number {
    return this._filterInUseIndex;
  }
  
  
  constructor(options: SSpriteOptions) {
    super(options);
    
    this.eventMode = 'static'; //interactivity
    this.cursor = 'pointer';
    
    // filter plugin
    this._filtersArray = [
      new PIXI.BlurFilter({ strength: 0.0 }), // effectively "no filter", the default value.
      new PIXI.BlurFilter({ strength: 0.8 })
    ];
    
    this.filters = [this._filtersArray[this._filterInUseIndex]];
    
  }
  
  public onAddedToStage(GameApp: PApp) {
    super.onAddedToStage(GameApp);
    
    if (!this.GameApp) return;
    
    this.anchor.set(.5);
    this.scale = 1.0;
    
    // center of the screen
    // this.position.set(GameApp.Screen.width / 2, GameApp.Screen.height / 2);
    
    this.on('pointerdown', this.onPointerDown);
    
  }
  
  private onPointerDown() {
    console.log('Pointer Down');
    
    if (!this.GameApp) return;
    
    // bunny! Nooooooo😭
    this.GameApp.removeFromStage(this);
    
  }
  
  protected onResize() {
    super.onResize();
    
    this.reScaleSprite();
  }
  
  protected onTick(ticker: PIXI.Ticker) {
    super.onTick(ticker);
    
    // bunny! 😭
    this.rotation += 0.1 * ticker.deltaTime;
    
  }
  
}