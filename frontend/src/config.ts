/**
 * Enumeration of {@link EditorComponent} modes.
 */
export enum EditorModes{ edit='edit', new='new' }

/**
 * 
 */
export interface Section{ key: string, title: string, description: string }
/**
 * Interface defining metadata associated with routes, for rendering routes into links and buttons. 
 */
 export interface AppRoute { route: string, title: string, tooltip: string, dev: boolean }
 /**
  * Interface defining metadata associated with icons, for registering icon files with `MatIconRegistry`.
  */
 export interface IconRegistry { 
     /**
      * {@link }
      */
     icon: string, 
     location: string 
}
/**
 * Interface defining configuration attributes for components within the application.
 */
export interface Config{
    dialogWidth: string, dialogHeight: string,
    createMsg: string, createAlert: string,
    editMsg: string, editAlert: string,
    registerMsg: string,
    defaultMsg: string,
    signOutMsg: string,
    commentAlert: string,
    routes: AppRoute[],
    registry: IconRegistry[],
    sections: Section[]
}

/**
 * Instance of the interface {@link Config}. This export is imported into components across the application to configure static values through one central configuration file. 
 * 
 * @prop {@link dialogWidth}: Width assigned to all instances of `MatDialog`.
 * @prop {@link dialogHeight}: Height assigned to all instances of `MatDialog`.
 * @prop {@link registerMsg}: `MatDialog` message shown in {@link RegisterComponent} when user successfully registers for a new account.
 * @prop {@link editMsg}: `MatDialog` message shown in {@link EditorComponent} when {@link EditorComponent.mode} is set to {@link EditorModes.edit}
 * @prop {@link editAlert}: `MatSnackBar` message shown in {@link EditorComponent} when {@link EditorComponent.mode} is set to {@link EditorModes.edit}
 * @prop {@link createMsg}: `MatDialog` message shown in {@link EditorComponent} when {@link EditorComponent.mode} is set to {@link EditorModes.new}.
 * @prop {@link createAlert}: `MatSnackBar` message shown in {@link EditorComponent} when {@link EditorComponent.mode} is set to {@link EditorModes.new}.
 * @prop {@link defaultMsg}: Default `MatDialog` message shown in {@link EditorComponent} when {@link EditorComponent.mode} is not set. (Should be impossible, but in case some edge case breaks the dialog).
 * @prop {@link signOutMsg}: `MatDialog` message shown in {@link AppComponent} when user signs out.
 * @prop {@link commentAlert}: `MatSnackBar` message shown in {@link ReplyComponent} when user successfully submits a new comment.
 * @prop {@link registry}: {@link IconRegistry} for enumerating the icons contained in the *src/assets/* directory. 
 * @prop {@link routes}: {@link AppRoute} array containing metadata about routes, used for dynamically rendering routes in HTML templates.
 * @prop {@link sections}: {@link Section} array containing metadata about {@link HomeComponent} sections, used for dynamically rendering each child section in the HTML template.
 */
export const AppConfig: Config = {
    dialogWidth: '50%', 
    dialogHeight: '25%',
    registerMsg: "Verify your email and then return to the login page",
    editMsg: "Edit post?", 
    editAlert: "News post updated!",
    createMsg: "Submit new post?", 
    createAlert: "News post created!",
    defaultMsg: "Something seems to have gone wrong...",
    signOutMsg: 'Are you sure you want to sign out?',
    commentAlert: 'Comment submitted!',
    registry:[
        { icon: 'bitcoin', location: '../assets/icons/logo-bitcoin.svg' },
        { icon: 'discord', location: '../assets/icons/logo-discord.svg' },
        { icon: 'docker', location: '../assets/icons/logo-docker.svg' },
        { icon: 'facebook', location: '../assets/icons/logo-facebook.svg' },
        { icon: 'github', location: '../assets/icons/logo-github.svg' },
        { icon: 'instagram', location: '../assets/icons/logo-instagram.svg' },
        { icon: 'javascript', location: '../assets/icons/logo-javascript.svg' },
        { icon: 'linkedin', location: '../assets/icons/logo-linkedin.svg' },
        { icon: 'linux', location: '../assets/icons/logo-linux.svg' },
        { icon: 'reddit', location: '../assets/icons/logo-reddit.svg' },
        { icon: 'twitter', location: '../assets/icons/logo-twitter.svg' },
    ],
    // NOTE: this doesn't register the routes with Component views. This configures the navigation menu
    //          within the AppComponent
    routes: [
        { route: '/', title: 'HOME', tooltip: "Home Page", dev: false },
        { route: '/lab/mission', title: 'MISSION', tooltip: 'Innovation Lab Mission Statement', dev: false },
        { route: '/lab/team', title: 'TEAM', tooltip: "Meet the Innovation Lab Team", dev: false },
        { route: '/news/feed', title: 'NEWS FEED', tooltip: "Latest News From The Feed", dev: false },
        { route: '/lab/projects', title: 'PROJECTS', tooltip: "Past And Ongoing Projects", dev: false },
        { route: '/docs', title: 'DOCS', tooltip: "Documentation for the InnoLab Web App", dev: true },
        { route: '/admin', title: 'ADMIN', tooltip: "Administrative Access to Site", dev: true},  
    ],
    // NOTE: this configures the home component sections display
    sections: [
        { key: 'cyber-security' , title: 'CYBERSECURITY', description: 'a description of cybersecurity goes here' },
        { key: 'machine-learning', title: 'MACHINE LEARNING', description: 'a description of machine learning goes here' },
        { key: 'cloud-migration', title: 'CLOUD MIGRATION', description: 'a description of cloud migration goes here' }, 
        { key: 'devsecops', title: 'DEVSEVOPS', description: 'a description of devsecops goes here' }, 
        { key: 'agile', title: 'AGILE', description: 'a description of agile goes here' }
    ]
}

