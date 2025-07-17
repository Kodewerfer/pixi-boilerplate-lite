import * as PIXI from 'pixi.js';
import PApp from './core/PApp';

import SBunnySprite from './components/SBunnySprite.ts';
import CBunnyContainer from './components/CBunnyContainer.ts';
import BunnyGameMode from './components/PBunnyGameMode.ts';
import PBunnyLevel from './components/PBunnyLevel.ts';

const RENDER_TARGET_ID = 'pixi-render-target';
const APP_BG_COLOR = '#e57373';

// ---assets
const BundleManifest = {
  bundles: [
    {
      name: 'bunny-assets',
      assets: [{ alias: 'bunbun', src: '/assets/bunny.png' }],
    },
  ],
};

async function OnInitComplete(GameApp: PApp) {
  console.info('App Initialized');

  await PIXI.Assets.init({ manifest: BundleManifest });

  const bunnyGameMode = new BunnyGameMode();
  const bunnyLevel = new PBunnyLevel({ levelID: 'Level_Bunny' });

  GameApp.CurrentGameMode = bunnyGameMode;
  GameApp.CurrentLevel = bunnyLevel;

  PIXI.Assets.loadBundle('bunny-assets', (progress) => {
    console.log(`Loading assets: ${progress * 100}%`);
  })
    .then((loadedResources) => {
      const bunnyContainer = new CBunnyContainer({ scaleWithBaseRes: true });
      const bunnySprite = new SBunnySprite({ texture: loadedResources['bunbun'] });
      bunnySprite.layout = true;

      bunnyContainer.addChild(bunnySprite);

      bunnyLevel.Container.addChild(bunnyContainer);
    })
    .catch((err) => {
      console.log('App assets fetching error: ', err);
    });
}

function OnInitFailed() {
  console.error('App Failed to initialize.');
}

(async () => {
  try {
    const GameApp = new PApp({
      baseScreenHeight: 1080,
      baseScreenWidth: 1920,
      renderTargetID: RENDER_TARGET_ID,
    });

    GameApp.addListener(PApp.EVENT_INITIALIZE_SUCCESS, OnInitComplete);
    GameApp.addListener(PApp.EVENT_INITIALIZE_FAILED, OnInitFailed);

    await GameApp.Init({
      bgColor: APP_BG_COLOR,
    });
  } catch (e) {
    console.error('There is an error during initialization:', e);
  }
})();
