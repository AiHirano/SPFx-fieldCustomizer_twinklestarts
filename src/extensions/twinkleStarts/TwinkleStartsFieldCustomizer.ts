import { Log } from '@microsoft/sp-core-library';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';
import * as strings from 'TwinkleStartsFieldCustomizerStrings';

//import * as strings from 'TwinkleStartsFieldCustomizerStrings';
import styles from './TwinkleStartsFieldCustomizer.module.scss';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITwinkleStartsFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'TwinkleStartsFieldCustomizer';

export default class TwinkleStartsFieldCustomizer
  extends BaseFieldCustomizer<ITwinkleStartsFieldCustomizerProperties> {

  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated TwinkleStartsFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "TwinkleStartsFieldCustomizer" and "${strings.Title}"`); 
    return Promise.resolve();
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.

   let stars_count:number =event.fieldValue; //フィールドの値を格納    
   //セルのHTMLを生成
   let stars:string=`<div>`;
    for (let index = 0; index < stars_count; index++) {     
      stars += `<span class=${styles.star}>⭐</span>`;    
    }
    stars+="</div>"; 

    const text: string = stars;//HTMLを代入
    event.domElement.innerHTML = text; //innerText ⇒ innerHTMLに変更
    event.domElement.classList.add(styles.twinkleStarts);
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
