class MatrixBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);

        if (!this.canvas) {
            return;
        }

        this.ctx = this.canvas.getContext("2d");
        this.fontSize = 18;
        this.characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]<>/\\@#$%^&*".split("");

        this.resize();
        this.initializeDrops();

        window.addEventListener("resize", () => {
            this.resize();
            this.initializeDrops();
        });

        this.intervalId = window.setInterval(() => this.draw(), 80);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initializeDrops() {
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(0).map(() => Math.floor(Math.random() * this.canvas.height / this.fontSize));
    }

    draw() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#00ff88";
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i += 1) {
            if (Math.random() > 0.97) {
                continue;
            }

            const character = this.characters[Math.floor(Math.random() * this.characters.length)];

            this.ctx.fillText(character, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i] += 1;
        }
    }
}

function updateFooterYear() {
    const yearNode = document.getElementById("currentYear");

    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }
}

function initializeSharedSite() {
    updateFooterYear();
    new MatrixBackground("matrixCanvas");
}
