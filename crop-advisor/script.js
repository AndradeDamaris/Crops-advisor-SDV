//IDEIAS NOVAS
//1- SE ESTIVER NO ANO 1 MORANGO SO FICA DISPONIVEL NO DIA 13
//2- SE FOR VERDADEIRO ESCOLHER ENTRE PLANTAR NO MESMO DIA OU DIA SEGUINTE (ALTERA QUANTAS COLHEITAS)
//3- TEM ALGUMA HABILIDADE DE COLHEITA?
//4- DESEJA REPLANTAR?
//5- PRINTAR AS OUTRAS COLOCACOES DE MELHOR LUCRO TBM



let crops = [
    {
        name: "morango",
        price: 100,
        sendPrice: 120,
        season: "spring",
        grow: 8,
        moreProduction: true,
        regrowth: 4,
        perc: 2,
    },
    {
        name: "couve-flor",
        price: 80,
        sendPrice: 175,
        season: "spring",
        grow: 8,
        moreProduction: false,
        perc: null,

    },
    {
        name: "batata",
        price: 50,
        sendPrice: 80,
        season: "spring",
        grow: 6,
        moreProduction: false,
        perc: 20,
    },
    {
        name: "vagem",
        price: 60,
        sendPrice: 40,
        season: "spring",
        grow: 10,
        moreProduction: true,
        regrowth: 3,
        perc: null,
    },
    {
        name: "carambola",
        price: 400,
        sendPrice: 750,
        season: "summer",
        grow: 13,
        moreProduction: false,
        perc: null,
    },
    {
        name: "melão",
        price: 80,
        sendPrice: 250,
        season: "summer",
        grow: 12,
        moreProduction: false,
        perc: null,
    },
    {
        name: "mirtilo",
        price: 80,
        sendPrice: 50,
        season: "summer",
        grow: 13,
        moreProduction: true,
        regrowth: 4,
        perc: 302,
    },
    {
        name: "lúpulo",
        price: 60,
        sendPrice: 25,
        season: "summer",
        grow: 11,
        moreProduction: true,
        regrowth: 1,
        perc: null,
    },
    {
        name: "pimenta",
        price: 40,
        sendPrice: 40,
        season: "summer",
        grow: 5,
        moreProduction: true,
        regrowth: 1,
        perc: 2,
    },
    {
        name: "tomate",
        price: 50,
        sendPrice: 60,
        season: "summer",
        grow: 11,
        moreProduction: true,
        regrowth: 4,
        perc: 2,
    },
    {
        name: "abóbora",
        price: 100,
        sendPrice: 320,
        season: "autumn",
        grow: 13,
        moreProduction: false,
        perc: 2,
    },
    {
        name: "berinjela",
        price: 20,
        sendPrice: 60,
        season: "autumn",
        grow: 5,
        moreProduction: true,
        regrowth: 5,
        perc: 2,
    },
    {
        name: "couve chinesa",
        price: 50,
        sendPrice: 80,
        season: "autumn",
        grow: 4,
        moreProduction: false,
        perc: 2,
    },
    {
        name: "oxicoco",
        price: 240,
        sendPrice: 75,
        season: "autumn",
        grow: 7,
        moreProduction: true,
        regrowth: 5,
        perc: 2,
    },
    {
        name: "uva",
        price: 60,
        sendPrice: 80,
        season: "autumn",
        grow: 10,
        moreProduction: true,
        regrowth: 3,
        perc: 2,
    },
];

