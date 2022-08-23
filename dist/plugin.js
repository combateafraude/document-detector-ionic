'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class DocumentDetectorStep {
    constructor(documentType, android, ios) {
        if (android != null) {
            this.android = android;
        }
        if (ios != null) {
            this.ios = ios;
        }
        this.documentType = documentType;
    }
}

class Capture {
    constructor(imagePath, imageUrl, label, quality, lensFacing) {
        this.imagePath = imagePath;
        this.imageUrl = imageUrl;
        this.label = label;
        this.quality = quality;
        this.lensFacing = lensFacing;
    }
}

class DocumentDetectorResult {
    constructor(result) {
        this.result = result;
    }
}

class DocumentDetectorSuccess extends DocumentDetectorResult {
    constructor(captures, type, trackingId) {
        super("SUCCESS");
        this.captures = captures;
        this.type = type;
        this.trackingId = trackingId;
    }
}

class DocumentDetectorFailure extends DocumentDetectorResult {
    constructor(message, type) {
        super("FAILURE");
        this.message = message;
        this.type = type;
    }
}

class DocumentDetectorClosed extends DocumentDetectorResult {
    constructor() {
        super("CLOSED");
    }
}

/*! Capacitor: https://capacitorjs.com/ - MIT License */
const createCapacitorPlatforms = (win) => {
    const defaultPlatformMap = new Map();
    defaultPlatformMap.set('web', { name: 'web' });
    const capPlatforms = win.CapacitorPlatforms || {
        currentPlatform: { name: 'web' },
        platforms: defaultPlatformMap,
    };
    const addPlatform = (name, platform) => {
        capPlatforms.platforms.set(name, platform);
    };
    const setPlatform = (name) => {
        if (capPlatforms.platforms.has(name)) {
            capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
        }
    };
    capPlatforms.addPlatform = addPlatform;
    capPlatforms.setPlatform = setPlatform;
    return capPlatforms;
};
const initPlatforms = (win) => (win.CapacitorPlatforms = createCapacitorPlatforms(win));
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
const CapacitorPlatforms = /*#__PURE__*/ initPlatforms((typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : {}));
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
CapacitorPlatforms.addPlatform;
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
CapacitorPlatforms.setPlatform;

