"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var vg_dash_1 = require("./vg-dash/vg-dash");
var vg_hls_1 = require("./vg-hls/vg-hls");
var VgStreamingModule = (function () {
    function VgStreamingModule() {
    }
    VgStreamingModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [
                        vg_dash_1.VgDASH, vg_hls_1.VgHLS
                    ],
                    exports: [
                        vg_dash_1.VgDASH, vg_hls_1.VgHLS
                    ]
                },] },
    ];
    /** @nocollapse */
    VgStreamingModule.ctorParameters = function () { return []; };
    return VgStreamingModule;
}());
exports.VgStreamingModule = VgStreamingModule;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyZWFtaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThDO0FBQzlDLDBDQUErQztBQUMvQyw2Q0FBMkM7QUFDM0MsMENBQXdDOzs7OztnQkFRdkMsZUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFFLHFCQUFZLENBQUU7b0JBQ3pCLFlBQVksRUFBRTt3QkFDVixnQkFBTSxFQUFFLGNBQUs7cUJBQ2hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxnQkFBTSxFQUFFLGNBQUs7cUJBQ2hCO2lCQUNKOzs7OzRCQW5CRDs7QUFvQmEsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFZnREFTSCB9IGZyb20gXCIuL3ZnLWRhc2gvdmctZGFzaFwiO1xuaW1wb3J0IHsgVmdITFMgfSBmcm9tIFwiLi92Zy1obHMvdmctaGxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURSTUxpY2Vuc2VTZXJ2ZXIge1xuICAgIFtpbmRleDogc3RyaW5nXToge1xuICAgICAgICBzZXJ2ZXJVUkw6IHN0cmluZztcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVmdEQVNILCBWZ0hMU1xuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBWZ0RBU0gsIFZnSExTXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ1N0cmVhbWluZ01vZHVsZSB7fVxuIl19