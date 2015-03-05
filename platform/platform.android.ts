﻿/* tslint:disable:class-name */
import definition = require("platform");
import enums = require("ui/enums");
import application = require("application");

export module platformNames {
    export var android = "Android";
    export var ios = "iOS";
}

// This is a "static" class and it is used like a name-space.
// It is not meant to be initialized - thus it is not capitalized
export class device implements definition.device {
    private static MIN_TABLET_PIXELS = 600;
    private static _model: string;
    private static _osVersion: string;
    private static _sdkVersion: string;
    private static _deviceType: string;
    private static _uuid: string;

    static get os(): string {
        return platformNames.android;
    }

    static get osVersion(): string {
        if (!device._osVersion) {
            device._osVersion = android.os.Build.VERSION.RELEASE;
        }

        return device._osVersion;
    }

    static get model(): string {
        if (!device._model) {
            device._model = android.os.Build.MODEL;
        }

        return device._model;
    }

    static get sdkVersion(): string {
        if (!device._sdkVersion) {
            device._sdkVersion = android.os.Build.VERSION.SDK;
        }

        return device._sdkVersion;
    }

    static get deviceType(): string {
        if (!device._deviceType) {
            var dips = Math.min(screen.mainScreen.widthPixels, screen.mainScreen.heightPixels) / screen.mainScreen.scale;

            // If the device has more than 600 dips it is considered to be a tablet.
            if (dips >= device.MIN_TABLET_PIXELS) {
                device._deviceType = enums.DeviceType.Tablet;
            }
            else {
                device._deviceType = enums.DeviceType.Phone;
            }
        }

        return device._deviceType;
    }

    static get uuid(): string {
        if (!device._uuid) {
            device._uuid = android.provider.Settings.Secure.getString(
              application.android.context.getContentResolver(),
              android.provider.Settings.Secure.ANDROID_ID
            );
        }
        
        return device._uuid;
    }
}

var mainScreenInfo: definition.ScreenMetrics;

// This is a "static" class and it is used like a name-space.
// It is not meant to be initialized - thus it is not capitalized
export class screen implements definition.screen {
    static get mainScreen(): definition.ScreenMetrics {
        if (!mainScreenInfo) {
            var metrics = application.android.context.getResources().getDisplayMetrics();
            mainScreenInfo = {
                widthPixels: metrics.widthPixels,
                heightPixels: metrics.heightPixels,
                scale: metrics.density
            }
        }
        return mainScreenInfo;
    }
}