let form = document.getElementById("formCalc").addEventListener("submit", () => {
    event.preventDefault();

    //limpar o html
    let result = document.getElementById("result");
    result.innerHTML = "";



    //configurar estação
    let season = document.getElementById("season").value;

    let seasonChosed = crops.filter(newCrop => {
        return season === newCrop.season;
    });


    let day = document.getElementById("day").value;
    day = Number(day);
    let money = document.getElementById("money").value;
    money = Number(money);


    function calcBestCrop() {


        //variaveis
        let bestCrop = null;
        let bestProfit = 0;


        let moneyQuantity = document.getElementById("money").value;
        moneyQuantity = Number(moneyQuantity);

        let cropsQuantity = null;
        let cropsTotal = null;

        let lucroBruto = null;
        let totalProfit = null;

        let bruteProfit = null;

        let crop = null;


        let dayChosed = day;
        let restDays = 29 - dayChosed;


        let daysAfterFirstHarvest = null;

        let regrowthQuant = 0;

        let finalCropsQuant = null


        //laço pra percorrer o array e decidir o melhor lucro
        for (let i = 0; i < seasonChosed.length; i++) {

            crop = seasonChosed[i];


            //quanto da pra comprar com o valor de dinheiro
            cropsQuantity = Math.floor(moneyQuantity / crop.price);
            //alterar esse valor de acordo com a porcentagem
            if (crop.perc != null){

                finalCropsQuant =  ((crop.perc/ 100)* cropsQuantity)
                lucroBruto = Math.floor((finalCropsQuant + cropsQuantity) * crop.sendPrice );
            } else{
                //lucro bruto
                lucroBruto = Math.floor(finalCropsQuant * crop.sendPrice );
            }

            //comparar lucro se continuar crescendo ou nao
            if (crop.moreProduction === true) {

                daysAfterFirstHarvest = Math.floor(restDays - crop.grow);//20 dias

                regrowthQuant = Math.floor(daysAfterFirstHarvest / crop.regrowth + 1);//20/4+1 = 6
                totalProfit = Math.floor(lucroBruto * regrowthQuant - moneyQuantity);//600 x 6 - 500 = 3100

            } else {
                totalProfit = Math.floor(crop.sendPrice * cropsQuantity - moneyQuantity);
            }

            //captar o melhor lucro a cada laço
            if (totalProfit > bestProfit) {

                bestProfit = totalProfit;

                //guardando o valor do [i] em uma variavel de fora
                bestCrop = crop;
                cropsTotal = cropsQuantity;
                bruteProfit = lucroBruto;

            }
        }


        console.log(finalCropsQuant)

        //printar o resultado na tela
        let bestCropName = document.createElement("p");
        bestCropName.textContent = `melhor plantação: ${bestCrop.name}`;

        let daysForGrow = document.createElement("p");
        daysForGrow.textContent = `dias de crescimento: ${bestCrop.grow} dias`;

        let value = document.createElement("p");
        value.textContent = `valor de compra: ${bestCrop.price}`;

        let send = document.createElement("p");
        send.textContent = `lucro: ${bestProfit}`;

        let replant = document.createElement("p");

        let regrowthDays = document.createElement("p");

        let cropTotal = document.createElement("p");
        cropTotal.textContent = `plantações compradas: ${cropsTotal}`;


        let regrowthYesNo = document.createElement("p");
        if (bestCrop.moreProduction === true) {
            regrowthYesNo.textContent = "possível replantar: sim";
            regrowthDays.textContent = `dias de recrescimento: ${bestCrop.regrowth} dias`;
        } else {
            regrowthYesNo.textContent = "possível replantar: não";
            replant.textContent = `possível replantar até: ${Math.floor(restDays / bestCrop.grow)} vezes`;
        }


        result.appendChild(bestCropName);
        result.appendChild(daysForGrow);
        result.appendChild(regrowthYesNo);
        result.appendChild(regrowthDays);
        result.appendChild(value);
        result.appendChild(cropTotal);
        result.appendChild(replant);
        result.appendChild(send);


        console.log(`melhor plantação ${bestCrop.name}`);
        console.log(`quantidade possivel de comprar: ${cropsTotal}`);
        console.log(`melhor lucro possivel: ${bestProfit}`);


    }

    //validar dias e dinheiro
    if (day > 0 && day <= 28 && money > 0) {
        //executar todo o codigo
        calcBestCrop();
    } else {
        console.log("ERROR");
    }



    //funcao anonima pra calcular plantas q tem chance aleatoria de vir mais


})


