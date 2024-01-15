import { heroes } from "../data/heroes"

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const asyncAwaitComponent = async (element) => {
    
    const id1 = '5d86371f25a058e5b1c8a65e'
    const id2 = '5d86371fd55e2e2a30fe1ccb2'

    try {
        const hero1 = await findHeroes(id1)
    const hero2 = await findHeroes(id2)

    element.innerHTML = `${ hero1.name } / ${ hero2.name }`
    } catch (error) {
        element.innerHTML = error
    }
}

const findHeroes = async (id) => {
    const hero = heroes.find(hero => hero.id === id)
    
    if(!hero) throw `Hero with id ${ id } not found`
    
    return hero
}