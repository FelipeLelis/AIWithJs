const linearRegression = require('./linear-regression')

const config = {
    input: [1, 2, 3, 4],
    output: [10, 20 ,30, 40]
}

const regression = new linearRegression();
regression.train(config);

const result = regression.predict([5, 6, 7, 8])

console.log(result)
