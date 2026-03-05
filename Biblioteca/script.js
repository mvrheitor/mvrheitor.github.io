const books = [
    { title: "2001: Uma odisséia no espaço", href: "Livros/2001 Odisséia No Espaço.pdf" },
    { title: "O Homem Mais Rico da Babilônia", href: "Livros/O-Homem-Mais-Rico-da-Babilonia-George-S.-Clason.pdf" },
    { title: "O Profeta", href: "Livros/O Profeta.pdf" },
    { title: "O Problema dos Três Corpos", href: "Livros/o-problema-dos-tres-corpos-cixin-liu_compress.pdf" },
    { title: "Ponte para Terabitia", href: "Livros/katherine_paterson_-_ponte_para_terabitia.pdf" },
    { title: "Sapiens: Uma Breve História da Humanidade", href: "Livros/Sapiens Uma Breve História da Humanidade.pdf" },
    { title: "Eterna vigilância: Como montei e desvendei o maior sistema de espionagem do mundo", href: "Livros/Edward Snowden - Eterna vigilância Como montei e desvendei o maior sistema de espionagem  do mundo.pdf" },
    { title: "Como fazer amigos e influenciar pessoas", href: "Livros/Como-Fazer-Amigos-e-Influenciar-Pessoas-Dale-Carnegie.pdf" },
    { title: "As 48 Leis do Poder", href: "Livros/As_48_Leis_do_Poder_completo.pdf" },
    { title: "O Método Bullet Journal", href: "Livros/Ryder Carroll - O Método Bullet Journal_250725_103015.pdf" },
    { title: "Disciplina é Libertade", href: "Livros/disciplina-igual-a-libertad-jocko-willink.pdf" },
    { title: "Nada Pode Me Ferir", href: "Livros/nada-pode-me-ferir-9786555646146_compress.pdf" },
    { title: "A Divina Comédia", href: "Livros/Divina Comédia.pdf" },
    { title: "Meditações", href: "Livros/meditacoes marco aurelio.pdf" },
];

const normalize = (text) =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

const scoreMatch = (query, title) => {
    if (!query) return 0;
    if (title.startsWith(query)) return 2;
    if (title.includes(query)) return 1;
    return 0;
};

const buildResults = (matches, query) => {
    const list = document.createElement("ul");
    list.className = "book-results-list";

    matches.forEach((book, index) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = book.href;
        link.target = "_blank";
        link.rel = "noopener";
        link.className = "book-result";
        link.textContent = book.title;

        if (query && index === 0) {
            const hint = document.createElement("span");
            hint.className = "book-result-hint";
            hint.textContent = "Pressione Enter para abrir o primeiro resultado.";
            item.appendChild(link);
            item.appendChild(hint);
        } else {
            item.appendChild(link);
        }

        list.appendChild(item);
    });

    return list;
};

const renderResults = (container, matches, query) => {
    container.innerHTML = "";
    if (!matches.length) {
        return;
    }
    container.appendChild(buildResults(matches, query));
};

const ensureResultsContainer = (input) => {
    let container = document.getElementById("book-results");
    if (container) {
        return container;
    }

    container = document.createElement("div");
    container.id = "book-results";
    container.className = "book-results";
    container.setAttribute("aria-live", "polite");

    const form = input.closest("form");
    if (form && form.parentElement) {
        form.parentElement.insertAdjacentElement("afterend", container);
    } else {
        document.body.appendChild(container);
    }

    return container;
};

const setupSearch = () => {
    const input = document.querySelector('input[type="text"][name="Input"].framer-form-input');
    if (!input) {
        return;
    }

    if (input.dataset.searchBound === "true") {
        return;
    }

    input.id = "book-search";
    input.autocomplete = "off";
    input.dataset.searchBound = "true";

    const resultsContainer = ensureResultsContainer(input);

    const updateResults = () => {
        const query = normalize(input.value.trim());
        if (!query) {
            renderResults(resultsContainer, [], "");
            return;
        }

        const matches = books
            .map((book) => ({
                ...book,
                score: scoreMatch(query, normalize(book.title)),
            }))
            .filter((book) => book.score > 0)
            .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
            .slice(0, 8);

        renderResults(resultsContainer, matches, query);
    };

    input.addEventListener("input", updateResults);
    input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") {
            return;
        }
        event.preventDefault();

        const query = normalize(input.value.trim());
        const match = books
            .map((book) => ({
                ...book,
                score: scoreMatch(query, normalize(book.title)),
            }))
            .filter((book) => book.score > 0)
            .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))[0];

        if (match) {
            window.open(match.href, "_blank", "noopener");
        }
    });

    const focusInput = () => {
        input.focus();
        input.select();
    };

    requestAnimationFrame(focusInput);
    setTimeout(focusInput, 350);
};

document.addEventListener("DOMContentLoaded", setupSearch);

const observer = new MutationObserver(() => {
    setupSearch();
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
});

window.addEventListener("load", setupSearch);
