/**
 * Extends the functionality of PIXI.Container
 */

import * as PIXI from 'pixi.js';
import PApp from './PApp.ts';
import SSprite from './SSprite.ts';

export default class CContainer extends PIXI.Container {
  
  
  protected GameApp: PApp | null = null;
  
  
  constructor(options?: PIXI.ContainerOptions<PIXI.ContainerChild>) {
    super(options);
  }
  
  
  public isAttached(): boolean {
    return this.parent !== null;
  }
  
  public isOnStage(): boolean {
    return this.parent !== null && this.GameApp !== null;
  }
  
  public onAddedToStage(GameApp: PApp) {
    
    this.GameApp = GameApp;
    
    GameApp.Instance.ticker.add(this.onTick.bind(this));
    GameApp.addListener(PApp.EVENT_RESIZE, this.onResize.bind(this));
    
    this.children.map(children => {
      if (children instanceof CContainer || children instanceof SSprite)
        children.onAddedToStage(GameApp);
    });
    
  }
  
  public onRemovedFromStage(GameApp: PApp) {
    
    GameApp.Instance.ticker.remove(this.onTick.bind(this));
    GameApp.removeListener(PApp.EVENT_RESIZE, this.onResize.bind(this));
    
    this.children.map(children => {
      if (children instanceof CContainer || children instanceof SSprite)
        children.onRemovedFromStage(GameApp);
    });
    
  }
  
  
  protected onResize(): void {
    // the rest are up to the subclasses
    if (!this.isOnStage()) return;
  }
  
  protected centerContainer() {
    
    if (!this.GameApp) return;
    
    this.x = this.GameApp.Screen.width / 2;
    this.y = this.GameApp.Screen.height / 2;
  }
  
  // @ts-ignore to be implemented in subclasses
  protected onTick(ticker: PIXI.Ticker): void {
    //overridden by subclass
  }
}