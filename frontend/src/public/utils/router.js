"use strict";
const routes = {
    "/": {
        page: "/pages/home.html",
        script: "/scripts/home.js",
    },
    "/about": {
        page: "/pages/about.html",
    },
};
async function router() {
    loadPage();
    async function loadPage() {
        const path = window.location.pathname;
        const pageSrc = routes[path]?.page || "/pages/404.html";
        const scriptSrc = routes[path]?.script;
        // Remove old route script
        const oldScript = document.querySelector("script[data-route]");
        if (oldScript)
            oldScript.remove();
        const response = await fetch(pageSrc);
        const html = await response.text();
        console.log(html);
        const rootElement = document.getElementById("root");
        if (scriptSrc)
            loadScript(scriptSrc);
        if (rootElement)
            rootElement.innerHTML = html;
    }
    function loadScript(src) {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.dataset.route = "true";
        document.body.appendChild(script);
    }
    function navigate(path) {
        window.history.pushState({}, "", path);
        loadPage();
    }
    window.addEventListener("popstate", loadPage);
    document.addEventListener("click", e => {
        const link = (e.target instanceof Element)
            ? e.target.closest("a[data-navlink]")
            : null;
        if (!link || !link.getAttribute("href"))
            return;
        e.preventDefault();
        navigate(link.getAttribute("href"));
    });
}
router();
