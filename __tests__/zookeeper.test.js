const fs = require('fs');
const { 
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');
jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        {name: 'John', id: 'jhgdja3ng2'},
        zookeepers
        );
    expect(zookeeper.name).toBe('John');
    expect(zookeeper.id).toBe('jhgdja3ng2');
});

test('fliters by query', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Linda',
            age: 48,
            favoriteAnimal: "otter",
        },
        {
            id: "7",
            name: "Emmy",
            age: 29,
            favoriteAnimal: "Duckbilled Platypus",
          }
    ];

    const updatedZookeepers = filterByQuery({ age: 48 }, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Linda',
            age: 48,
            favoriteAnimal: "otter",
        },
        {
            id: "7",
            name: "Emmy",
            age: 29,
            favoriteAnimal: "Duckbilled Platypus",
          }
    ];

    const result = findByID("3", startingZookeepers);

    expect(result.name).toBe('Linda');
});

test('validates favorite animal', () => {
    const zookeeper = {
        id: '3',
        name: 'Linda',
        age: 48,
        favoriteAnimal: "otter",
    };

    const invalidZookeeper = {
        id: '3',
        name: 'Linda',
        age: 48,
        favoriteAnimal: "bear",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});