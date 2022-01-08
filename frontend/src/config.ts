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
 export interface AppRoute { route: string, title: string, tooltip: string }
 /**
  * Interface defining metadata associated with icons, for registering icon files with `MatIconRegistry`.
  */
 export interface IconRegistry { icon: string, location: string }
/**
 * Interface defining configuration attributes for components within the application.
 */
export interface Config{
    dialogWidth: string, dialogHeight: string,
    registerMsg: string, editMsg: string,
    createMsg: string, defaultMsg: string,
    signOutMsg: string,
    createAlert: string, editAlert: string,
    routes: AppRoute[], registry: IconRegistry[],
    sections: Section[]
}

/**
 * Instance of the interface {@link Config}. This export is imported into components across the application to configure static values through one central configuration file. 
 */
export const AppConfig: Config = {
    dialogWidth: '50%', dialogHeight: '25%',
    registerMsg: "Verify your email and then return to the login page",
    editMsg: "Edit post?", editAlert: "News post updated!",
    createMsg: "Submit new post?", createAlert: "News post created!",
    defaultMsg: "Something seems to have gone wrong...",
    signOutMsg: 'Are you sure you want to sign out?',
    // Paths are relative to the /app/ directory since they are imported in the AppComponent constructor
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
        { route: '', title: 'HOME', tooltip: "Home Page" },
        { route: 'mission', title: 'MISSION', tooltip: 'Innovation Lab Mission Statement' },
        { route: 'team', title: 'TEAM', tooltip: "Meet the Innovation Lab Team" },
        { route: 'news/feed', title: 'NEWS FEED', tooltip: "Latest News From The Feed" },
        { route: 'projects', title: 'PROJECTS', tooltip: "Past And Ongoing Projects" },
        { route: 'docs', title: 'DOCS', tooltip: "Documentation for the InnoLab Web App" },
        { route: 'admin', title: 'ADMIN CONSOLE', tooltip: "Administrative Access to Site" },  
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

