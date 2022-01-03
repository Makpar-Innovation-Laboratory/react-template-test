import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

/**
 * Enumeration of {@link Animations} expand animation states.
 */
export enum ExpandStates{ 
    open="open", closed="closed"
}
/**
 * Enumeration of {@link Animations} scale animation states
 */
export enum ScaleStates{ 
    scale="scale", normal="normal"
}
/**
 * Enumeration of {@link Animations} highlight states
 */
export enum HighlightStates{ 
    highlight="highlight", normal="normal" 
}
/**
 * Enumeration of triggers for {@link Animations}.
 */
export enum AnimationTriggers{
    expand="expand", scale="scale", highlight="highlight"
}
/**
 * Enumeration of animation lengths for {@link Animations}
 */
export enum AnimationPeriods{
    short="0.5s", medium="1.0s",long="2.0s"
}

/**
 * # Animations
 * ## Description
 * Static factory for `AnimationTriggerMetaData`
 * ## Example Usage
 * Use static functions within the class in the `animations` attribute of the `@Component` annotation of an **Angular** Component to register animations with the template,
 * ```
 * @Component({
 *  selector: 'app-root',
 *  templateUrl: './app.component.html',
 *  styleUrls: ['./app.component.css'],
 *  animations: [
 *      Animations.getExpandTrigger('5%')
 *  ]
 * })
 * ```
 * Define a control variable using {@link AnimationControl} within the Component typescript class,
 * ```javascript
 * 
 * ```
 */
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

/**
 * # Description
 */
export class AnimationControl{
    public animationType : AnimationTriggers;
    public state ?: string;

    constructor(type: AnimationTriggers){
        this.animationType = type;
        this.prime();
    }

    /**
     * Trigger {@link AnimationControl} by switching the appropriate {@link state} based on the {@link animationType}
     */
    public animate() { 
        switch(this.animationType){
            case AnimationTriggers.expand:
                this.state = ExpandStates.open;
                break;
            case AnimationTriggers.highlight:
                this.state = HighlightStates.highlight;
                break;
            case AnimationTriggers.scale:
                this.state = ScaleStates.scale;
                break;
        }
    }

    /**
     * Return {@link AnimationControl} to its initial {@link state} and prime for another animation based on the {@link animationType}
     */
    public prime(){
        switch(this.animationType){
            case AnimationTriggers.expand:
                this.state = ExpandStates.closed;
                break;
            case AnimationTriggers.highlight:
                this.state = HighlightStates.normal;
                break;
            case AnimationTriggers.scale:
                this.state = ScaleStates.normal;
                break;
        }
    }

    /**
     * # Description
     * Sets {@link AnimationControl} to new {@link state}. The {@link state} must match the {@link animationType}, i.e. if `animationType=='highlight'`, then the allowable values of {@link state} are `highlight` and `normal`. Animation states are enumeration through exported `enum`s of the *animations.ts* module.
     * @param newState animation state
     */
    public setState(newState: string): void { this.state = newState; }
}