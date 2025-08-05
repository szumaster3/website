function getBasePath() {
    const path = window.location.pathname.replace(/^\/[A-Za-z]:/, '');
    const pathParts = path.split('/').filter(part => part.length > 0);

    let levelsUp = 0;
    for (let i = pathParts.length - 1; i >= 0; i--) {
        if (pathParts[i] === 'web') break;
        levelsUp++;
    }

    return levelsUp > 0 ? '../'.repeat(levelsUp) : './';
}

const basePath = getBasePath();
console.log("Base Path:", basePath);

document.addEventListener("DOMContentLoaded", () => {
    const script = document.createElement("script");
    script.src = `${basePath}data/js/header.js`;
    script.type = "text/javascript";
    document.body.appendChild(script);
});