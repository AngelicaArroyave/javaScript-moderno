import { heroes } from "../data/heroes";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const generatorsAsyncComponent = async (element) => {
    
    const heroGenerator = getHeroGenerator()
    let isFinished = false

    do {
        const { value, done } = await heroGenerator.next()
        console.log("🚀 ~ generatorsAsyncComponent ~ value, done:", value, done)
        isFinished = done
        element.innerHTML = value
    } while (!isFinished);
}

async function* getHeroGenerator() {
    for(const hero of heroes) {
        await sleep()
        yield hero.name
    }

    return 'No hay más'
}

const sleep = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000);
    })
}