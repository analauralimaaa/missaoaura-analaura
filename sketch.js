const perfis = [
    {
        id: 1,
        chave: "vida",
        nome: "Guardiã da Biosfera",
        categoria: "Vida & Preservação",
        descricao: "Você enxerga possibilidades onde outras pessoas veem apenas o desconhecido. Empática, observadora e cuidadosa, acredita que explorar também significa proteger.",
        imagem: "perfil-1.jpg",
        svgBackup: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23120f29'/><circle cx='200' cy='160' r='60' fill='%2372f1f5' opacity='0.8'/><path d='M100 360 C100 240, 300 240, 300 360' fill='%23c6a0ff' opacity='0.7'/><circle cx='200' cy='200' r='120' stroke='%2372f1f5' stroke-width='2' fill='none' stroke-dasharray='6,6'/></svg>",
        recomendacao: "Liderar o reconhecimento biológico do planeta, identificar ecossistemas e proteger espécies ainda não catalogadas."
    },
    {
        id: 2,
        chave: "descoberta",
        nome: "Cartógrafa Cósmica",
        categoria: "Descoberta & Navegação",
        descricao: "Sua curiosidade não conhece fronteiras. Você conecta pistas, percebe padrões e transforma territórios desconhecidos em caminhos possíveis.",
        imagem: "perfil-2.jpg",
        svgBackup: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23101026'/><circle cx='200' cy='160' r='60' fill='%23c6a0ff' opacity='0.8'/><path d='M110 360 C110 240, 290 240, 290 360' fill='%2372f1f5' opacity='0.7'/><polygon points='200,60 220,100 180,100' fill='%2372f1f5'/></svg>",
        recomendacao: "Mapear regiões inexploradas, interpretar sinais espaciais e definir rotas seguras para a equipe."
    },
    {
        id: 3,
        chave: "conexao",
        nome: "Diplomata Estelar",
        categoria: "Conexão & Comunicação",
        descricao: "Você sabe ouvir, compreender perspectivas diferentes e criar pontes. Sua maior força é encontrar entendimento mesmo quando tudo parece estranho.",
        imagem: "perfil-3.jpg",
        svgBackup: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%2317132e'/><circle cx='200' cy='160' r='60' fill='%23f4f0ff' opacity='0.8'/><path d='M100 360 C100 250, 300 250, 300 360' fill='%2372f1f5' opacity='0.5'/><circle cx='200' cy='160' r='85' stroke='%23c6a0ff' stroke-width='2' fill='none'/></svg>",
        recomendacao: "Estabelecer o primeiro contato com possíveis civilizações e desenvolver formas de comunicação pacífica."
    },
    {
        id: 4,
        chave: "tecnologia",
        nome: "Arquiteta de Portais",
        categoria: "Tecnologia & Criação",
        descricao: "Você questiona os limites do possível. Criativa e determinada, transforma ideias complexas em estruturas capazes de mudar o futuro.",
        imagem: "perfil-4.jpg",
        svgBackup: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%230f1428'/><circle cx='200' cy='160' r='60' fill='%2372f1f5' opacity='0.9'/><path d='M120 360 C120 230, 280 230, 280 360' fill='%23c6a0ff' opacity='0.8'/><rect x='150' y='110' width='100' height='100' stroke='%2372f1f5' stroke-width='2' fill='none' transform='rotate(45 200 160)'/></svg>",
        recomendacao: "Desenvolver tecnologias de exploração, construir sistemas de acesso e solucionar falhas nos equipamentos da missão."
    }
];

const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const campoNascimento = document.getElementById("nascimento");
const btnRefazer = document.getElementById("refazer");

function dataLocalHoje() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

campoNascimento.max = dataLocalHoje();

function calcularIdade(dataString) {
    const [ano, mes, dia] = dataString.split("-").map(Number);
    const hoje = new Date();

    let idade = hoje.getFullYear() - ano;

    const aniversarioAindaNaoChegou =
        hoje.getMonth() + 1 < mes ||
        (hoje.getMonth() + 1 === mes && hoje.getDate() < dia);

    if (aniversarioAindaNaoChegou) {
        idade--;
    }

    return idade;
}

function mostrarPerfil(perfil, nome, idade, empatado) {
    document.getElementById("saudacao").textContent =
        `${nome} · ${idade} anos`;

    document.getElementById("codigoPerfil").textContent =
        `PERFIL 0${perfil.id} / ${empatado ? "PERFIL HÍBRIDO" : "IDENTIDADE CONFIRMADA"}`;

    document.getElementById("nomePerfil").textContent = perfil.nome;
    document.getElementById("categoria").textContent = perfil.categoria;
    document.getElementById("descricao").textContent = perfil.descricao;
    document.getElementById("recomendacao").textContent = perfil.recomendacao;

    const imagem = document.getElementById("imagemPerfil");
    imagem.src = perfil.imagem;
    imagem.alt = `Ilustração da personagem ${perfil.nome}`;

    imagem.onerror = function() {
        this.src = perfil.svgBackup;
    };

    resultado.hidden = false;
    resultado.scrollIntoView({ behavior: "smooth", block: "start" });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const data = campoNascimento.value;

    if (!nome || !data) {
        alert("Preencha seu nome e sua data de nascimento.");
        return;
    }

    if (data > dataLocalHoje()) {
        alert("A data de nascimento não pode estar no futuro.");
        return;
    }

    const partes = data.split("-").map(Number);
    const dataTestada = new Date(partes[0], partes[1] - 1, partes[2]);

    if (
        partes.length !== 3 ||
        dataTestada.getFullYear() !== partes[0] ||
        dataTestada.getMonth() !== partes[1] - 1 ||
        dataTestada.getDate() !== partes[2]
    ) {
        alert("Insira uma data válida.");
        return;
    }

    const contagem = { vida: 0, descoberta: 0, conexao: 0, tecnologia: 0 };
    const perguntas = ["p1", "p2", "p3", "p4"];

    for (let p of perguntas) {
        const selecionado = formulario.querySelector(`input[name="${p}"]:checked`);
        if (selecionado) {
            contagem[selecionado.value]++;
        }
    }

    let maiorPontuacao = -1;
    let chaveVencedora = "";
    let empatado = false;

    for (let chave in contagem) {
        if (contagem[chave] > maiorPontuacao) {
            maiorPontuacao = contagem[chave];
            chaveVencedora = chave;
            empatado = false;
        } else if (contagem[chave] === maiorPontuacao) {
            empatado = true;
        }
    }

    const perfilResultado = perfis.find(p => p.chave === chaveVencedora) || perfis[0];
    const idade = calcularIdade(data);

    mostrarPerfil(perfilResultado, nome, idade, empatado);
});

btnRefazer.addEventListener("click", function() {
    formulario.reset();
    resultado.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
});
