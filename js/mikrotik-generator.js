const redirectToggle = document.getElementById("dnsRedirectToggle");
const redirectSettings = document.getElementById("dnsRedirectSettings");
const filterToggle = document.getElementById("dnsFilterToggle");
const filterSettings = document.getElementById("dnsFilterSettings");
const hairpinToggleEl = document.getElementById("hairpinToggle");
const hairpinLanGroup = document.getElementById("hairpinLanGroup");
const loadExampleBtn = document.getElementById("loadExampleBtn");

const examples = {
    nat: {
        localNetwork: "192.168.88.0/24",
        routerIp: "192.168.88.1"
    },
    dns: {
        primary: ["1.1.1.1"],
        secondary: ["1.0.0.1"],
        custom: "",
        ttl: "1w",
        redirect: true,
        redirectRouterIp: "192.168.88.1",
        redirectLocalSubnet: "192.168.88.0/24",
        filter: true,
        filterWan: "WAN"
    },
    portforward: {
        routerIp: "192.168.88.1",
        internalIp: "192.168.88.10",
        externalPort: "8443",
        internalPort: "443",
        protocol: "tcp",
        hairpin: true,
        hairpinLan: "192.168.88.0/24"
    }
};

function translate(key) {
    return siteI18n.t(key);
}

function syncToggleGroups() {
    if (redirectToggle) {
        redirectSettings.style.display = redirectToggle.checked ? "block" : "none";
    }

    if (filterToggle) {
        filterSettings.style.display = filterToggle.checked ? "block" : "none";
    }

    if (hairpinToggleEl) {
        hairpinLanGroup.style.display = hairpinToggleEl.checked ? "block" : "none";
    }
}

function activateTab(tabName) {
    document.querySelectorAll(".tab-content").forEach((tab) => {
        tab.classList.remove("active");
    });

    document.querySelectorAll(".tab-btn").forEach((button) => {
        button.classList.remove("active");
    });

    document.getElementById(tabName).classList.add("active");
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add("active");
}

function applyExample(tabName) {
    if (tabName === "nat") {
        document.getElementById("localNetwork").value = examples.nat.localNetwork;
        document.getElementById("routerIp").value = examples.nat.routerIp;
        return;
    }

    if (tabName === "dns") {
        document.querySelectorAll(".primary-dns, .secondary-dns").forEach((checkbox) => {
            checkbox.checked = false;
        });

        document.querySelectorAll(".primary-dns").forEach((checkbox) => {
            checkbox.checked = examples.dns.primary.includes(checkbox.value);
        });

        document.querySelectorAll(".secondary-dns").forEach((checkbox) => {
            checkbox.checked = examples.dns.secondary.includes(checkbox.value);
        });

        document.getElementById("dnsCustom").value = examples.dns.custom;
        document.getElementById("cacheTtl").value = examples.dns.ttl;
        redirectToggle.checked = examples.dns.redirect;
        filterToggle.checked = examples.dns.filter;
        document.getElementById("redirectRouterIp").value = examples.dns.redirectRouterIp;
        document.getElementById("redirectLocalSubnet").value = examples.dns.redirectLocalSubnet;
        document.getElementById("filterWanInterface").value = examples.dns.filterWan;
        redirectSettings.style.display = redirectToggle.checked ? "block" : "none";
        filterSettings.style.display = filterToggle.checked ? "block" : "none";
        return;
    }

    document.getElementById("pfRouterIp").value = examples.portforward.routerIp;
    document.getElementById("pfInternalIp").value = examples.portforward.internalIp;
    document.getElementById("pfExternalPort").value = examples.portforward.externalPort;
    document.getElementById("pfInternalPort").value = examples.portforward.internalPort;
    document.getElementById("pfProtocol").value = examples.portforward.protocol;
    hairpinToggleEl.checked = examples.portforward.hairpin;
    document.getElementById("hairpinLan").value = examples.portforward.hairpinLan;
    hairpinLanGroup.style.display = hairpinToggleEl.checked ? "block" : "none";
}

function generateNatCommands(localNetwork, routerIp) {
    return [
        `# ${translate("mikrotik.commands.nat.title")}`,
        `# ${translate("mikrotik.commands.generatedBy")}`,
        `# ${translate("mikrotik.commands.nat.routerIp")}: ${routerIp}`,
        "",
        "/ip firewall nat",
        `add chain=srcnat src-address=${localNetwork} action=masquerade comment=\"${translate("mikrotik.commands.nat.masqueradeComment")}\"`,
        "",
        `# ${translate("mikrotik.commands.nat.verify")}`,
        "/ip firewall nat print"
    ].join("\n");
}

