const multiVariationRegression = require('./multiVariateRegression')

const config = {
    input: [[1,2, 1], [2,3,1], [3, 4,1], [4, 5,1]],
    output: [4, 6, 8, 10]
}

const regression = new multiVariationRegression()

regression.train(config)

const result = regression.predict([[5, 6, 1], [6, 7, 1]])
console.log(result)
