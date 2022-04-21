exports.mod = (mod_data) => {
    // Define paths
    let serverDir = global.internal.path.resolve;
    let path_TherapistAssort = serverDir(`user/cache/assort_54cb57776803fa99248b456e.json`);
    let path_LocaleEN = serverDir(`user/cache/locale_en.json`);
    let path_LocaleFR = serverDir(`user/cache/locale_fr.json`);
    let path_LocaleGE = serverDir(`user/cache/locale_ge.json`);
    let path_LocaleRU = serverDir(`user/cache/locale_ru.json`);
    let path_Items = serverDir(`user/cache/items.json`);
    let path_Templates = serverDir(`user/cache/templates.json`);
    let path_Gameplay = serverDir(`user/configs/gameplay.json`);

    // Define vars
    let var_CheatCoinID = "cheat_coin";
    let var_CheatCoinValue = 1000000;

    // Add the cheat coin to Therapist's trader inventory
    let file_TherapistAssort = fileIO.readParsed(serverDir(path_TherapistAssort)); // Read cached assort file

    let obj_CheatCoinItem = { // "items" object
        "_id": `${var_CheatCoinID}Trade`,
        "_tpl": `${var_CheatCoinID}`,
        "parentId": "hideout",
        "slotId": "hideout",
        "upd": {
            "UnlimitedCount": true,
            "StackObjectsCount": 999999999
        }
    };
    file_TherapistAssort.data.items.push(obj_CheatCoinItem); // Add to "items" array

    let obj_CheatCoinBarter = { // "barter_scheme" object
        "count": 1,
        "_tpl": "5449016a4bdc2d6f028b456f" // Sell for 1 rouble
    };
    file_TherapistAssort.data.barter_scheme[var_CheatCoinID + "Trade"] = [[obj_CheatCoinBarter]];

    file_TherapistAssort.data.loyal_level_items[var_CheatCoinID + "Trade"] = 1; // "loyal_level_items" object

    fileIO.write(serverDir(path_TherapistAssort), file_TherapistAssort, true, false);
    delete (file_TherapistAssort); // Remove file from memory

    // Add the cheat coin to locales
    let file_LocaleEN = fileIO.readParsed(serverDir(path_LocaleEN)); // Read cached locale_en file
    file_LocaleEN.templates[var_CheatCoinID] = {
        "Name": "1,000,000 ₽ Coin",
        "ShortName": "1 Mil ₽",
        "Description": "A million Roubles, you cheater."
    }
    fileIO.write(serverDir(path_LocaleEN), file_LocaleEN, true, false);
    delete (file_LocaleEN); // Remove file from memory

    let file_LocaleFR = fileIO.readParsed(serverDir(path_LocaleFR)); // Read cached locale_fr file
    file_LocaleFR.templates[var_CheatCoinID] = {
        "Name": "1 000 000 ₽ Pièce de monnaie",
        "ShortName": "1 Mil ₽",
        "Description": "Un million de Roubles, espèce de tricheur."
    }
    fileIO.write(serverDir(path_LocaleFR), file_LocaleFR, true, false);
    delete (file_LocaleFR); // Remove file from memory

    let file_LocaleGE = fileIO.readParsed(serverDir(path_LocaleGE)); // Read cached locale_ge file
    file_LocaleGE.templates[var_CheatCoinID] = {
        "Name": "1.000.000 ₽ Münze",
        "ShortName": "1 Mio ₽",
        "Description": "Eine Million Rubel, du Betrüger."
    }
    fileIO.write(serverDir(path_LocaleGE), file_LocaleGE, true, false);
    delete (file_LocaleGE); // Remove file from memory

    let file_LocaleRU = fileIO.readParsed(serverDir(path_LocaleRU)); // Read cached locale_ru file
    file_LocaleRU.templates[var_CheatCoinID] = {
        "Name": "1 000 000 ₽ Монета",
        "ShortName": "1 M ₽",
        "Description": "Миллион рублей, мошенник."
    }
    fileIO.write(serverDir(path_LocaleRU), file_LocaleRU, true, false);
    delete (file_LocaleRU); // Remove file from memory

    // Get trader SellPriceDecrease
    let file_Gameplay = fileIO.readParsed(serverDir(path_Gameplay)); // Read gameplay config file (isn't in global._database yet since this is a CacheModLoad)
    let var_CheatCoinCreditsPrice = Math.round(var_CheatCoinValue / (file_Gameplay.trading.SellPriceDecrease / 100)); // Make sure value is still 1 Mil after trader price decrease
    delete (file_Gameplay); // Remove file from memory

    // Add the cheat coin to items
    let file_Items = fileIO.readParsed(serverDir(path_Items)); // Read cached items file
    let obj_CheatCoin = utility.wipeDepend(file_Items.data["5d235b4d86f7742e017bc88a"]); // Use GP coin as a prototype
    obj_CheatCoin._id = var_CheatCoinID;
    obj_CheatCoin._name = var_CheatCoinID;
    obj_CheatCoin._props.Name = var_CheatCoinID;
    obj_CheatCoin._props.ShortName = var_CheatCoinID;
    obj_CheatCoin._props.Description = var_CheatCoinID;
    obj_CheatCoin._props.Rarity = "Not_exist";
    obj_CheatCoin._props.CreditsPrice = var_CheatCoinCreditsPrice;
    file_Items.data[var_CheatCoinID] = obj_CheatCoin;
    fileIO.write(serverDir(path_Items), file_Items, true, false);
    delete (file_Items); // Remove file from memory

    // Add the cheat coin to templates    
    let file_Templates = fileIO.readParsed(serverDir(path_Templates)); // Read cached templates file
    let obj_CheatCoinTemplate = {
        "Id": `${var_CheatCoinID}`,
        "ParentId": "5b47574386f77428ca22b2f1", // Valuables category
        "Price": 1
    }
    file_Templates.data.Items.push(obj_CheatCoinTemplate);
    fileIO.write(serverDir(path_Templates), file_Templates, true, false);
    delete (file_Templates); // Remove file from memory

    logger.logSuccess(`[MOD] ${mod_data.name} ${mod_data.version}`)
}