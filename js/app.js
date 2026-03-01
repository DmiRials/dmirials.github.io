/* =========================
   Project Model
========================= */
class Project {
    constructor(title, description, category, link, icon) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.link = link;
        this.icon = icon;
    }

    render() {
        return `
            <div class="card" data-category="${this.category}">
                <div class="card-header">
                    <span class="card-icon">${this.icon}</span>
                    <h3 class="color-primary">${this.title}</h3>
                </div>
                <p>${this.description}</p>
                <a href="${this.link}" target="_blank">Official Site</a>
            </div>
        `;
    }
}

/* =========================
   Project Manager
========================= */
class ProjectManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.projects = [];
    }

    add(project) {
        this.projects.push(project);
    }

    render(filter = "all") {
        if (!this.container) return;

        this.container.innerHTML = "";
        this.projects
            .filter(p => filter === "all" || p.category === filter)
            .forEach(p => {
                this.container.innerHTML += p.render();
            });
    }
}

/* =========================
   Matrix Background (letters + numbers)
========================= */
class MatrixBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.fontSize = 18;

        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
            this.initializeDrops();
        });

        this.initializeCharacters();
        this.initializeDrops();

        setInterval(() => this.draw(), 80);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initializeCharacters() {
        const numbers = "0123456789";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const symbols = "{}[]<>/\\@#$%^&*";

        this.characters = (numbers + upper + lower + symbols).split("");
    }

    initializeDrops() {
        this.columns = Math.floor(this.canvas.width / this.fontSize);

        this.drops = Array(this.columns)
            .fill(0)
            .map(() =>
                Math.floor(Math.random() * this.canvas.height / this.fontSize)
            );
    }

    draw() {
        this.ctx.fillStyle = "rgba(0,0,0,0.15)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#00ff88";
        this.ctx.font = this.fontSize + "px monospace";

        for (let i = 0; i < this.drops.length; i++) {

            if (Math.random() > 0.97) continue;

            const text = this.characters[
                Math.floor(Math.random() * this.characters.length)
            ];

            this.ctx.fillText(
                text,
                i * this.fontSize,
                this.drops[i] * this.fontSize
            );

            if (
                this.drops[i] * this.fontSize > this.canvas.height &&
                Math.random() > 0.975
            ) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }
    }
}

/* =========================
   Initialization
========================= */

if (document.getElementById("projectsContainer")) {
    const manager = new ProjectManager("projectsContainer");

    manager.add(new Project(
        "RustDesk",
        "Self-hosted remote desktop solution.",
        "backend",
        "https://rustdesk.com/",
        "🖥"
    ));

    manager.add(new Project(
        "MikroTik",
        "Networking equipment & RouterOS.",
        "networking",
        "mikrotik.html",
        "🌐"
    ));

    manager.add(new Project(
        "Docker Lab",
        "DevOps infrastructure lab.",
        "devops",
        "https://www.docker.com/",
        "🐳"
    ));

    // render all projects by default
    manager.render();
}

// remove filter controls – no event listeners needed

document.querySelectorAll(".auth-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        location.reload();
    });
});

new MatrixBackground("matrixCanvas");
