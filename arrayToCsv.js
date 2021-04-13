// Convert Array of Complex Objects to CSV 
const ObjectsToCsv = require('objects-to-csv');
const fields = ["additionalProductDetail","catalog","imageDetail","manufacturer","measurement","pricesAndCost","productClass","selling","upc","usage"];
const unusualFields = [ 'id', 'basicProductDetailId', 'updatedAt', 'createdAt']

const plainArray = arr.map(elem => {
    let obj = [];
    const basic = Object.keys(elem).filter(elem => !(fields.includes(elem)));
    basic.forEach(field => obj[field] = elem[field]);
    fields.forEach(field => {
        const nestFields = Object.keys(elem[field]).filter(f => (!unusualFields.includes(f)));
        nestFields.forEach(nestField => {
            obj[nestField] = elem[field][nestField];
        });
    });
    return obj;
});
(async () => {
    const csv = new ObjectsToCsv(plainArray);
     await csv.toDisk('./test.csv);
    // Return the CSV file as string:
    console.log(await csv.toString());
})();
