
document.addEventListener("DOMContentLoaded", () => {
    const lojas = {
        amador: {
            nome: "Amador Bueno",
            endereco: "Av. Amador Bueno da Veiga, 4295",
            horario: "Segunda a sexta, das 9h às 18h. Sábado, das 9h às 16h.",
            whatsapp: "5511960945071"
        },
        ermelino: {
            nome: "Ermelino",
            endereco: "Av. Milene Elias, 308",
            horario: "Segunda a sexta, das 9h às 18h. Sábado, das 9h às 16h.",
            whatsapp: "5511977236265"
        },
        ponte: {
            nome: "Ponte Rasa",
            endereco: "Av. São Miguel, 4693",
            horario: "Segunda a sexta, das 9h às 18h. Sábado, das 9h às 16h.",
            whatsapp: "5511954985934"
        }
    };

    const servicos = {
        "Conserto de celulares": {
            descricao: "Assistência técnica para avaliação e reparo de celulares.",
            itens: [
                "Diagnóstico do aparelho",
                "Avaliação do defeito",
                "Orçamento para o reparo"
            ]
        },
        "Venda de iPhones": {
            descricao: "Consulte nossa equipe sobre os iPhones disponíveis.",
            itens: [
                "Consulte os modelos disponíveis",
                "Consulte as condições de pagamento",
                "Confirme a disponibilidade com a unidade"
            ]
        },
        "Troca de tela": {
            descricao: "Avaliação para substituição da tela do aparelho.",
            itens: [
                "Avaliação do dano",
                "Consulta de disponibilidade da peça",
                "Orçamento do serviço"
            ]
        },
        "Acessórios": {
            descricao: "Consulte as opções de acessórios disponíveis nas lojas.",
            itens: [
                "Capas e películas",
                "Carregadores e cabos",
                "Outros acessórios disponíveis"
            ]
        }
    };

    // Cria a janela que exibirá as informações.
    const janela = document.createElement("dialog");
    janela.className = "janela-info";

    janela.innerHTML = `
        <button type="button" class="fechar-janela"
            aria-label="Fechar janela">×</button>
        <div class="conteudo-janela"></div>
    `;

    document.body.appendChild(janela);

    const conteudo = janela.querySelector(".conteudo-janela");

    janela.querySelector(".fechar-janela").addEventListener("click", () => {
        janela.close();
    });

    janela.addEventListener("click", (evento) => {
        if (evento.target === janela) {
            janela.close();
        }
    });

    function abrirJanela(titulo, descricao, itens = [], botoes = "") {
        conteudo.replaceChildren();

        const subtitulo = document.createElement("p");
        subtitulo.className = "subtitulo";
        subtitulo.textContent = "SMART STORY";

        const tituloElemento = document.createElement("h2");
        tituloElemento.textContent = titulo;

        const descricaoElemento = document.createElement("p");
        descricaoElemento.textContent = descricao;

        conteudo.append(subtitulo, tituloElemento, descricaoElemento);

        if (itens.length) {
            const lista = document.createElement("ul");

            itens.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item;
                lista.appendChild(li);
            });

            conteudo.appendChild(lista);
        }

        if (botoes) {
            const areaBotoes = document.createElement("div");
            areaBotoes.className = "acoes-janela";
            areaBotoes.innerHTML = botoes;
            conteudo.appendChild(areaBotoes);
        }

        if (!janela.open) {
            janela.showModal();
        }
    }

    function abrirLoja(chave) {
        const loja = lojas[chave];

        if (!loja) return;

        const enderecoMapa = encodeURIComponent(loja.endereco);

        const linkWhatsApp =
            `https://wa.me/${loja.whatsapp}?text=` +
            encodeURIComponent(
                `Olá! Gostaria de informações sobre a unidade ${loja.nome} da Smart Story.`
            );

        const linkMapa =
            `https://www.google.com/maps/search/?api=1&query=${enderecoMapa}`;

        abrirJanela(
            loja.nome,
            "Informações da unidade",
            [
                `Endereço: ${loja.endereco}`,
                `Horário: ${loja.horario}`
            ],
            `
                <a class="botao" href="${linkWhatsApp}"
                    target="_blank" rel="noopener noreferrer">
                    Falar pelo WhatsApp
                </a>
                <a class="botao botao-mapa" href="${linkMapa}"
                    target="_blank" rel="noopener noreferrer">
                    Como chegar
                </a>
            `
        );
    }

    // Abre as informações da unidade selecionada.
    document.querySelectorAll(".abrir-loja").forEach((botao) => {
        botao.addEventListener("click", () => {
            abrirLoja(botao.dataset.loja);
        });
    });

    // Abre os detalhes dos serviços.
    document.querySelectorAll(".servico").forEach((cartao) => {
        const titulo = cartao.querySelector("h3")?.textContent.trim();

        if (!servicos[titulo]) return;

        cartao.setAttribute("role", "button");
        cartao.setAttribute("tabindex", "0");

        function abrirServico() {
            const dados = servicos[titulo];

            abrirJanela(
                titulo,
                dados.descricao,
                dados.itens,
                `<a class="botao" href="https://www.instagram.com/smart.story_/"
                    target="_blank" rel="noopener noreferrer">
                    Consultar pelo Instagram
                </a>`
            );
        }

        cartao.addEventListener("click", abrirServico);

        cartao.addEventListener("keydown", (evento) => {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                abrirServico();
            }
        });
    });
});
