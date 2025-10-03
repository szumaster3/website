document.addEventListener("DOMContentLoaded", function () {
    let menuToggle = document.createElement("button");
    menuToggle.innerText = "☰ Menu";
    menuToggle.classList.add("menu-toggle");

    let nav = document.querySelector(".navigation");
    nav.parentNode.insertBefore(menuToggle, nav);

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
    });

  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                history.pushState(null, null, this.getAttribute("href"));
            }
        });
    });

  
    function loadPage(url, pushState = true) {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Page not found");
                return response.text();
            })
            .then(html => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(html, "text/html");
                let newContent = doc.querySelector(".main");

                if (newContent) {
                    document.querySelector(".main").innerHTML = newContent.innerHTML;
                    
                    if (pushState) {
                        history.pushState({ path: url }, "", url);
                    }
                }

                // Prevent scrolling jump when switching pages
                window.scrollTo({ top: 0, behavior: "instant" });

                reinitializeScripts();
            })
            .catch(error => console.error("Error loading page:", error));
    }

    document.querySelectorAll(".navigation a").forEach(link => {
        link.addEventListener("click", function (e) {
            let url = this.getAttribute("href");

            if (!url.startsWith("http") && !url.includes(".html")) {
                e.preventDefault();
                loadPage(url);
            }
        });
    });

  
    window.addEventListener("popstate", function (event) {
        if (event.state && event.state.path) {
            loadPage(event.state.path, false);
        }
    });
    function reinitializeScripts() {
        console.log("");
    }
});
