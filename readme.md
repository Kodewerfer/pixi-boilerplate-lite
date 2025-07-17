# PixiJs Boilerplate Lite

---
This project extends the base classes of Pixi.js to provide additional functionalities such as life cycle events or
callbacks such as `onRezie()`.

* **PApp** - wrap around PIXI.Application, emits various life cycle events.
    * **PGameMode** - should be set to the PApp via `.CurrentGameMode`, a conceptual layer similar to the AGameMode from
      Unreal, handles the main logic within a level. has its own `onTick()`
    * **PLevel** - should be set to the PApp via `.CurrentLevel`, a conceptual layer that provides a container for all
      elements in a "level," and primarily handles layout or bootstrapping logics.
        * **CContainer** - extends PIXI.Container, provides additional callbacks such as  `onRezie()` `onTick()`
          `onAddedToStage()` `onRemovedFromStage()` etc.
            * **SSprite** - extends PIXI.Sprite, provides callbacks similar to  **CContainer**

A _`BaseResWidth` and _`BaseResHeight` need to be set to the **PApp** so that the optional`.reScaleWithBaseRes()` can be
called on containers or sprites.
