const siteI18n = (() => {
    const translations = {
        ru: {
            common: {
                navigationLabel: "Основная навигация",
                languageSwitcherLabel: "Переключение языка",
                nav: {
                    home: "Главная",
                    expertise: "Экспертиза",
                    projects: "Проекты",
                    tools: "Инструменты",
                    generator: "Генератор"
                },
                github: "GitHub",
                buttons: {
                    loadExample: "Загрузить пример",
                    generateNat: "Сгенерировать NAT",
                    generateDns: "Сгенерировать DNS",
                    generatePortForward: "Сгенерировать проброс порта",
                    copy: "Копировать в буфер",
                    copied: "Скопировано"
                },
                footer: {
                    home: "инфраструктура, сети, автоматизация",
                    mikrotik: "генератор MikroTik"
                }
            },
            home: {
                meta: {
                    title: "DmiRials | Системный администратор и инфраструктурный инженер",
                    description: "Персональный сайт Dmitriy: инфраструктура, автоматизация, MikroTik, Linux и практичные сетевые инструменты."
                },
                hero: {
                    kicker: "Инфраструктура • Linux • Сети • Автоматизация",
                    title: "Собираю и автоматизирую инфраструктуру без лишней сложности",
                    lead: "Я системный администратор и инфраструктурный инженер. Работаю с Linux, сетями, мониторингом и MikroTik. Этот сайт использую как портфолио и площадку для практичных инструментов.",
                    primaryAction: "Открыть инструмент MikroTik",
                    secondaryAction: "Посмотреть проекты"
                },
                terminal: {
                    panelLabel: "Краткий профиль",
                    whoami: "whoami",
                    whoamiAnswer: "Dmitriy / Sysadmin / Infra Dev",
                    stack: "stack --current",
                    stackItems: {
                        servers: "Linux-серверы",
                        mikrotik: "MikroTik и RouterOS",
                        automation: "Bash, PowerShell, автоматизация",
                        monitoring: "Мониторинг и диагностика сети"
                    },
                    focus: "focus --now",
                    focusAnswer: "Делать полезные, понятные и поддерживаемые инструменты для реальной инфраструктуры."
                },
                expertise: {
                    title: "Чем я занимаюсь",
                    items: {
                        network: {
                            title: "Сетевые сценарии",
                            text: "Настройка MikroTik, сегментация, NAT, DNS, port forwarding, диагностика и приведение конфигураций к предсказуемому виду."
                        },
                        infrastructure: {
                            title: "Инфраструктура и сервисы",
                            text: "Поднимаю серверы и внутренние сервисы на Linux, собираю self-hosted окружения и поддерживаю их в рабочем состоянии."
                        },
                        automation: {
                            title: "Автоматизация",
                            text: "Пишу небольшие утилиты и генераторы, которые экономят время и снижают количество ручных ошибок при настройке."
                        }
                    }
                },
                projects: {
                    title: "Избранные проекты",
                    featured: {
                        eyebrow: "Ключевой инструмент",
                        title: "MikroTik Script Generator",
                        text: "Генератор конфигураций для NAT, DNS и port forwarding с валидацией, загрузкой .rsc и подсказками по применению.",
                        points: {
                            nat: "NAT и masquerade",
                            dns: "DNS с redirect и фильтрацией",
                            portForward: "Port forwarding и hairpin NAT"
                        },
                        link: "Открыть инструмент"
                    },
                    ops: {
                        eyebrow: "Эксплуатация",
                        title: "Мониторинг и диагностика",
                        text: "Практика диагностики сетевых и серверных проблем: от DNS и firewall до доступности сервисов и маршрутизации."
                    }
                },
                tools: {
                    title: "Полезные инструменты и технологии"
                },
                toolCards: {
                    generator: {
                        tag: "RouterOS",
                        title: "Генератор MikroTik",
                        text: "Быстрая генерация конфигураций RouterOS для NAT, DNS и port forwarding.",
                        link: "Открыть"
                    },
                    rustdesk: {
                        tag: "Удалённый доступ",
                        title: "RustDesk",
                        text: "Self-hosted remote desktop для удалённого доступа и внутренней технической поддержки.",
                        link: "Сайт проекта"
                    },
                    selfHosted: {
                        tag: "Инфраструктура",
                        title: "Self-Hosted Stack",
                        text: "Подход к инфраструктуре, где важны контроль, воспроизводимость и понятная эксплуатация.",
                        link: "GitHub"
                    }
                }
            },
            mikrotik: {
                meta: {
                    title: "MikroTik Script Generator | DmiRials",
                    description: "Генератор конфигураций MikroTik для NAT, DNS и port forwarding."
                },
                hero: {
                    kicker: "Инструмент RouterOS",
                    title: "MikroTik Script Generator",
                    lead: "Инструмент для быстрой генерации базовых команд RouterOS: NAT, DNS и port forwarding с проверкой параметров и выгрузкой в .rsc."
                },
                checklist: {
                    title: "Перед применением проверь",
                    items: {
                        addressing: "IP-адреса и подсети соответствуют твоей сети",
                        wan: "WAN interface list указан корректно",
                        dst: "dst-address соответствует внешней схеме доступа",
                        hairpin: "Hairpin NAT нужен только если сервис открывается из LAN по внешнему адресу"
                    }
                },
                summary: {
                    nat: {
                        title: "NAT",
                        text: "Генерирует базовое masquerade-правило для локальной подсети с быстрым выводом команд для RouterOS."
                    },
                    dns: {
                        title: "DNS",
                        text: "Собирает конфигурацию DNS, умеет включать redirect запросов с LAN и блокировку запросов с WAN."
                    },
                    portForward: {
                        title: "Проброс порта",
                        text: "Формирует правила dstnat и при необходимости добавляет hairpin NAT для внутренних клиентов."
                    }
                },
                generator: {
                    title: "Генератор конфигураций",
                    subtitle: "Выбери сценарий, заполни параметры и сразу получи готовые команды для RouterOS.",
                    tabListLabel: "Тип конфигурации"
                },
                tabs: {
                    nat: "NAT",
                    dns: "DNS",
                    portForward: "Проброс порта"
                },
                common: {
                    downloadRsc: "Сразу скачать как <code>.rsc</code>"
                },
                placeholders: {
                    localNetwork: "192.168.88.0/24",
                    routerIp: "192.168.88.1",
                    internalIp: "192.168.88.10",
                    customDns: "208.67.222.123",
                    wanList: "WAN"
                },
                nat: {
                    title: "Базовый masquerade для локальной сети",
                    text: "Подходит для стандартного сценария, когда роутер выпускает локальную подсеть в интернет через srcnat.",
                    localNetworkLabel: "Локальная сеть",
                    localNetworkHint: "Используй CIDR-нотацию, например <code>192.168.88.0/24</code>.",
                    routerIpLabel: "IP роутера",
                    routerIpHint: "Используется как ориентир для схемы и комментариев."
                },
                dns: {
                    title: "DNS для локальной сети и контроля входящих запросов",
                    text: "Можно собрать список резолверов, настроить redirect клиентских запросов на роутер и закрыть входящие DNS-запросы с WAN.",
                    serverSelectionLabel: "Выбери DNS-серверы",
                    primaryLabel: "Основной DNS",
                    secondaryLabel: "Дополнительный DNS",
                    customDnsLabel: "Пользовательский DNS",
                    ttlLabel: "TTL кэша",
                    ttlDay: "1 день",
                    ttlWeek: "1 неделя",
                    redirectToggle: "Перенаправлять все DNS-запросы клиентов на роутер",
                    redirectRouterLabel: "IP роутера для redirect",
                    redirectSubnetLabel: "Локальная подсеть",
                    filterToggle: "Блокировать DNS-запросы из интернета",
                    filterHint: "Оставляй эту защиту включённой, иначе роутер может стать доступным DNS-резолвером из интернета.",
                    filterWanLabel: "WAN interface list"
                },
                portForward: {
                    title: "Публикация сервиса из локальной сети",
                    text: "Создаёт dstnat для указанного сервиса и при необходимости добавляет hairpin NAT, если доступ нужен из LAN по внешнему адресу.",
                    routerIpLabel: "Внешний IP роутера",
                    internalIpLabel: "Внутренний IP сервиса",
                    externalPortLabel: "Внешний порт",
                    internalPortLabel: "Внутренний порт",
                    protocolLabel: "Протокол",
                    hairpinToggle: "Добавить hairpin NAT",
                    hairpinLanLabel: "LAN-подсеть для hairpin",
                    hairpinLanHint: "Если поле пустое, будет сгенерировано более общее правило masquerade."
                },
                output: {
                    title: "Сгенерированные команды",
                    natInfo: "Проверь параметры и вставь команды в терминал MikroTik.",
                    dnsInfo: "Проверь список резолверов и параметры redirect перед применением.",
                    portForwardInfo: "Сначала проверь IP, порт и необходимость hairpin NAT."
                },
                alerts: {
                    invalidLocalNetwork: "Неверный формат локальной сети. Используй CIDR, например 192.168.88.0/24.",
                    invalidRouterIp: "Неверный IP-адрес роутера.",
                    choosePrimaryDns: "Выбери хотя бы один основной DNS-сервер.",
                    invalidCustomDns: "Неверный IP-адрес пользовательского DNS.",
                    invalidRedirectRouterIp: "Неверный IP роутера для DNS redirect.",
                    invalidRedirectSubnet: "Неверный формат локальной подсети для DNS redirect.",
                    dnsProtectionRequired: "Для безопасной генерации DNS-конфигурации защита от запросов с WAN должна оставаться включённой.",
                    missingWanList: "Укажи WAN interface list для входящих DNS-запросов.",
                    invalidExternalRouterIp: "Неверный внешний IP роутера.",
                    invalidInternalIp: "Неверный внутренний IP сервиса.",
                    invalidPort: "Неверный порт. Используй значения от 1 до 65535.",
                    invalidHairpinLan: "Неверный формат LAN-подсети для hairpin NAT."
                },
                commands: {
                    generatedBy: "Сгенерировано DmiRials",
                    nat: {
                        title: "Конфигурация NAT MikroTik",
                        routerIp: "IP роутера",
                        masqueradeComment: "Masquerade локальной сети",
                        verify: "Проверка"
                    },
                    dns: {
                        title: "Конфигурация DNS MikroTik",
                        optionalReset: "Опциональный сброс кэша",
                        verify: "Проверка",
                        redirectSection: "Redirect всех DNS-запросов клиентов на роутер",
                        redirectComment: "DNS redirect to router",
                        filterSection: "Блокировка DNS-запросов с WAN",
                        filterComment: "Block DNS from WAN"
                    },
                    portForward: {
                        title: "Конфигурация Port Forward MikroTik",
                        hairpinSection: "Hairpin NAT для внутренних клиентов",
                        hairpinComment: "Hairpin NAT",
                        ruleCommentPrefix: "Port forward",
                        verify: "Проверка"
                    }
                }
            }
        },
        en: {
            common: {
                navigationLabel: "Main navigation",
                languageSwitcherLabel: "Language switcher",
                nav: {
                    home: "Home",
                    expertise: "Expertise",
                    projects: "Projects",
                    tools: "Tools",
                    generator: "Generator"
                },
                github: "GitHub",
                buttons: {
                    loadExample: "Load example",
                    generateNat: "Generate NAT",
                    generateDns: "Generate DNS",
                    generatePortForward: "Generate Port Forward",
                    copy: "Copy to clipboard",
                    copied: "Copied"
                },
                footer: {
                    home: "Infrastructure, Networking, Automation",
                    mikrotik: "MikroTik Generator"
                }
            },
            home: {
                meta: {
                    title: "DmiRials | Systems Administrator and Infrastructure Engineer",
                    description: "Personal site of Dmitriy: infrastructure, automation, MikroTik, Linux, and practical network tools."
                },
                hero: {
                    kicker: "Infrastructure • Linux • Networking • Automation",
                    title: "I build and automate infrastructure without unnecessary complexity",
                    lead: "I am a systems administrator and infrastructure engineer. I work with Linux, networking, monitoring, and MikroTik. This site is my portfolio and a place for practical tools.",
                    primaryAction: "Open MikroTik Tool",
                    secondaryAction: "View projects"
                },
                terminal: {
                    panelLabel: "Profile summary",
                    whoami: "whoami",
                    whoamiAnswer: "Dmitriy / Sysadmin / Infra Dev",
                    stack: "stack --current",
                    stackItems: {
                        servers: "Linux servers",
                        mikrotik: "MikroTik and RouterOS",
                        automation: "Bash, PowerShell, automation",
                        monitoring: "Monitoring and network troubleshooting"
                    },
                    focus: "focus --now",
                    focusAnswer: "Build practical, readable, and maintainable tools for real infrastructure."
                },
                expertise: {
                    title: "What I work on",
                    items: {
                        network: {
                            title: "Network scenarios",
                            text: "MikroTik setup, segmentation, NAT, DNS, port forwarding, diagnostics, and bringing configurations to a predictable state."
                        },
                        infrastructure: {
                            title: "Infrastructure and services",
                            text: "I deploy Linux servers and internal services, assemble self-hosted environments, and keep them stable in production."
                        },
                        automation: {
                            title: "Automation",
                            text: "I build small utilities and generators that save time and reduce manual errors during configuration work."
                        }
                    }
                },
                projects: {
                    title: "Selected projects",
                    featured: {
                        eyebrow: "Featured tool",
                        title: "MikroTik Script Generator",
                        text: "Configuration generator for NAT, DNS, and port forwarding with validation, .rsc download support, and practical usage hints.",
                        points: {
                            nat: "NAT and masquerade",
                            dns: "DNS with redirect and filtering",
                            portForward: "Port forwarding and hairpin NAT"
                        },
                        link: "Open tool"
                    },
                    ops: {
                        eyebrow: "Operations",
                        title: "Monitoring and Troubleshooting",
                        text: "Hands-on diagnostics for network and server issues, from DNS and firewall to service availability and routing."
                    }
                },
                tools: {
                    title: "Useful tools and technologies"
                },
                toolCards: {
                    generator: {
                        tag: "RouterOS",
                        title: "MikroTik Generator",
                        text: "Fast RouterOS configuration generation for NAT, DNS, and port forwarding.",
                        link: "Open"
                    },
                    rustdesk: {
                        tag: "Remote Access",
                        title: "RustDesk",
                        text: "Self-hosted remote desktop for remote access and internal technical support.",
                        link: "Project site"
                    },
                    selfHosted: {
                        tag: "Infrastructure",
                        title: "Self-Hosted Stack",
                        text: "An infrastructure approach built around control, reproducibility, and straightforward operations.",
                        link: "GitHub"
                    }
                }
            },
            mikrotik: {
                meta: {
                    title: "MikroTik Script Generator | DmiRials",
                    description: "MikroTik configuration generator for NAT, DNS, and port forwarding."
                },
                hero: {
                    kicker: "RouterOS tool",
                    title: "MikroTik Script Generator",
                    lead: "A tool for generating baseline RouterOS commands for NAT, DNS, and port forwarding with parameter checks and .rsc export."
                },
                checklist: {
                    title: "Check before applying",
                    items: {
                        addressing: "IP addresses and subnets match your actual network",
                        wan: "WAN interface list is specified correctly",
                        dst: "dst-address matches the external access model",
                        hairpin: "Hairpin NAT is only required when LAN clients access a service by its external address"
                    }
                },
                summary: {
                    nat: {
                        title: "NAT",
                        text: "Generates a baseline masquerade rule for the local subnet with direct RouterOS command output."
                    },
                    dns: {
                        title: "DNS",
                        text: "Builds DNS configuration, supports LAN client redirect, and can block DNS requests from WAN."
                    },
                    portForward: {
                        title: "Port Forward",
                        text: "Builds dstnat rules and optionally adds hairpin NAT for internal clients."
                    }
                },
                generator: {
                    title: "Configuration generator",
                    subtitle: "Choose a scenario, fill in parameters, and get ready-to-use RouterOS commands immediately.",
                    tabListLabel: "Configuration type"
                },
                tabs: {
                    nat: "NAT",
                    dns: "DNS",
                    portForward: "Port Forward"
                },
                common: {
                    downloadRsc: "Download immediately as <code>.rsc</code>"
                },
                placeholders: {
                    localNetwork: "192.168.88.0/24",
                    routerIp: "192.168.88.1",
                    internalIp: "192.168.88.10",
                    customDns: "208.67.222.123",
                    wanList: "WAN"
                },
                nat: {
                    title: "Baseline masquerade for the local network",
                    text: "Fits a standard scenario where the router sends the local subnet to the internet through srcnat.",
                    localNetworkLabel: "Local network",
                    localNetworkHint: "Use CIDR notation, for example <code>192.168.88.0/24</code>.",
                    routerIpLabel: "Router IP",
                    routerIpHint: "Used as a reference for the topology and generated comments."
                },
                dns: {
                    title: "DNS for the local network and inbound request control",
                    text: "You can build a resolver list, redirect client DNS traffic to the router, and block inbound DNS requests from WAN.",
                    serverSelectionLabel: "Select DNS servers",
                    primaryLabel: "Primary DNS",
                    secondaryLabel: "Secondary DNS",
                    customDnsLabel: "Custom DNS",
                    ttlLabel: "Cache TTL",
                    ttlDay: "1 day",
                    ttlWeek: "1 week",
                    redirectToggle: "Redirect all client DNS requests to the router",
                    redirectRouterLabel: "Router IP for redirect",
                    redirectSubnetLabel: "Local subnet",
                    filterToggle: "Block DNS requests from the internet",
                    filterHint: "Keep this protection enabled, otherwise the router can become an open DNS resolver from the internet.",
                    filterWanLabel: "WAN interface list"
                },
                portForward: {
                    title: "Publish a service from the local network",
                    text: "Creates dstnat for the selected service and optionally adds hairpin NAT when LAN access by external address is required.",
                    routerIpLabel: "External router IP",
                    internalIpLabel: "Internal service IP",
                    externalPortLabel: "External port",
                    internalPortLabel: "Internal port",
                    protocolLabel: "Protocol",
                    hairpinToggle: "Add hairpin NAT",
                    hairpinLanLabel: "LAN subnet for hairpin",
                    hairpinLanHint: "If left empty, a broader masquerade rule will be generated."
                },
                output: {
                    title: "Generated commands",
                    natInfo: "Review parameters and paste the commands into the MikroTik terminal.",
                    dnsInfo: "Review resolvers and redirect parameters before applying the configuration.",
                    portForwardInfo: "Verify IP, port, and whether hairpin NAT is actually required."
                },
                alerts: {
                    invalidLocalNetwork: "Invalid local network format. Use CIDR notation, for example 192.168.88.0/24.",
                    invalidRouterIp: "Invalid router IP address.",
                    choosePrimaryDns: "Select at least one primary DNS server.",
                    invalidCustomDns: "Invalid custom DNS IP address.",
                    invalidRedirectRouterIp: "Invalid router IP for DNS redirect.",
                    invalidRedirectSubnet: "Invalid local subnet format for DNS redirect.",
                    dnsProtectionRequired: "For safe DNS generation, WAN-side DNS protection must remain enabled.",
                    missingWanList: "Specify the WAN interface list for inbound DNS filtering.",
                    invalidExternalRouterIp: "Invalid external router IP.",
                    invalidInternalIp: "Invalid internal service IP.",
                    invalidPort: "Invalid port. Use values from 1 to 65535.",
                    invalidHairpinLan: "Invalid LAN subnet format for hairpin NAT."
                },
                commands: {
                    generatedBy: "Generated by DmiRials",
                    nat: {
                        title: "MikroTik NAT Configuration",
                        routerIp: "Router IP",
                        masqueradeComment: "Masquerade local network",
                        verify: "Verify"
                    },
                    dns: {
                        title: "MikroTik DNS Configuration",
                        optionalReset: "Optional cache reset",
                        verify: "Verify",
                        redirectSection: "Redirect all client DNS requests to the router",
                        redirectComment: "DNS redirect to router",
                        filterSection: "Block DNS requests from WAN",
                        filterComment: "Block DNS from WAN"
                    },
                    portForward: {
                        title: "MikroTik Port Forward Configuration",
                        hairpinSection: "Hairpin NAT for internal clients",
                        hairpinComment: "Hairpin NAT",
                        ruleCommentPrefix: "Port forward",
                        verify: "Verify"
                    }
                }
            }
        }
    };

    let currentLanguage = "ru";
    let isInitialized = false;

    function resolve(path, source) {
        return path.split(".").reduce((accumulator, part) => accumulator && accumulator[part], source);
    }

    function t(path) {
        return resolve(path, translations[currentLanguage]) || resolve(path, translations.ru) || path;
    }

    function updateMetadata() {
        const titleKey = document.body.getAttribute("data-i18n-page-title");
        const descriptionKey = document.body.getAttribute("data-i18n-page-description");
        const descriptionNode = document.getElementById("pageDescription");
        const ogTitleNode = document.getElementById("ogTitle");
        const ogDescriptionNode = document.getElementById("ogDescription");
        const twitterTitleNode = document.getElementById("twitterTitle");
        const twitterDescriptionNode = document.getElementById("twitterDescription");
        const ogLocaleNode = document.getElementById("ogLocale");
        const localizedTitle = titleKey ? t(titleKey) : document.title;
        const localizedDescription = descriptionKey ? t(descriptionKey) : null;

        function setMetaContent(node, value) {
            if (node && value) {
                node.setAttribute("content", value);
            }
        }

        if (titleKey) {
            document.title = localizedTitle;
        }

        setMetaContent(descriptionNode, localizedDescription);
        setMetaContent(ogTitleNode, localizedTitle);
        setMetaContent(twitterTitleNode, localizedTitle);
        setMetaContent(ogDescriptionNode, localizedDescription);
        setMetaContent(twitterDescriptionNode, localizedDescription);

        if (ogLocaleNode) {
            ogLocaleNode.setAttribute("content", currentLanguage === "en" ? "en_US" : "ru_RU");
        }

        document.documentElement.lang = currentLanguage;
    }

    function updateElements() {
        document.querySelectorAll("[data-i18n]").forEach((node) => {
            node.textContent = t(node.getAttribute("data-i18n"));
        });

        document.querySelectorAll("[data-i18n-html]").forEach((node) => {
            node.innerHTML = t(node.getAttribute("data-i18n-html"));
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
            node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
        });

        document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
            node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria-label")));
        });
    }

    function updateLanguageButtons() {
        document.querySelectorAll(".lang-btn").forEach((button) => {
            const isActive = button.dataset.lang === currentLanguage;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    function persistLanguage(language) {
        try {
            window.localStorage.setItem("siteLanguage", language);
        } catch (error) {
            void error;
        }
    }

    function readStoredLanguage() {
        try {
            return window.localStorage.getItem("siteLanguage");
        } catch (error) {
            return null;
        }
    }

    function setLanguage(language, shouldPersist = true) {
        currentLanguage = translations[language] ? language : "ru";

        if (shouldPersist) {
            persistLanguage(currentLanguage);
        }

        updateMetadata();
        updateElements();
        updateLanguageButtons();
        window.dispatchEvent(new CustomEvent("languagechange", { detail: { language: currentLanguage } }));
    }

    function bindLanguageButtons() {
        document.querySelectorAll(".lang-btn").forEach((button) => {
            button.addEventListener("click", () => {
                setLanguage(button.dataset.lang);
            });
        });
    }

    function init() {
        if (!isInitialized) {
            bindLanguageButtons();
            isInitialized = true;
        }

        setLanguage(readStoredLanguage() || "ru", false);
    }

    return {
        init,
        setLanguage,
        getLanguage: () => currentLanguage,
        t
    };
})();

window.siteI18n = siteI18n;