var ExceptionCode;
(function (ExceptionCode) {
    /**
     * API is not implemented.
     *
     * This usually means the API can't be used because it is not implemented for
     * the current platform.
     */
    ExceptionCode["Unimplemented"] = "UNIMPLEMENTED";
    /**
     * API is not available.
     *
     * This means the API can't be used right now because:
     *   - it is currently missing a prerequisite, such as network connectivity
     *   - it requires a particular platform or browser version
     */
    ExceptionCode["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
class CapacitorException extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
const getPlatformId = (win) => {
    var _a, _b;
    if (win === null || win === void 0 ? void 0 : win.androidBridge) {
        return 'android';
    }
    else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
        return 'ios';
    }
    else {
        return 'web';
    }
};

const createCapacitor = (win) => {
    var _a, _b, _c, _d, _e;
    const capCustomPlatform = win.CapacitorCustomPlatform || null;
    const cap = win.Capacitor || {};
    const Plugins = (cap.Plugins = cap.Plugins || {});
    /**
     * @deprecated Use `capCustomPlatform` instead, default functions like registerPlugin will function with the new object.
     */
    const capPlatforms = win.CapacitorPlatforms;
    const defaultGetPlatform = () => {
        return capCustomPlatform !== null
            ? capCustomPlatform.name
            : getPlatformId(win);
    };
    const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;
    const defaultIsNativePlatform = () => getPlatform() !== 'web';
    const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;
    const defaultIsPluginAvailable = (pluginName) => {
        const plugin = registeredPlugins.get(pluginName);
        if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
            // JS implementation available for the current platform.
            return true;
        }
        if (getPluginHeader(pluginName)) {
            // Native implementation available.
            return true;
        }
        return false;
    };
    const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) ||
        defaultIsPluginAvailable;
    const defaultGetPluginHeader = (pluginName) => { var _a; return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find(h => h.name === pluginName); };
    const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;
    const handleError = (err) => win.console.error(err);
    const pluginMethodNoop = (_target, prop, pluginName) => {
        return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
    };
    const registeredPlugins = new Map();
    const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
        const registeredPlugin = registeredPlugins.get(pluginName);
        if (registeredPlugin) {
            console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
            return registeredPlugin.proxy;
        }
        const platform = getPlatform();
        const pluginHeader = getPluginHeader(pluginName);
        let jsImplementation;
        const loadPluginImplementation = async () => {
            if (!jsImplementation && platform in jsImplementations) {
                jsImplementation =
                    typeof jsImplementations[platform] === 'function'
                        ? (jsImplementation = await jsImplementations[platform]())
                        : (jsImplementation = jsImplementations[platform]);
            }
            else if (capCustomPlatform !== null &&
                !jsImplementation &&
                'web' in jsImplementations) {
                jsImplementation =
                    typeof jsImplementations['web'] === 'function'
                        ? (jsImplementation = await jsImplementations['web']())
                        : (jsImplementation = jsImplementations['web']);
            }
            return jsImplementation;
        };
        const createPluginMethod = (impl, prop) => {
            var _a, _b;
            if (pluginHeader) {
                const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find(m => prop === m.name);
                if (methodHeader) {
                    if (methodHeader.rtype === 'promise') {
                        return (options) => cap.nativePromise(pluginName, prop.toString(), options);
                    }
                    else {
                        return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
                    }
                }
                else if (impl) {
                    return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
                }
            }
            else if (impl) {
                return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
            }
            else {
                throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
            }
        };
        const createPluginMethodWrapper = (prop) => {
            let remove;
            const wrapper = (...args) => {
                const p = loadPluginImplementation().then(impl => {
                    const fn = createPluginMethod(impl, prop);
                    if (fn) {
                        const p = fn(...args);
                        remove = p === null || p === void 0 ? void 0 : p.remove;
                        return p;
                    }
                    else {
                        throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
                    }
                });
                if (prop === 'addListener') {
                    p.remove = async () => remove();
                }
                return p;
            };
            // Some flair ✨
            wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
            Object.defineProperty(wrapper, 'name', {
                value: prop,
                writable: false,
                configurable: false,
            });
            return wrapper;
        };
        const addListener = createPluginMethodWrapper('addListener');
        const removeListener = createPluginMethodWrapper('removeListener');
        const addListenerNative = (eventName, callback) => {
            const call = addListener({ eventName }, callback);
            const remove = async () => {
                const callbackId = await call;
                removeListener({
                    eventName,
                    callbackId,
                }, callback);
            };
            const p = new Promise(resolve => call.then(() => resolve({ remove })));
            p.remove = async () => {
                console.warn(`Using addListener() without 'await' is deprecated.`);
                await remove();
            };
            return p;
        };
        const proxy = new Proxy({}, {
            get(_, prop) {
                switch (prop) {
                    // https://github.com/facebook/react/issues/20030
                    case '$$typeof':
                        return undefined;
                    case 'toJSON':
                        return () => ({});
                    case 'addListener':
                        return pluginHeader ? addListenerNative : addListener;
                    case 'removeListener':
                        return removeListener;
                    default:
                        return createPluginMethodWrapper(prop);
                }
            },
        });
        Plugins[pluginName] = proxy;
        registeredPlugins.set(pluginName, {
            name: pluginName,
            proxy,
            platforms: new Set([
                ...Object.keys(jsImplementations),
                ...(pluginHeader ? [platform] : []),
            ]),
        });
        return proxy;
    };
    const registerPlugin = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin;
    // Add in convertFileSrc for web, it will already be available in native context
    if (!cap.convertFileSrc) {
        cap.convertFileSrc = filePath => filePath;
    }
    cap.getPlatform = getPlatform;
    cap.handleError = handleError;
    cap.isNativePlatform = isNativePlatform;
    cap.isPluginAvailable = isPluginAvailable;
    cap.pluginMethodNoop = pluginMethodNoop;
    cap.registerPlugin = registerPlugin;
    cap.Exception = CapacitorException;
    cap.DEBUG = !!cap.DEBUG;
    cap.isLoggingEnabled = !!cap.isLoggingEnabled;
    // Deprecated props
    cap.platform = cap.getPlatform();
    cap.isNative = cap.isNativePlatform();
    return cap;
};
const initCapacitorGlobal = (win) => (win.Capacitor = createCapacitor(win));

const Capacitor = /*#__PURE__*/ initCapacitorGlobal(typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : {});
Capacitor.registerPlugin;
/**
 * @deprecated Provided for backwards compatibility for Capacitor v2 plugins.
 * Capacitor v3 plugins should import the plugin directly. This "Plugins"
 * export is deprecated in v3, and will be removed in v4.
 */
const Plugins = Capacitor.Plugins;

exports.DocumentType = void 0;
(function (DocumentType) {
    DocumentType["RG_FRONT"] = "RG_FRONT";
    DocumentType["RG_BACK"] = "RG_BACK";
    DocumentType["RG_FULL"] = "RG_FULL";
    DocumentType["CNH_FRONT"] = "CNH_FRONT";
    DocumentType["CNH_BACK"] = "CNH_BACK";
    DocumentType["CNH_FULL"] = "CNH_FULL";
    DocumentType["CRLV"] = "CRLV";
    DocumentType["RNE_FRONT"] = "RNE_FRONT";
    DocumentType["RNE_BACK"] = "RNE_BACK";
    DocumentType["PASSPORT"] = "PASSPORT";
    DocumentType["CTPS_FRONT"] = "CTPS_FRONT";
    DocumentType["CTPS_BACK"] = "CTPS_BACK";
    DocumentType["ANY"] = "ANY";
    DocumentType["OTHERS"] = "OTHERS";
})(exports.DocumentType || (exports.DocumentType = {}));

class ShowPreview {
    constructor(show, title, subTitle, confirmLabel, retryLabel) {
        this.title = title;
        this.subTitle = subTitle;
        this.confirmLabel = confirmLabel;
        this.retryLabel = retryLabel;
        this.show = show;
    }
}

