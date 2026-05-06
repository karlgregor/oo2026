var Shop = /** @class */ (function () {
    function Shop(name, chainName, openingHour, closingHour) {
        this.visits = 0;
        this.name = name;
        this.chainName = chainName;
        this.openingHour = openingHour;
        this.closingHour = closingHour;
    }
    Shop.prototype.isOpenAt = function (hour) {
        return hour >= this.openingHour && hour < this.closingHour;
    };
    Shop.prototype.visit = function () {
        this.visits++;
    };
    return Shop;
}());
var StoreChain = /** @class */ (function () {
    function StoreChain(name) {
        this.shops = [];
        this.name = name;
    }
    StoreChain.prototype.addShop = function (shop) {
        this.shops.push(shop);
    };
    StoreChain.prototype.getOpenShops = function (hour) {
        return this.shops.filter(function (shop) { return shop.isOpenAt(hour); });
    };
    StoreChain.prototype.getShopVisits = function () {
        return this.shops.reduce(function (sum, shop) { return sum + shop.visits; }, 0);
    };
    return StoreChain;
}());
var StoreChainManagement = /** @class */ (function () {
    function StoreChainManagement() {
        this.chains = [];
    }
    StoreChainManagement.prototype.addChain = function (chain) {
        this.chains.push(chain);
    };
    StoreChainManagement.prototype.getAllOpenShops = function (hour) {
        return this.chains.flatMap(function (chain) { return chain.getOpenShops(hour); });
    };
    StoreChainManagement.prototype.visitOpenShop = function (name, hour) {
        for (var _i = 0, _a = this.chains; _i < _a.length; _i++) {
            var chain = _a[_i];
            var shop = chain.shops.find(function (s) { return s.name === name; });
            if (shop && shop.isOpenAt(hour)) {
                shop.visit();
                console.log("Visited shop " + shop.name);
                return true;
            }
        }
        console.log("Shop not found or closed.");
        return false;
    };
    StoreChainManagement.prototype.visitAllOpenShops = function (hour) {
        var openShops = this.getAllOpenShops(hour);
        for (var _i = 0, openShops_1 = openShops; _i < openShops_1.length; _i++) {
            var shop = openShops_1[_i];
            shop.visit();
        }
    };
    StoreChainManagement.prototype.displayStatistics = function () {
        for (var _i = 0, _a = this.chains; _i < _a.length; _i++) {
            var chain = _a[_i];
            console.log(chain.name + " | " + chain.getShopVisits() + " total visits.");
            for (var _b = 0, _c = chain.shops; _b < _c.length; _b++) {
                var shop = _c[_b];
                console.log("Shop: " + shop.name + " | " + shop.visits + "  visits.");
            }
        }
    };
    return StoreChainManagement;
}());
// INITIALIZING THE STORE CHAIN GROUPING
//const chainCollection = new StoreChainManagement()
// CREATING STORE CHAINS
//const selverChain = new StoreChain("Selver")
//const rimiChain = new StoreChain("Rimi")
// CREATING INDIVIDUAL SHOPS UNDER THE CHAINS
//selverChain.addShop(new Shop("Kadaka Selver", "Selver", 8, 23))
//selverChain.addShop(new Shop("Balti jaama Selver ABC", "Selver", 7, 22))
//rimiChain.addShop(new Shop("Haabersti Rimi", "Rimi", 8, 22))
//imiChain.addShop(new Shop("Ülemiste Rimi", "Rimi", 7, 20))
// ADDING THE STORECHAINS INTO THE CHAIN GROUPING
//chainCollection.addChain(selverChain)
//chainCollection.addChain(rimiChain)
// GETTING ALL OPEN STORES AT 21:00
//const hour = 21
//const openShopsAt21 = chainCollection.getAllOpenShops(hour)
//console.log("------------------")
//console.log("All open shops at " + hour + ":00")
//for (const shop of openShopsAt21) {
//    console.log(shop.name + " -  Opens at " + shop.openingHour + ":00, closes at " + shop.closingHour + ":00.")
//}
// GETTING ALL OPEN STORES AT 18:00
//const hour2 = 18
//const openShopsAt18 = chainCollection.getAllOpenShops(hour2)
//console.log("------------------")
//console.log("All open shops at " + hour2 + ":00")
//for (const shop of openShopsAt18) {
//    console.log(shop.name + " -  Opens at " + shop.openingHour + ":00, closes at " + shop.closingHour + ":00.")
//}
// DISPLAYING STATISTICS, ADDING VISITS AND DISPLAYING STATISTICS AGAIN
////console.log("--------- STATISTICS ---------")
//chainCollection.displayStatistics()
//chainCollection.visitAllOpenShops(hour2)
//console.log("--------- STATISTICS AFTER ---------")
//chainCollection.displayStatistics()
// VISITING INDIVIDUAL SHOP AND DISPLAYING STATISTICS AGAIN
//console.log("--------- VISITING SHOP ---------")
//chainCollection.visitOpenShop("Kadaka Selver", 2)
//chainCollection.visitOpenShop("Kadaka Selver", hour2)
//console.log("--------- STATISTICS AFTER ---------")
//chainCollection.displayStatistics()
