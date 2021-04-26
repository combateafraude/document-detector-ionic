import { ShowPreview } from './android/show-preview';
import { DocumentDetectorStep } from './document-detector-step';
import { DocumentDetectorIosSettings } from './ios/ios-settings'
import { DocumentDetectorAndroidSettings } from './android/android-settings';
import { Capture } from './result/capture';
import { DocumentDetectorResult } from './result/document-detector-result';
import { DocumentDetectorSuccess } from './result/document-detector-success';
import { DocumentDetectorFailure } from './result/document-detector-failure';
import { DocumentDetectorClosed } from './result/document-detector-closed';
import { Plugins } from '@capacitor/core';

export { DocumentDetectorStep };
export { DocumentType } from './document-type';

const { DocumentDetectorPlugin } = Plugins;

export class DocumentDetector {
  private mobileToken: string;
  private peopleId: string;
  private useAnalytics: boolean;
  private documentDetectorSteps: Array<DocumentDetectorStep>;
  private popup: boolean;
  private sound: boolean;
  private requestTimeout: number;
  private showPreview: ShowPreview;
  private androidSettings: DocumentDetectorAndroidSettings;
  private iosSettings: DocumentDetectorIosSettings;
  private showDelay: boolean;
  private delay: number;
  private autoDetection: boolean;

  constructor() {}

  public set setMobileToken(mobileToken: string) {
    this.mobileToken = mobileToken;
  }

  set setPeopleId(peopleId: string) {
    this.peopleId = peopleId;
  }

  set setUseAnalytics(useAnalytics: boolean) {
    this.useAnalytics = useAnalytics;
  }

  set setPopup(popup: boolean) {
    this.popup = popup;
  }

  set setSound(sound: boolean) {
    this.sound = sound;
  }

  set setRequestTimeout(requestTimeout: number) {
    this.requestTimeout = requestTimeout;
  }

  set setShowDelay(showDelay: boolean) {
    this.showDelay = showDelay;
  }

  set setDelay(delay: number) {
    this.delay = delay;
  }

  set setAutoDetection(autoDetection: boolean) {
    this.autoDetection = autoDetection;
  }

  set setDocumentDetectorSteps(
    documentDetectorSteps: Array<DocumentDetectorStep>,
  ) {
    this.documentDetectorSteps = documentDetectorSteps;
  }

  setCurrentStepDoneDelay(showDelay: boolean, delay: number): void {
    this.showDelay = showDelay;
    this.delay = delay;
  }

  set setShowPreview(showPreview: ShowPreview) {
    this.showPreview = showPreview;
  }

  set setAndroidSettings(androidSettings: DocumentDetectorAndroidSettings) {
    this.androidSettings = androidSettings;
  }

  set setIosSettings(iosSettings: DocumentDetectorIosSettings) {
    this.iosSettings = iosSettings;
  }

  async start() : Promise<DocumentDetectorResult>{
    var builder = JSON.stringify(this);

    var result = (await DocumentDetectorPlugin.start({ builder })).results;

    if(result.success == null){
      return new DocumentDetectorClosed();
    }else if(result.success){
      
      var captures = new Array<Capture>();

      result.captures.forEach((capture: { imagePath: string; imageUrl: string; label: string; quality: number; }) => {
        captures.push(new Capture(capture.imagePath, capture.imageUrl, capture.label, capture.quality))
      });
      
      return new DocumentDetectorSuccess(captures, result.type, result.trackingId)
    }else{
      return new DocumentDetectorFailure(result.message, result.type)
    }
  }
}
