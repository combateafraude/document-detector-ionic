import { SensorSettingsAndroid } from './sensor-settings';
import { DocumentDetectorCustomizationAndroid } from './customization';
export declare class AndroidSettings {
    private customization;
    private sensorSettings;
    private captureSettings;
    private showButtonTime;
    constructor(customization: DocumentDetectorCustomizationAndroid, sensorSettings: SensorSettingsAndroid);
}
