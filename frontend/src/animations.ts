import { animate, state, style, transition, trigger } from "@angular/animations";

/**
 * Enumeration of {@link AppComponent} menu states.
 */
export enum expandStates{ open="open", closed="closed"}

/**
 * Enumeration of triggers for {@link Animations}.
 */
export enum animationTriggers{
    expand="expand"
}
export const SHORT_ANIMATION="0.5s"

export class Animations{

    
    public static getExpandTrigger(toHeight: string, animateLength: string = SHORT_ANIMATION){
        return trigger(animationTriggers.expand,[
            state(expandStates.open, style({ 
                height: `${toHeight}`, opacity: 1
            })),
            state(expandStates.closed, style({ 
                height: '0', opacity: 0 
            })),
            transition(`${expandStates.open} <=> ${expandStates.closed}`,[
                animate(`${animateLength}`)
            ])
        ])
    }
}