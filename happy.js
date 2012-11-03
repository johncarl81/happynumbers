// Function to create all the happy numbers <= the given max and in the given base.
// The given callback will be provided the number n and its happification(n).
// Also, the callback will only be called once per number n.
function happyNumberMap(max, base, callback) {

    var happyMap = [];

    //returns the happy number for the given input number
    function happification(number) {

        var numberLength = Math.floor(Math.log(number) / Math.log(base)) + 1;
        var happyness = 0;

        for (var i = 0; i < numberLength; i++) {
            happyness += Math.pow(Math.floor(number / Math.pow(base, i)) % base, 2);
        }

        return happyness;
    }

    // Iteratively updates the happyMap and callback with the happy number calculated from i.
    // If i already exists in the happyMap, the function quits.
    // This allows us to find happy numbers > i if they exist in the chain.
    function happyNumberUpdate(i) {

        while (!happyMap[i]) {
            happyMap[i] = happification(i);
            callback(i, happyMap[i]);


            i = happyMap[i];
        }
    }

    for (var i = 1; i <= max; i++) {
        happyNumberUpdate(i);
    }
}