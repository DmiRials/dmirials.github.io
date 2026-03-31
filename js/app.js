const toolCards = [
    {
        key: "generator",
        link: "mikrotik.html"
    },
    {
        key: "rustdesk",
        link: "https://rustdesk.com/"
    },
    {
        key: "selfHosted",
        link: "https://github.com/DmiRials"
    }
];

function renderToolCards() {
    const container = document.getElementById("projectsContainer");

    if (!container) {
        return;
    }

    container.innerHTML = toolCards.map((tool) => `
        <article class="tool-card">
            <div class="card-eyebrow">${siteI18n.t(`home.toolCards.${tool.key}.tag`)}</div>
            <h3>${siteI18n.t(`home.toolCards.${tool.key}.title`)}</h3>
            <p>${siteI18n.t(`home.toolCards.${tool.key}.text`)}</p>
            <a href="${tool.link}" ${tool.link.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${siteI18n.t(`home.toolCards.${tool.key}.link`)}</a>
        </article>
    `).join("");
}

window.addEventListener("languagechange", renderToolCards);

initializeSharedSite();
siteI18n.init();
renderToolCards();
