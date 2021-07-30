function produto(x=[], y=[]){
    let temp = [];
    for(let i =0; i < x.length; i++)
        temp.push(parseFloat(x[i]) * parseFloat(y[i]));
    return temp;
}

function quadrados(x=[]){
    let temp = [];
    for(let i=0; i<x.length; i++)
            temp.push(parseFloat(x[i]) * parseFloat(x[i]));
    return temp;
}

function somatorio(x=[]){
    let temp = 0;
    for (let i = 0; i<x.length; i++)
        temp += parseFloat(x[i])
    return temp;
}

function media(x=[]){
    return somatorio(x) / x.length
}

function resultados(x=[], y=[], p = 0){
    const resultado1 = (somatorio(x) * somatorio(y)) / x.length
    const resultado2 = (somatorio(x) * somatorio(x)) / x.length
    const resultado3 = somatorio(produto(x,y)) - resultado1
    const resultado4 = resultado3 / (somatorio(quadrados(x)) - resultado2)
    const resultado5 = media(y) - (resultado4 * media(x))

    return ((resultado4 * p) + resultado5).toFixed(0);
}

function linearRegression(eixoX = [], eixoY = []){
    const tamX = eixoX.length
    const tamY = eixoY.length

    const tempX = eixoX.slice(0, tamY)
    const tempY = eixoY;

    const dif = tamX - tamY

    if(dif > 0){
        let regressoes = []
        for (let i = 0; i < dif; i++){
            const temp = Number(resultados(tempX, tempY, eixoX[tamY + i]))
            regressoes.push(temp)
        }
        const novoY = tempY.concat(regressoes)
        console.log(`Eixo x: ${eixoX} \n Eixo Y: ${novoY}`)
    }
}

linearRegression(
    [1, 2, 3, 4, 5],
    [9 , 18, 27, 36],
    )