class DocumentDetectorAndroidSettings {
    constructor(options) {
        this.customization = options.customization;
        this.sensorSettings = options.sensorSettings;
        this.captureStages = options.captureStages;
        this.enableSwitchCameraButton = options.enableSwitchCameraButton;
        this.compressQuality = options.compressQuality;
        this.resolution = options.resolution;
        this.enableGoogleServices = options.enableGoogleServices;
        this.useRoot = options.useRoot;
        this.useEmulator = options.useEmulator;
        this.useDeveloperMode = options.useDeveloperMode;
        this.useAdb = options.useAdb;
        this.useDebug = options.useDebug;
    }
}

class DocumentDetectorStepCustomizationAndroid {
    constructor(stepLabelStringResName, illustrationDrawableResName, audioRawResName) {
        this.stepLabelStringResName = stepLabelStringResName;
        this.illustrationDrawableResName = illustrationDrawableResName;
        this.audioRawResName = audioRawResName;
    }
}
/*Map asMap(){
  Map<String, dynamic> map = new Map();

  map["stepLabelStringResName"] = stepLabelStringResName;
  map["illustrationDrawableResName"] = illustrationDrawableResName;
  map["audioRawResName"] = audioRawResName;

  return map;
}*/

class DocumentDetectorIosSettings {
    constructor(detectionThreshold, verifyQuality, qualityThreshold, customization, sensorSettings, manualCaptureEnable, manualCaptureTime) {
        this.detectionThreshold = detectionThreshold;
        this.verifyQuality = verifyQuality;
        this.qualityThreshold = qualityThreshold;
        this.customization = customization;
        this.sensorSettings = sensorSettings;
        this.manualCaptureEnable = manualCaptureEnable;
        this.manualCaptureTime = manualCaptureTime;
    }
}

class DocumentDetectorCustomizationAndroid {
    constructor(maskType, styleResIdName, layoutResIdName, greenMaskResIdName, redMaskResIdName, whiteMaskResIdName) {
        this.styleResIdName = styleResIdName;
        this.layoutResIdName = layoutResIdName;
        this.greenMaskResIdName = greenMaskResIdName;
        this.redMaskResIdName = redMaskResIdName;
        this.whiteMaskResIdName = whiteMaskResIdName;
        this.maskType = maskType;
    }
}

const { DocumentDetectorPlugin } = Plugins;
class DocumentDetector {
    constructor() { }
    set setMobileToken(mobileToken) {
        this.mobileToken = mobileToken;
    }
    set setPeopleId(peopleId) {
        this.peopleId = peopleId;
    }
    set setUseAnalytics(useAnalytics) {
        this.useAnalytics = useAnalytics;
    }
    set setPopup(popup) {
        this.popup = popup;
    }
    set setSound(sound) {
        this.sound = sound;
    }
    set setRequestTimeout(requestTimeout) {
        this.requestTimeout = requestTimeout;
    }
    set setShowDelay(showDelay) {
        this.showDelay = showDelay;
    }
    set setDelay(delay) {
        this.delay = delay;
    }
    set setAutoDetection(autoDetection) {
        this.autoDetection = autoDetection;
    }
    set setDocumentDetectorSteps(documentDetectorSteps) {
        this.documentDetectorSteps = documentDetectorSteps;
    }
    setCurrentStepDoneDelay(showDelay, delay) {
        this.showDelay = showDelay;
        this.delay = delay;
    }
    setUploadSettings(settings) {
        this.uploadSettings = settings;
    }
    setGetImageUrlExpireTime(expireTime) {
        this.expireTime = expireTime;
    }
    set setShowPreview(showPreview) {
        this.showPreview = showPreview;
    }
    set setAndroidSettings(androidSettings) {
        this.androidSettings = androidSettings;
    }
    set setIosSettings(iosSettings) {
        this.iosSettings = iosSettings;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            var builder = JSON.stringify(this);
            var result = (yield DocumentDetectorPlugin.start({ builder })).results;
            if (result.success == null) {
                return new DocumentDetectorClosed();
            }
            else if (result.success) {
                var captures = new Array();
                result.captures.forEach((capture) => {
                    captures.push(new Capture(capture.imagePath, capture.imageUrl, capture.label, capture.quality, capture.lensFacing));
                });
                return new DocumentDetectorSuccess(captures, result.type, result.trackingId);
            }
            else {
                return new DocumentDetectorFailure(result.message, result.type);
            }
        });
    }
}

exports.Capture = Capture;
exports.DocumentDetector = DocumentDetector;
exports.DocumentDetectorAndroidSettings = DocumentDetectorAndroidSettings;
exports.DocumentDetectorCustomizationAndroid = DocumentDetectorCustomizationAndroid;
exports.DocumentDetectorIosSettings = DocumentDetectorIosSettings;
exports.DocumentDetectorStep = DocumentDetectorStep;
exports.DocumentDetectorStepCustomizationAndroid = DocumentDetectorStepCustomizationAndroid;
exports.ShowPreview = ShowPreview;
//# sourceMappingURL=plugin.js.map
