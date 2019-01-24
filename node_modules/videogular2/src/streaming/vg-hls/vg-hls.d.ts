import { ElementRef, SimpleChanges, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { VgAPI } from "../../core/services/vg-api";
import { IHLSConfig } from './hls-config';
import { Subscription } from 'rxjs/Subscription';
export declare class VgHLS implements OnInit, OnChanges, OnDestroy {
    private ref;
    API: VgAPI;
    vgHls: string;
    vgFor: string;
    target: any;
    hls: any;
    preload: boolean;
    crossorigin: string;
    config: IHLSConfig;
    subscriptions: Subscription[];
    constructor(ref: ElementRef, API: VgAPI);
    ngOnInit(): void;
    onPlayerReady(): void;
    ngOnChanges(changes: SimpleChanges): void;
    createPlayer(): void;
    destroyPlayer(): void;
    ngOnDestroy(): void;
}
