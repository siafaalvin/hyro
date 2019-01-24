"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var vg_player_1 = require("./vg-player");
var vg_api_1 = require("../services/vg-api");
var vg_fullscreen_api_1 = require("../services/vg-fullscreen-api");
describe('Videogular Player', function () {
    var player;
    var ref;
    var api;
    var fsAPI;
    var controlsHidden;
    beforeEach(function () {
        ref = {
            nativeElement: {
                querySelectorAll: function () {
                    return [{}];
                }
            }
        };
        controlsHidden = {
            isHidden: {
                subscribe: function () { }
            }
        };
        api = new vg_api_1.VgAPI();
        fsAPI = new vg_fullscreen_api_1.VgFullscreenAPI();
        player = new vg_player_1.VgPlayer(ref, api, fsAPI, controlsHidden);
    });
    it('Should handle native fullscreen', function () {
        fsAPI.nativeFullscreen = true;
        player.onChangeFullscreen(true);
        expect(player.isFullscreen).toBeFalsy();
    });
    it('Should handle emulated fullscreen enabled', function () {
        fsAPI.nativeFullscreen = false;
        player.onChangeFullscreen(true);
        expect(player.isFullscreen).toBeTruthy();
        expect(player.zIndex).toBe('1');
    });
    it('Should handle emulated fullscreen enabled', function () {
        fsAPI.nativeFullscreen = false;
        player.onChangeFullscreen(false);
        expect(player.isFullscreen).toBeFalsy();
        expect(player.zIndex).toBe('auto');
    });
});
describe('Videogular Player', function () {
    var builder;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [VgPlayerTest, vg_player_1.VgPlayer]
        });
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.compileComponents();
    }));
    it('Should create a VgPlayer component', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(VgPlayerTest);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        var video = compiled.querySelector('video');
        expect(video.controls).toBe(true);
    }));
});
var VgPlayerTest = (function () {
    function VgPlayerTest() {
    }
    VgPlayerTest.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n        <vg-player>\n            <video vg-media id=\"singleVideo\" preload=\"auto\" controls>\n                <source src=\"http://static.videogular.com/assets/videos/videogular.mp4\" type=\"video/mp4\">\n                <source src=\"http://static.videogular.com/assets/videos/videogular.ogg\" type=\"video/ogg\">\n                <source src=\"http://static.videogular.com/assets/videos/videogular.webm\" type=\"video/webm\">\n            </video>\n        </vg-player>\n    ",
                    providers: [vg_api_1.VgAPI]
                },] },
    ];
    /** @nocollapse */
    VgPlayerTest.ctorParameters = function () { return []; };
    return VgPlayerTest;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Zy1wbGF5ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUE2RDtBQUM3RCxzQ0FBd0M7QUFDeEMseUNBQXFDO0FBRXJDLDZDQUF5QztBQUN6QyxtRUFBOEQ7QUFJOUQsUUFBUSxDQUFDLG1CQUFtQixFQUFFO0lBQzFCLElBQUksTUFBZSxDQUFDO0lBQ3BCLElBQUksR0FBYyxDQUFDO0lBQ25CLElBQUksR0FBUyxDQUFDO0lBQ2QsSUFBSSxLQUFxQixDQUFDO0lBQzFCLElBQUksY0FBK0IsQ0FBQztJQUVwQyxVQUFVLENBQUM7UUFDUCxHQUFHLEdBQUc7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsZ0JBQWdCLEVBQUU7b0JBQ2QsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2Y7YUFDSjtTQUNKLENBQUM7UUFFRixjQUFjLEdBQUc7WUFDYixRQUFRLEVBQUU7Z0JBQ04sU0FBUyxFQUFFLGVBQVE7YUFDdEI7U0FDZ0IsQ0FBQztRQUV0QixHQUFHLEdBQUcsSUFBSSxjQUFLLEVBQUUsQ0FBQztRQUNsQixLQUFLLEdBQUcsSUFBSSxtQ0FBZSxFQUFFLENBQUM7UUFDOUIsTUFBTSxHQUFHLElBQUksb0JBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztLQUMxRCxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUNBQWlDLEVBQUU7UUFDbEMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUU5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUMzQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkNBQTJDLEVBQUU7UUFDNUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUUvQixNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMkNBQTJDLEVBQUU7UUFDNUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUUvQixNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN0QyxDQUFDLENBQUM7Q0FDTixDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7SUFDMUIsSUFBSSxPQUFPLENBQUM7SUFFWixVQUFVLENBQUM7UUFDUCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzNCLFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBUSxDQUFDO1NBQ3pDLENBQUMsQ0FBQztLQUNOLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxlQUFLLENBQUM7UUFDYixpQkFBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDL0IsQ0FBQyxDQUFDLENBQUM7SUFFSixFQUFFLENBQUMsb0NBQW9DLEVBQ25DLGVBQUssQ0FBQztRQUNGLElBQUksT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN4QixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUNsRCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDLENBQUMsQ0FDTCxDQUFDO0NBQ0wsQ0FBQyxDQUFDOzs7OztnQkFFRixnQkFBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtZUFRVDtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxjQUFLLENBQUM7aUJBQ3JCOzs7O3VCQW5HRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXN5bmMsIGluamVjdCwgVGVzdEJlZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmUvdGVzdGluZ1wiO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZnUGxheWVyfSBmcm9tIFwiLi92Zy1wbGF5ZXJcIjtcbmltcG9ydCB7VmdNZWRpYX0gZnJvbSBcIi4uL3ZnLW1lZGlhL3ZnLW1lZGlhXCI7XG5pbXBvcnQge1ZnQVBJfSBmcm9tIFwiLi4vc2VydmljZXMvdmctYXBpXCI7XG5pbXBvcnQge1ZnRnVsbHNjcmVlbkFQSX0gZnJvbSBcIi4uL3NlcnZpY2VzL3ZnLWZ1bGxzY3JlZW4tYXBpXCI7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWZ0NvbnRyb2xzSGlkZGVuIH0gZnJvbSAnLi4vc2VydmljZXMvdmctY29udHJvbHMtaGlkZGVuJztcblxuZGVzY3JpYmUoJ1ZpZGVvZ3VsYXIgUGxheWVyJywgKCkgPT4ge1xuICAgIGxldCBwbGF5ZXI6VmdQbGF5ZXI7XG4gICAgbGV0IHJlZjpFbGVtZW50UmVmO1xuICAgIGxldCBhcGk6VmdBUEk7XG4gICAgbGV0IGZzQVBJOlZnRnVsbHNjcmVlbkFQSTtcbiAgICBsZXQgY29udHJvbHNIaWRkZW46VmdDb250cm9sc0hpZGRlbjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICByZWYgPSB7XG4gICAgICAgICAgICBuYXRpdmVFbGVtZW50OiB7XG4gICAgICAgICAgICAgICAgcXVlcnlTZWxlY3RvckFsbDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW3t9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29udHJvbHNIaWRkZW4gPSB7XG4gICAgICAgICAgICBpc0hpZGRlbjoge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZTogKCkgPT4ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBhcyBWZ0NvbnRyb2xzSGlkZGVuO1xuXG4gICAgICAgIGFwaSA9IG5ldyBWZ0FQSSgpO1xuICAgICAgICBmc0FQSSA9IG5ldyBWZ0Z1bGxzY3JlZW5BUEkoKTtcbiAgICAgICAgcGxheWVyID0gbmV3IFZnUGxheWVyKHJlZiwgYXBpLCBmc0FQSSwgY29udHJvbHNIaWRkZW4pO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYW5kbGUgbmF0aXZlIGZ1bGxzY3JlZW4nLCAoKSA9PiB7XG4gICAgICAgIGZzQVBJLm5hdGl2ZUZ1bGxzY3JlZW4gPSB0cnVlO1xuXG4gICAgICAgIHBsYXllci5vbkNoYW5nZUZ1bGxzY3JlZW4odHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KHBsYXllci5pc0Z1bGxzY3JlZW4pLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYW5kbGUgZW11bGF0ZWQgZnVsbHNjcmVlbiBlbmFibGVkJywgKCkgPT4ge1xuICAgICAgICBmc0FQSS5uYXRpdmVGdWxsc2NyZWVuID0gZmFsc2U7XG5cbiAgICAgICAgcGxheWVyLm9uQ2hhbmdlRnVsbHNjcmVlbih0cnVlKTtcblxuICAgICAgICBleHBlY3QocGxheWVyLmlzRnVsbHNjcmVlbikudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QocGxheWVyLnpJbmRleCkudG9CZSgnMScpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBoYW5kbGUgZW11bGF0ZWQgZnVsbHNjcmVlbiBlbmFibGVkJywgKCkgPT4ge1xuICAgICAgICBmc0FQSS5uYXRpdmVGdWxsc2NyZWVuID0gZmFsc2U7XG5cbiAgICAgICAgcGxheWVyLm9uQ2hhbmdlRnVsbHNjcmVlbihmYWxzZSk7XG5cbiAgICAgICAgZXhwZWN0KHBsYXllci5pc0Z1bGxzY3JlZW4pLnRvQmVGYWxzeSgpO1xuICAgICAgICBleHBlY3QocGxheWVyLnpJbmRleCkudG9CZSgnYXV0bycpO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdWaWRlb2d1bGFyIFBsYXllcicsICgpID0+IHtcbiAgICBsZXQgYnVpbGRlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBUZXN0QmVkLmNvbmZpZ3VyZVRlc3RpbmdNb2R1bGUoe1xuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbVmdQbGF5ZXJUZXN0LCBWZ1BsYXllcl1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBiZWZvcmVFYWNoKGFzeW5jKCgpID0+IHtcbiAgICAgICAgVGVzdEJlZC5jb21waWxlQ29tcG9uZW50cygpO1xuICAgIH0pKTtcblxuICAgIGl0KCdTaG91bGQgY3JlYXRlIGEgVmdQbGF5ZXIgY29tcG9uZW50JyxcbiAgICAgICAgYXN5bmMoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpeHR1cmUgPSBUZXN0QmVkLmNyZWF0ZUNvbXBvbmVudChWZ1BsYXllclRlc3QpO1xuICAgICAgICAgICAgZml4dHVyZS5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICBsZXQgY29tcGlsZWQgPSBmaXh0dXJlLmRlYnVnRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgbGV0IHZpZGVvID0gY29tcGlsZWQucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcblxuICAgICAgICAgICAgZXhwZWN0KHZpZGVvLmNvbnRyb2xzKS50b0JlKHRydWUpO1xuICAgICAgICB9KVxuICAgICk7XG59KTtcblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHZnLXBsYXllcj5cbiAgICAgICAgICAgIDx2aWRlbyB2Zy1tZWRpYSBpZD1cInNpbmdsZVZpZGVvXCIgcHJlbG9hZD1cImF1dG9cIiBjb250cm9scz5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cImh0dHA6Ly9zdGF0aWMudmlkZW9ndWxhci5jb20vYXNzZXRzL3ZpZGVvcy92aWRlb2d1bGFyLm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cImh0dHA6Ly9zdGF0aWMudmlkZW9ndWxhci5jb20vYXNzZXRzL3ZpZGVvcy92aWRlb2d1bGFyLm9nZ1wiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cImh0dHA6Ly9zdGF0aWMudmlkZW9ndWxhci5jb20vYXNzZXRzL3ZpZGVvcy92aWRlb2d1bGFyLndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgPC92Zy1wbGF5ZXI+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtWZ0FQSV1cbn0pXG5jbGFzcyBWZ1BsYXllclRlc3Qge31cbiJdfQ==