function generateDnsCommands(dnsServers, options = {}) {
    const {
        ttl = "1w",
        redirect = false,
        redirectRouterIp = "",
        redirectLocalSubnet = "",
        filter = false,
        filterWan = ""
    } = options;

    const commands = [
        `# ${translate("mikrotik.commands.dns.title")}`,
        `# ${translate("mikrotik.commands.generatedBy")}`,
        "",
        "/ip dns",
        "set allow-remote-requests=yes",
        `set servers=${dnsServers.join(",")}`,
        `set cache-max-ttl=${ttl}`,
        "",
        `# ${translate("mikrotik.commands.dns.optionalReset")}`,
        "/ip dns cache reset",
        "",
        `# ${translate("mikrotik.commands.dns.verify")}`,
        "/ip dns print"
    ];

    if (redirect) {
        commands.push(
            "",
            `# ${translate("mikrotik.commands.dns.redirectSection")}`,
            "/ip firewall nat",
            `add action=dst-nat chain=dstnat dst-port=53 protocol=udp src-address=${redirectLocalSubnet} to-addresses=${redirectRouterIp} to-ports=53 comment=\"${translate("mikrotik.commands.dns.redirectComment")}\"`,
            `add action=dst-nat chain=dstnat dst-port=53 protocol=tcp src-address=${redirectLocalSubnet} to-addresses=${redirectRouterIp} to-ports=53 comment=\"${translate("mikrotik.commands.dns.redirectComment")}\"`
        );
    }

    if (filter) {
        commands.push(
            "",
            `# ${translate("mikrotik.commands.dns.filterSection")}`,
            "/ip firewall filter",
            `add action=drop chain=input dst-port=53 in-interface-list=${filterWan} protocol=udp comment=\"${translate("mikrotik.commands.dns.filterComment")}\"`,
            `add action=drop chain=input dst-port=53 in-interface-list=${filterWan} protocol=tcp comment=\"${translate("mikrotik.commands.dns.filterComment")}\"`
        );
    }

    return commands.join("\n");
}

function generatePortForwardCommands(routerIp, internalIp, externalPort, internalPort, protocol, options = {}) {
    const { hairpin = false, hairpinLan = "" } = options;
    const protocols = protocol === "tcp,udp" ? ["tcp", "udp"] : [protocol];
    const commands = [
        `# ${translate("mikrotik.commands.portForward.title")}`,
        `# ${translate("mikrotik.commands.generatedBy")}`,
        "",
        "/ip firewall nat"
    ];

    protocols.forEach((proto) => {
        commands.push(
            `add chain=dstnat dst-address=${routerIp} protocol=${proto} dst-port=${externalPort} action=dst-nat to-addresses=${internalIp} to-ports=${internalPort} comment=\"${translate("mikrotik.commands.portForward.ruleCommentPrefix")} ${externalPort} -> ${internalIp}:${internalPort} (${proto.toUpperCase()})\"`
        );
    });

    if (hairpin) {
        commands.push("", `# ${translate("mikrotik.commands.portForward.hairpinSection")}`);

        if (hairpinLan) {
            commands.push(
                `add chain=srcnat src-address=${hairpinLan} dst-address=${internalIp} connection-nat-state=dstnat action=masquerade comment=\"${translate("mikrotik.commands.portForward.hairpinComment")}\"`
            );
        } else {
            commands.push(
                `add chain=srcnat dst-address=${internalIp} action=masquerade comment=\"${translate("mikrotik.commands.portForward.hairpinComment")}\"`
            );
        }
    }

    commands.push("", `# ${translate("mikrotik.commands.portForward.verify")}`, "/ip firewall nat print");
    return commands.join("\n");
}

