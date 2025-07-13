import CContainer from '../core/CContainer.ts';

export default class CBunnyContainer extends CContainer {
  
  protected onResize() {
    super.onResize();
    
    this.centerContainer();
  }
  
}