class Shop {
    name: string;
    chainName: string;
    openingHour: number;
    closingHour: number;
    visits: number = 0;

    constructor(name: string, chainName: string, openingHour: number, closingHour: number) {
        this.name = name;
        this.chainName = chainName;
        this.openingHour = openingHour;
        this.closingHour = closingHour;
    }

    isOpenAt(hour: number): boolean {
        return hour >= this.openingHour && hour < this.closingHour;
    }

    visit(): void {
        this.visits++;
    }
}

class StoreChain {
    name: string;
    shops: Shop[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addShop(shop: Shop): void {
        this.shops.push(shop);
    }

    getOpenShops(hour: number): Shop[] {
        return this.shops.filter(shop => shop.isOpenAt(hour));
    }

    getShopVisits(): number {
        return this.shops.reduce((sum, shop) => sum + shop.visits, 0);
    }
}

class StoreChainManagement {
    chains: StoreChain[] = []

    addChain(chain: StoreChain): void {
        this.chains.push(chain);
    }

    getAllOpenShops(hour: number): Shop[] {
        return this.chains.flatMap(chain => chain.getOpenShops(hour));
    } 

    visitOpenShop(name: string, hour: number): boolean {
        for (const chain of this.chains) {
            const shop = chain.shops.find(s => s.name === name);

            if (shop && shop.isOpenAt(hour)) {
                shop.visit()
                console.log("Visited shop " + shop.name)
                return true;
            }
        }
        
        console.log("Shop not found or closed.")
        return false;
    }
    
    visitAllOpenShops(hour: number): void {
        const openShops = this.getAllOpenShops(hour)

        for (const shop of openShops) {
            shop.visit();
        }
    }

    displayStatistics(): void {
        for (const chain of this.chains) {
            console.log(chain.name + " | " + chain.getShopVisits() +  " total visits.")

            for (const shop of chain.shops) {
                console.log("Shop: " + shop.name + " | " + shop.visits +  "  visits.")
            }
        }
    }
}

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

