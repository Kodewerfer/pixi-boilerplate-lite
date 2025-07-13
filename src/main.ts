import * as PIXI from 'pixi.js';
import PApp from './core/PApp';
import { getWindowDimensions } from './libs/utils.ts';

import SBunnySprite from './components/SBunnySprite.ts';
import CBunnyContainer from './components/CBunnyContainer.ts';

const RENDER_TARGET_ID = 'pixi-render-target';
const APP_BG_COLOR = '#e57373';

function OnInitComplete(GameApp: PApp) {
  console.info('App Initialized');
  
  const BunnyImgURI = '/assets/bunny.png';
  
  let bunnySprite: SBunnySprite;
  
  PIXI.Assets.load([BunnyImgURI]).then(() => {
    
    const container = new CBunnyContainer();
    
    const tBunnyTexture = PIXI.Texture.from(BunnyImgURI);
    bunnySprite = new SBunnySprite({ texture: tBunnyTexture, baseResolution: { h: 600, w: 800 } });
    container.addChild(bunnySprite);
    
    GameApp.addToStage(container);
    
  }).catch((error) => {
    console.error(`Assets.load() failed. error = ${error}`);
  });
  
}

function OnInitFailed() {
  console.error('App Failed to initialize.');
}

(async () => {
  
  try {
    
    let { width, height } = getWindowDimensions();
    const GameApp = new PApp({
      screenWidth: width,
      screenHeight: height,
      renderTargetID: RENDER_TARGET_ID
    });
    
    GameApp.addListener(PApp.EVENT_INITIALIZE_SUCCESS, OnInitComplete);
    GameApp.addListener(PApp.EVENT_INITIALIZE_FAILED, OnInitFailed);
    
    await GameApp.Init({
      bgColor: APP_BG_COLOR
    });
    
  } catch (e) {
    console.error('There is an error during initialization:', e);
  }
})();
