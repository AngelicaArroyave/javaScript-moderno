/**
 * 
 * @param {HTMLDivElement} element 
 */
export const generatorFunctionsComponent = (element) => {
    
    // const myGenerator = myFirstGeneratorFunction()
    // console.log("🚀 ~ generatorFunctionsComponent ~ myGenerator:", myGenerator.next())
    // console.log("🚀 ~ generatorFunctionsComponent ~ myGenerator:", myGenerator.next())
    // console.log("🚀 ~ generatorFunctionsComponent ~ myGenerator:", myGenerator.next())
    // console.log("🚀 ~ generatorFunctionsComponent ~ myGenerator:", myGenerator.next())
    // console.log("🚀 ~ generatorFunctionsComponent ~ myGenerator:", myGenerator.next())
    // console.log("🚀 ~ generatorFunctionsComponent ~ myGenerator:", myGenerator.next())

    const genId = idGenerator()
    const btn = document.createElement('button')
    btn.innerText = 'Click me'
    element.append(btn)

    const renderBtn = () => {
        const { value } = genId.next()
        btn.innerText = `Click ${ value }`
    }

    btn.addEventListener('click', renderBtn)
}

function* myFirstGeneratorFunction() {
    yield 'Primer valor'
    yield 'Segundo valor'
    yield 'Tercer valor'
    yield 'Cuarto valor'

    return 'Ya no hay valores'
}

function* idGenerator() {
    let currentId = 0

    while (true) {
        yield ++currentId
    }
}