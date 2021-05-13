import { PassiveFaceLivenessSuccess } from './result/passive-face-liveness-success';
import { PassiveFaceLivenessFailure } from './result/passive-face-liveness-failure';
import { PassiveFaceLivenessClosed } from './result/passive-face-liveness-closed';
import { IosSettings } from './ios/ios-settings';
import { ShowPreview } from './show-preview';
import { AndroidSettings } from "./android/android-settings";
export declare class PassiveFaceLiveness {
    private mobileToken;
    private peopleId;
    private useAnalytics;
    private sound;
    private requestTimeout;
    private showPreview;
    private androidSettings;
    private iosSettings;
    private showDelay;
    private delay;
    constructor();
    set setMobileToken(mobileToken: string);
    set setPeopleId(peopleId: string);
    set setUseAnalytics(useAnalytics: boolean);
    set setSound(sound: boolean);
    set setRequestTimeout(requestTimeout: number);
    set setShowDelay(showDelay: boolean);
    set setDelay(delay: number);
    setCurrentStepDoneDelay(showDelay: boolean, delay: number): void;
    set setShowPreview(showPreview: ShowPreview);
    set setAndroidSettings(androidSettings: AndroidSettings);
    setIosSettings(iosSettings: IosSettings): void;
    start(): Promise<PassiveFaceLivenessSuccess | PassiveFaceLivenessFailure | PassiveFaceLivenessClosed>;
}
