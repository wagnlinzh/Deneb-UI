import {
    Component, Input, trigger, state, style, transition, animate, ViewEncapsulation,
    OnDestroy, AnimationTransitionEvent, Output, EventEmitter
} from '@angular/core';
import {ToastRef} from './toast-ref';
import {UIToastAnimation} from './toast-interface';

@Component({
    selector: 'ui-toast',
    template: '<div class="toast-content ui black message">{{message}}</div>',
    animations: [
        trigger('fade', [
            state('in', style({opacity: 1})),
            transition('void => *', [
                style({opacity: 0}),
                animate(300)
            ]),
            transition('* => void', [
                animate(300, style({opacity: 0}))
            ])
        ])
    ],
    host: {
        '[@fade]': '"in"',
        '(@fade.done)': 'uiLeaveAnimationDone($event)'
    },
    styleUrls: ['toast.less'],
    encapsulation: ViewEncapsulation.Emulated
})
export class UIToastComponent implements OnDestroy, UIToastAnimation {
    @Input() message: string;

    @Output()
    animationEvent = new EventEmitter<any>();

    constructor(private _toastRef: ToastRef<UIToastComponent>) {}

    ngOnDestroy(): void {
        console.log('destroyed');
    }

    uiLeaveAnimationDone(event: AnimationTransitionEvent) {
        if (event.toState === 'void') {
            this.animationEvent.emit(null);
        }
    }
}