function maybeDownloadScript(tabName, commands) {
    const toggle = document.getElementById(`${tabName}ScriptToggle`);

    if (!toggle || !toggle.checked) {
        return;
    }

    const blob = new Blob([commands], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tabName}.rsc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function validateIp(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (!ipRegex.test(ip)) {
        return false;
    }

    return ip.split(".").every((part) => {
        const number = Number.parseInt(part, 10);
        return number >= 0 && number <= 255;
    });
}

function validateIpNetwork(network) {
    const parts = network.split("/");

    if (parts.length !== 2) {
        return false;
    }

    const cidr = Number.parseInt(parts[1], 10);
    return validateIp(parts[0]) && cidr >= 0 && cidr <= 32;
}

function validatePort(port) {
    const number = Number.parseInt(port, 10);
    return number >= 1 && number <= 65535;
}

function displayOutput(tabName, commands) {
    const outputNode = document.getElementById(`${tabName}Output`);
    const commandNode = document.getElementById(`${tabName}CommandOutput`);
    const copyButton = document.getElementById(`${tabName}CopyBtn`);

    commandNode.textContent = commands;
    outputNode.style.display = "block";

    copyButton.onclick = () => {
        navigator.clipboard.writeText(commands).then(() => {
            const originalLabel = copyButton.textContent;
            copyButton.textContent = translate("common.buttons.copied");

            window.setTimeout(() => {
                copyButton.textContent = originalLabel;
            }, 1800);
        });
    };
}

function getDnsContext() {
    let dnsServers = [];
    const primaryDns = document.querySelectorAll(".primary-dns:checked");
    const secondaryDns = document.querySelectorAll(".secondary-dns:checked");
    const customDns = document.getElementById("dnsCustom").value.trim();
    const redirect = redirectToggle.checked;
    const filter = filterToggle.checked;
    const redirectRouterIp = document.getElementById("redirectRouterIp").value.trim();
    const redirectLocalSubnet = document.getElementById("redirectLocalSubnet").value.trim();
    const filterWan = document.getElementById("filterWanInterface").value.trim();
    const ttl = document.getElementById("cacheTtl").value;

    primaryDns.forEach((checkbox) => dnsServers.push(checkbox.value));
    secondaryDns.forEach((checkbox) => dnsServers.push(checkbox.value));

    if (customDns) {
        if (!validateIp(customDns)) {
            return null;
        }

        dnsServers.push(customDns);
    }

    dnsServers = [...new Set(dnsServers)];

    if (primaryDns.length === 0) {
        return null;
    }

    if (redirect && (!validateIp(redirectRouterIp) || !validateIpNetwork(redirectLocalSubnet))) {
        return null;
    }

    if (!filter) {
        return null;
    }

    if (!filterWan) {
        return null;
    }

    return {
        dnsServers,
        options: {
            ttl,
            redirect,
            redirectRouterIp,
            redirectLocalSubnet,
            filter,
            filterWan
        }
    };
}

function getPortForwardContext() {
    const routerIp = document.getElementById("pfRouterIp").value.trim();
    const internalIp = document.getElementById("pfInternalIp").value.trim();
    const externalPort = document.getElementById("pfExternalPort").value.trim();
    const internalPort = document.getElementById("pfInternalPort").value.trim();
    const protocol = document.getElementById("pfProtocol").value.trim();
    const hairpin = hairpinToggleEl.checked;
    const hairpinLan = document.getElementById("hairpinLan").value.trim();

    if (!validateIp(routerIp) || !validateIp(internalIp)) {
        return null;
    }

    if (!validatePort(externalPort) || !validatePort(internalPort)) {
        return null;
    }

    if (hairpin && hairpinLan && !validateIpNetwork(hairpinLan)) {
        return null;
    }

    return {
        routerIp,
        internalIp,
        externalPort,
        internalPort,
        protocol,
        options: {
            hairpin,
            hairpinLan
        }
    };
}

function refreshVisibleOutputs() {
    const natOutput = document.getElementById("natOutput");
    const dnsOutput = document.getElementById("dnsOutput");
    const portOutput = document.getElementById("portforwardOutput");

    if (natOutput.style.display !== "none") {
        const localNetwork = document.getElementById("localNetwork").value.trim();
        const routerIp = document.getElementById("routerIp").value.trim();

        if (validateIpNetwork(localNetwork) && validateIp(routerIp)) {
            displayOutput("nat", generateNatCommands(localNetwork, routerIp));
        }
    }

    if (dnsOutput.style.display !== "none") {
        const dnsContext = getDnsContext();

        if (dnsContext) {
            displayOutput("dns", generateDnsCommands(dnsContext.dnsServers, dnsContext.options));
        }
    }

    if (portOutput.style.display !== "none") {
        const portContext = getPortForwardContext();

        if (portContext) {
            displayOutput(
                "portforward",
                generatePortForwardCommands(
                    portContext.routerIp,
                    portContext.internalIp,
                    portContext.externalPort,
                    portContext.internalPort,
                    portContext.protocol,
                    portContext.options
                )
            );
        }
    }
}

window.addEventListener("languagechange", refreshVisibleOutputs);

initializeSharedSite();
siteI18n.init();
syncToggleGroups();

document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
        activateTab(button.dataset.tab);
    });
});

