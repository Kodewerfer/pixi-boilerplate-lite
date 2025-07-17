import * as PIXI from 'pixi.js';
import PApp from '../core/PApp.ts';
import SSprite, { TSSpriteConstructParams } from '../core/SSprite.ts';

export default class SBunnySprite extends SSprite {
  private _bStartRotation = false;

  constructor(options: TSSpriteConstructParams) {
    super(options);

    this.eventMode = 'static'; //interactivity
    this.cursor = 'pointer';
  }

  public onAddedToStage(GameApp: PApp) {
    super.onAddedToStage(GameApp);

    console.log('on stage');

    if (!this.GameApp) return;

    this.anchor.set(0.5);
    this.scale = 1.0;

    this.on('pointerdown', this.onPointerDown);
  }

  private onPointerDown() {
    if (!this.GameApp) return;

    // oiiaii
    this._bStartRotation = !this._bStartRotation;
  }

  protected onResize() {
    super.onResize();

    this.reScaleSprite();
  }

  protected onTick(ticker: PIXI.Ticker) {
    super.onTick(ticker);
    if (this._bStartRotation)
      // bunny!
      this.rotation += 0.1 * ticker.deltaTime;
  }
}
