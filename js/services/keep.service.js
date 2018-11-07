import utilService from "./util.service.js";
const NOTES_KEY = 'notes';

function query() {
    return storageService.load(NOTES_KEY)
        .then(notes => {
            if (!notes) {
                notes = [];
                storageService.store(NOTES_KEY, notes)
            }
        });
    // return Promise.resolve(notes);
}


function save(note) {
    note.id = utilService.makeId();
    storageService.load(NOTES_KEY)
        .then(notes => {

        });
    cars.push(carData);
    return Promise.resolve(carData);
}

function getCarById(carId) {
    var theCar = cars.find(car => car.id === carId);
    return Promise.resolve(theCar)
}

function nextCar(carId) {
    const carIdx = cars.findIndex(car => car.id === carId);
    const car = (cars[carIdx + 1]) ? cars[carIdx + 1] : cars[0]

    return Promise.resolve(car)

}


export default {
    query,
    save,
    getCarById,
    nextCar
}

function query1() {
    return Promise.resolve(cars);
}