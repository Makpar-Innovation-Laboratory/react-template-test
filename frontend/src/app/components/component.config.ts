/**
 * Enumeration of the {@link EditorComponent} modes.
 */
export enum editorModes{ edit='edit', new='new' }


/**
 * Interface defining the configuration attributes for components within the application.
 */
export interface Config{
    dialogWidth: string, dialogHeight: string,
    registerMsg: string, editMsg: string,
    createMsg: string, defaultMsg: string
    createAlert: string, editAlert: string
}

/**
 * Instance of the interface {@link Config}. This export is imported into components across the application to configure static values through one central configuration file. 
 */
export const ComponentConfig: Config = {
    dialogWidth: '50%', dialogHeight: '25%',
    registerMsg: "Verify your email and then return to the login page",
    editMsg: "Edit post?",
    editAlert: "News post updated!",
    createMsg: "Submit new post?",
    createAlert: "News post created!",
    defaultMsg: "Something seems to have gone wrong...",
}