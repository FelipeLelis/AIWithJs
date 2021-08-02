let entradas = [];
let classes =  [];

// elimina os elementos duplicados
function eliminaDuplicados(arr=[]) {
    arr = [...new Set(arr)];
    return arr;
}

// retorna as classes existentes
function retornaClasses() {
    let arr = classes;
    arr = eliminaDuplicados(arr);
    return arr;
}

// conta a quantidade de palavras repetidas em um texto
function contaTexto(texto='', procura='') {
    return texto.split(procura).length - 1;
}

/*
	cria um json com as classes como chave
	e as entradas de cada classe como valor
*/
function organizar() {
    let params = {};

    for(let i=0; i<entradas.length; i++) {
        // separa as palavras com '-'
        let carac = '';
        if(i<(entradas.length-1)) carac = '-';

        /*
            concatena as entradas de cada classe
            no valor da classe correspondente

            a quantidade de palavras repetidas por classe
            corresponde ao número de classes para a respectiva palavra
        */
        if(params[classes[i]]) {
            params[classes[i]] += entradas[i] + carac;
        }else {
            params[classes[i]] = entradas[i] + carac;
        }
    }

    // elimina o último hífen de cada valor
    let str = JSON.stringify(params);
    str = str.replace(/-"/g, '"');
    str = str.replace(/-/g, ',');
    params = JSON.parse(str);

    return params;
}

// tabela de frequência
// monta um json com o número de classes para cada entrada
function frequencia() {
    let categorias = [];
    let params = {};
    const objeto = organizar();
    const labels = retornaClasses();

    for(let i=0; i<entradas.length; i++) {
        params['Entrada'] = entradas[i];

        for(let j=0; j<labels.length; j++) {
            // conta o número de entradas em cada classe
            params[labels[j]] = contaTexto(objeto[labels[j]], entradas[i]);
        }

        categorias[i] = JSON.stringify(params);
    }

    categorias = eliminaDuplicados(categorias);

    for(let i=0; i<categorias.length; i++) {
        categorias[i] = JSON.parse(categorias[i]);
    }

    return categorias;
}

// retorna a quantidade de classes
function quantidadeClasses() {
    const categorias = frequencia();
    return parseInt(Object.keys(categorias[0]).length-1);
}

// soma os valores das classes da entrada passada
function somaClasses(arr=[]) {
    let soma = 0;
    // inicia em 1 para desconsiderar o valor da Entrada
    for(let i=1; i<arr.length; i++) {
        soma += parseInt(arr[i]);
    }
    return soma;
}

// retorna a soma total de cada classe
function totalPorClasse() {
    let totalClasse = [];
    const nomeClasses = retornaClasses();
    const str_classes = JSON.stringify(classes);

    for(let i=0; i<nomeClasses.length; i++) {
        totalClasse[nomeClasses[i]] = contaTexto(str_classes, nomeClasses[i]);
    }
    return totalClasse;
}

// soma dos totais de todas as classes
function somaTotaisClasses() {
    // Object.values(totalPorClasse()): retorna um vetor com os valores de cada chave
    const vetTemp = Object.values(totalPorClasse());
    let soma = 0;
    for(let i=0; i<vetTemp.length; i++) {
        soma += parseFloat(vetTemp[i]);
    }
    return soma;
}

// retorna a ocorrência de uma 'Classe' para uma 'Entrada'
function ocorrenciaClasseParaEntrada(_entrada='', _classe='') {
    const categorias = frequencia();
    let retorno = 0;

    categorias.forEach((item) => {
        if(item['Entrada'] == _entrada) {
            retorno = parseFloat(item[_classe]);
        }
    });
    return retorno;
}

// calcula a probabilidade da entrada pertencer a uma determinada classe
function NaiveBayes(_entrada='') {
    const nomeClasses = retornaClasses();
    const totalClasse = totalPorClasse();

    // soma os resultados de todas as classes da 'Entrada' passada
    const categorias = frequencia();
    let soma = 0;
    categorias.forEach((item) => {
        if(item['Entrada'] == _entrada) {
            for(let i=0; i<nomeClasses.length; i++) {
                soma += parseFloat(item[nomeClasses[i]]);
            }
        }
    });

    let probabilidade = [];
    /*
        (Quantidade de Classes na Entrada / Quantidade de Classes do Tipo Procurado)
        *
        (Quantidade de Classes do Tipo Procurado / Quantidade Total de Classes)
        /
        (Soma de Todas as Classes da Entrada / Quantidade Total de Classes)
    */
    for(let i=0; i<nomeClasses.length; i++) {
        probabilidade[nomeClasses[i]] =

            (ocorrenciaClasseParaEntrada(_entrada, nomeClasses[i]) / totalClasse[nomeClasses[i]])
            *
            (totalClasse[nomeClasses[i]] / somaTotaisClasses())
            /
            (soma / somaTotaisClasses());
    }

    return probabilidade;
}

function train(config={}) {
    if(config.input) entradas = config.input; else entradas = [''];
    if(config.output) classes = config.output; else classes = [''];
}

function predict(selEntrada='') {
    const nomeClasses = retornaClasses();
    let probabilidades = [];
    if(selEntrada.toString().trim().length > 0) {
        const Naive = NaiveBayes(selEntrada);

        for(let i=0; i<nomeClasses.length; i++) {
            const percentual = Number(parseFloat(Naive[nomeClasses[i]] * 100).toFixed(2));
            probabilidades.push({class: nomeClasses[i], probability: percentual});
        }

    }else {
        probabilidades.push({class: '', probability: 0});
    }

    return probabilidades;
}

train({
    input: ['bom', 'mau', 'indiferente', 'indiferente'],
    output: ['positivo', 'negativo', 'positivo', 'negativo']
});

console.log(predict('bom'));
