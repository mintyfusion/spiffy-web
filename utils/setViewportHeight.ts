/**
 * Sets a global variable to html element for viewport height.
 * This can fix the 100vh issues of mobile devices. 
 */
 export default function setViewportHeight(): void {
    if (!window) {
        return;
    }

    const root = document.querySelector<HTMLDivElement>(":root");
    root?.style.setProperty("--vh", `${window.innerHeight}px`);
}