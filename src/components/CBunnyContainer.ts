import CContainer, { TCContainerConstructParams } from '../core/CContainer.ts';

export default class CBunnyContainer extends CContainer {
  
  constructor(params: TCContainerConstructParams) {
    super(params);
    this.setUpLayout();
  }
  
  private setUpLayout() {
    this.layout = {
      width: '100%',
      height: 'auto',
      flexShrink: 0, //shrink can end up squeezing elements inside the container
      flexWrap: 'nowrap',
      alignSelf: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      objectFit: 'contain',
      objectPosition: 'center',
      transformOrigin: 'center',
      overflow: 'hidden'
    };
  }
  
  protected onResize() {
    super.onResize();
  }
  
}