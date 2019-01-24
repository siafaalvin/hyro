"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var vg_player_1 = require("./vg-player/vg-player");
var vg_media_1 = require("./vg-media/vg-media");
var vg_cue_points_1 = require("./vg-cue-points/vg-cue-points");
var vg_api_1 = require("./services/vg-api");
var vg_fullscreen_api_1 = require("./services/vg-fullscreen-api");
var vg_utils_1 = require("./services/vg-utils");
var vg_controls_hidden_1 = require("./services/vg-controls-hidden");
// components
__export(require("./vg-player/vg-player"));
__export(require("./vg-media/vg-media"));
__export(require("./vg-cue-points/vg-cue-points"));
// services
__export(require("./services/vg-api"));
__export(require("./services/vg-fullscreen-api"));
__export(require("./services/vg-utils"));
__export(require("./services/vg-controls-hidden"));
// types
__export(require("./events/vg-events"));
__export(require("./states/vg-states"));
/**
 * @internal
 */
function coreDirectives() {
    return [
        vg_player_1.VgPlayer, vg_media_1.VgMedia, vg_cue_points_1.VgCuePoints
    ];
}
exports.coreDirectives = coreDirectives;
function coreServices() {
    return [
        vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI, vg_utils_1.VgUtils, vg_controls_hidden_1.VgControlsHidden
    ];
}
exports.coreServices = coreServices;
var VgCoreModule = (function () {
    function VgCoreModule() {
    }
    VgCoreModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: coreDirectives(),
                    exports: coreDirectives(),
                    providers: coreServices()
                },] },
    ];
    /** @nocollapse */
    VgCoreModule.ctorParameters = function () { return []; };
    return VgCoreModule;
}());
exports.VgCoreModule = VgCoreModule;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzQ0FBbUQ7QUFDbkQsbURBQWlEO0FBQ2pELGdEQUE4QztBQUM5QywrREFBNEQ7QUFDNUQsNENBQTBDO0FBQzFDLGtFQUErRDtBQUMvRCxnREFBOEM7QUFDOUMsb0VBQWlFO0FBR2pFLGFBQWE7QUFDYiwyQ0FBc0M7QUFDdEMseUNBQW9DO0FBQ3BDLG1EQUE4QztBQUU5QyxXQUFXO0FBQ1gsdUNBQWtDO0FBQ2xDLGtEQUE2QztBQUM3Qyx5Q0FBb0M7QUFDcEMsbURBQThDO0FBRTlDLFFBQVE7QUFDUix3Q0FBbUM7QUFDbkMsd0NBQW1DOzs7O0FBS25DO0lBQ0ksTUFBTSxDQUFDO1FBQ0gsb0JBQVEsRUFBRSxrQkFBTyxFQUFFLDJCQUFXO0tBQ2pDLENBQUM7Q0FDTDtBQUpELHdDQUlDO0FBRUQ7SUFDSSxNQUFNLENBQUM7UUFDSCxjQUFLLEVBQUUsbUNBQWUsRUFBRSxrQkFBTyxFQUFFLHFDQUFnQjtLQUNwRCxDQUFDO0NBQ0w7QUFKRCxvQ0FJQzs7Ozs7Z0JBRUEsZUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRSxjQUFjLEVBQUU7b0JBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUU7b0JBQ3pCLFNBQVMsRUFBRSxZQUFZLEVBQUU7aUJBQzVCOzs7O3VCQTVDRDs7QUE2Q2Esb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZnUGxheWVyIH0gZnJvbSAnLi92Zy1wbGF5ZXIvdmctcGxheWVyJztcbmltcG9ydCB7IFZnTWVkaWEgfSBmcm9tICcuL3ZnLW1lZGlhL3ZnLW1lZGlhJztcbmltcG9ydCB7IFZnQ3VlUG9pbnRzIH0gZnJvbSAnLi92Zy1jdWUtcG9pbnRzL3ZnLWN1ZS1wb2ludHMnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBWZ0Z1bGxzY3JlZW5BUEkgfSBmcm9tICcuL3NlcnZpY2VzL3ZnLWZ1bGxzY3JlZW4tYXBpJztcbmltcG9ydCB7IFZnVXRpbHMgfSBmcm9tICcuL3NlcnZpY2VzL3ZnLXV0aWxzJztcbmltcG9ydCB7IFZnQ29udHJvbHNIaWRkZW4gfSBmcm9tICcuL3NlcnZpY2VzL3ZnLWNvbnRyb2xzLWhpZGRlbic7XG5cblxuLy8gY29tcG9uZW50c1xuZXhwb3J0ICogZnJvbSAnLi92Zy1wbGF5ZXIvdmctcGxheWVyJztcbmV4cG9ydCAqIGZyb20gJy4vdmctbWVkaWEvdmctbWVkaWEnO1xuZXhwb3J0ICogZnJvbSAnLi92Zy1jdWUtcG9pbnRzL3ZnLWN1ZS1wb2ludHMnO1xuXG4vLyBzZXJ2aWNlc1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy92Zy1hcGknO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy92Zy1mdWxsc2NyZWVuLWFwaSc7XG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL3ZnLXV0aWxzJztcbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvdmctY29udHJvbHMtaGlkZGVuJztcblxuLy8gdHlwZXNcbmV4cG9ydCAqIGZyb20gJy4vZXZlbnRzL3ZnLWV2ZW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3N0YXRlcy92Zy1zdGF0ZXMnO1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29yZURpcmVjdGl2ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgVmdQbGF5ZXIsIFZnTWVkaWEsIFZnQ3VlUG9pbnRzXG4gICAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcmVTZXJ2aWNlcygpOiBQcm92aWRlcltdIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBWZ0FQSSwgVmdGdWxsc2NyZWVuQVBJLCBWZ1V0aWxzLCBWZ0NvbnRyb2xzSGlkZGVuXG4gICAgXTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IGNvcmVEaXJlY3RpdmVzKCksXG4gICAgZXhwb3J0czogY29yZURpcmVjdGl2ZXMoKSxcbiAgICBwcm92aWRlcnM6IGNvcmVTZXJ2aWNlcygpXG59KVxuZXhwb3J0IGNsYXNzIFZnQ29yZU1vZHVsZSB7XG59XG4iXX0=