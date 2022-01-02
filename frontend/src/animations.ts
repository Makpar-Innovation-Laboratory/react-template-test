import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

/**
 * Enumeration of {@link Animations} expand animation states.
 */
export enum ExpandStates{ open="open", closed="closed"}
/**
 * Enumeration of {@link Animations} scale animation states
 */
export enum ScaleStates{ scale="scale", null=""}
/**
 * Enumeration of {@link Animations} highlight states
 */
export enum HighlightStates{ highlight="highlight", null="" }
/**
 * Enumeration of triggers for {@link Animations}.
 */
export enum AnimationTriggers{
    expand="expand", scale="scale", 
    highlight="highlight"
}
/**
 * Enumeration of animation lengths for {@link Animations}
 */
export enum AnimationPeriods{
    short="0.5s", medium="1.0s"
}

export class Animations{

    /**
     * # Description
     * Get animation trigger for expanding an element to a given height over a specific time period.
     * @param toHeight height expressed in CSS units (e.g. %, px, em, etc.)
     * @param animateLength animation length expressed in seconds (e.g. '0.5s', '1s', '2s')
     * @returns animation expand trigger
     */
    public static getExpandTrigger(toHeight: string, animateLength: string = AnimationPeriods.short)
    : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.expand,[
            state(ExpandStates.open, style({ 
                height: `${toHeight}`, opacity: 1
            })),
            state(ExpandStates.closed, style({ 
                height: '0', opacity: 0 
            })),
            transition(`${ExpandStates.open} <=> ${ExpandStates.closed}`,[
                animate(`${animateLength}`)
            ])
        ])
    }

    /**
     * # Description
     * Get animation trigger for scaling an element by a given factor over a specified time period
     * @param scaleFactor scale factor expressed as a ratio of initial height (e.g. 0.5, 1, 1.25, etc.)
     * @param animateLength animation length expressed in seconds (e.g. '0.5s', '1s', '2s')
     * @returns animation scale trigger
     */
    public static getScaleTrigger(scaleFactor: number, animateLength: string = AnimationPeriods.short)
    : AnimationTriggerMetadata {
        return trigger(AnimationTriggers.scale, [
            state(ScaleStates.scale, style({
                transform: `scale(${scaleFactor}, ${scaleFactor})`
            })),
            transition(`void <=> ${ScaleStates.scale}`, [
                animate(`${animateLength}`)
            ])
        ])
    }

    /**
     * # Get animation trigger for highlighting an element by a given factor over a specified time period.
     * @param scaleFactor highlight factor expressed as a ratio of initial height (e.g. 0.5, 1, 1.25, etc.)
     * @param animateLength animation length expressed in seconds (e.g. '0.5s', '1s', '2s')
     * @returns animation scale trigger
     */
     public static getHighlightTrigger(highlightFactor: number, animateLength: string = AnimationPeriods.short)
     : AnimationTriggerMetadata {
         return trigger(AnimationTriggers.highlight, [
             state(HighlightStates.highlight, style({
                 filter: `brightness(${highlightFactor})`
             })),
             transition(`void <=> ${ScaleStates.scale}`, [
                 animate(`${animateLength}`)
             ])
         ])
     }
}