if (redirectToggle) {
    redirectToggle.addEventListener("change", () => {
        redirectSettings.style.display = redirectToggle.checked ? "block" : "none";
    });
}

if (filterToggle) {
    filterToggle.addEventListener("change", () => {
        filterSettings.style.display = filterToggle.checked ? "block" : "none";
    });
}

if (hairpinToggleEl) {
    hairpinToggleEl.addEventListener("change", () => {
        hairpinLanGroup.style.display = hairpinToggleEl.checked ? "block" : "none";
    });
}

if (loadExampleBtn) {
    loadExampleBtn.addEventListener("click", () => {
        const activeTab = document.querySelector(".tab-btn.active")?.dataset.tab || "nat";
        applyExample(activeTab);
        refreshVisibleOutputs();
    });
}

document.getElementById("natForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const localNetwork = document.getElementById("localNetwork").value.trim();
    const routerIp = document.getElementById("routerIp").value.trim();

    if (!validateIpNetwork(localNetwork)) {
        alert(translate("mikrotik.alerts.invalidLocalNetwork"));
        return;
    }

    if (!validateIp(routerIp)) {
        alert(translate("mikrotik.alerts.invalidRouterIp"));
        return;
    }

    const commands = generateNatCommands(localNetwork, routerIp);
    displayOutput("nat", commands);
    maybeDownloadScript("nat", commands);
});

document.getElementById("dnsForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const primaryDns = document.querySelectorAll(".primary-dns:checked");
    const customDns = document.getElementById("dnsCustom").value.trim();
    const redirectRouterIp = document.getElementById("redirectRouterIp").value.trim();
    const redirectLocalSubnet = document.getElementById("redirectLocalSubnet").value.trim();
    const filterWan = document.getElementById("filterWanInterface").value.trim();

    if (primaryDns.length === 0) {
        alert(translate("mikrotik.alerts.choosePrimaryDns"));
        return;
    }

    if (customDns && !validateIp(customDns)) {
        alert(translate("mikrotik.alerts.invalidCustomDns"));
        return;
    }

    if (redirectToggle.checked && !validateIp(redirectRouterIp)) {
        alert(translate("mikrotik.alerts.invalidRedirectRouterIp"));
        return;
    }

    if (redirectToggle.checked && !validateIpNetwork(redirectLocalSubnet)) {
        alert(translate("mikrotik.alerts.invalidRedirectSubnet"));
        return;
    }

    if (!filterToggle.checked) {
        alert(translate("mikrotik.alerts.dnsProtectionRequired"));
        return;
    }

    if (!filterWan) {
        alert(translate("mikrotik.alerts.missingWanList"));
        return;
    }

    const dnsContext = getDnsContext();
    const commands = generateDnsCommands(dnsContext.dnsServers, dnsContext.options);
    displayOutput("dns", commands);
    maybeDownloadScript("dns", commands);
});

document.getElementById("portforwardForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const routerIp = document.getElementById("pfRouterIp").value.trim();
    const internalIp = document.getElementById("pfInternalIp").value.trim();
    const externalPort = document.getElementById("pfExternalPort").value.trim();
    const internalPort = document.getElementById("pfInternalPort").value.trim();
    const hairpinLan = document.getElementById("hairpinLan").value.trim();

    if (!validateIp(routerIp)) {
        alert(translate("mikrotik.alerts.invalidExternalRouterIp"));
        return;
    }

    if (!validateIp(internalIp)) {
        alert(translate("mikrotik.alerts.invalidInternalIp"));
        return;
    }

    if (!validatePort(externalPort) || !validatePort(internalPort)) {
        alert(translate("mikrotik.alerts.invalidPort"));
        return;
    }

    if (hairpinToggleEl.checked && hairpinLan && !validateIpNetwork(hairpinLan)) {
        alert(translate("mikrotik.alerts.invalidHairpinLan"));
        return;
    }

    const portContext = getPortForwardContext();
    const commands = generatePortForwardCommands(
        portContext.routerIp,
        portContext.internalIp,
        portContext.externalPort,
        portContext.internalPort,
        portContext.protocol,
        portContext.options
    );

    displayOutput("portforward", commands);
    maybeDownloadScript("portforward", commands);
});
