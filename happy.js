function happyNumberMap(base, max, callback) {

    var happyMap = [];

    function happyNumber(base, number) {

        var numberLength = Math.floor(Math.log(number) / Math.log(base)) + 1;
        var happyness = 0;

        for (var i = 0; i < numberLength; i++) {
            happyness += Math.pow(Math.floor(number / Math.pow(base, i)) % base, 2);
        }

        return happyness;
    }

    function happyNumberUpdate(happyMap, base, i, callback) {

        if (!happyMap[i]) {
            happyMap[i] = happyNumber(base, i);
            callback(i, happyMap[i]);

            happyNumberUpdate(happyMap, base, happyMap[i], callback);
        }
    }

    for (var i = 1; i <= max; i++) {
        happyNumberUpdate(happyMap, base, i, callback);
    }
}