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
                <h3>${this.icon} ${this.title}</h3>
                <p>${this.description}</p>
                <a href="${this.link}" target="_blank">Official Site</a>
            </div>
        `;
    }
}

class ProjectManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.projects = [];
    }

    add(project) {
        this.projects.push(project);
    }

    render(filter = "all") {
        this.container.innerHTML = "";
        this.projects
            .filter(p => filter === "all" || p.category === filter)
            .forEach(p => {
                this.container.innerHTML += p.render();
            });
    }
}

class MatrixBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.letters = "01{}[]<>/\\";
        this.fontSize = 18;

        this.resize();
        window.addEventListener("resize", () => this.resize());

        this.initializeDrops();
        setInterval(() => this.draw(), 80);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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

            if (Math.random() > 0.98) continue;

            const text = this.letters[
                Math.floor(Math.random() * this.letters.length)
            ];

            this.ctx.fillText(
                text,
                i * this.fontSize,
                this.drops[i] * this.fontSize
            );

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i]++;
        }
    }
}

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
    "https://mikrotik.com/",
    "🌐"
));

manager.add(new Project(
    "Docker Lab",
    "DevOps infrastructure lab.",
    "devops",
    "https://www.docker.com/",
    "🐳"
));

manager.render();

document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        manager.render(btn.dataset.filter);
    });
});

document.querySelectorAll(".auth-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        location.reload();
    });
});

new MatrixBackground("matrixCanvas");
