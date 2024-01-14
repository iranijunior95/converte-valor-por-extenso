function converter_valor(valor, uppercase=0) {

    if(String(valor).indexOf(",") > 0) {
        valor = valor.replace(".", "");
        valor = valor.replace(",", ".");
    }

    let singular = ["centavo", "real", "mil", "milhÃo", "bilhÃo", "trilhÃo", "quatrilhÃo"];
    let plural = ["centavos", "reais", "mil", "milhÕes", "bilhÕes", "trilhÕes", "quatrilhÕes"];
    let unidade = ["", "um", "dois", "trÊs", "quatro", "cinco", "seis", "sete", "oito", "nove"];
    let dezena = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezesete", "dezoito", "dezenove"];
    let dezenas = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
    let centena = ["", "cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

    let zero = 0;

    valor = new Intl.NumberFormat('pt-BR', {currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 3}).format(valor);
    valor = valor.replace(",", ".");

    let inteiro = valor.split(".");
    let count = inteiro.length;

    for(let i=0; i < count; i++) {
        for(let ii = inteiro[i].length; ii < 3; ii++) {

            inteiro[i] = "0" + inteiro[i];
        }
    }

    let fim = count - (inteiro[count -1] > 0 ? 1 : 2);
    let resto = '';

    for(let i=0; i < count; i++) {

        valor = inteiro[i];

        let rc = ((valor > 100) && (valor < 200)) ? "cento" : centena[valor[0]];
        let rd = (valor[1] < 2) ? "" : dezenas[valor[1]];
        let ru = (valor > 0) ? ((valor[1] == 1) ? dezena[valor[2]] : unidade[valor[2]]) : "";
        let r = rc + ((rc && (rd || ru)) ? " e " : "") + rd + ((rd && ru) ? " e " : "") + ru;
        let t = count - 1 - i;

        r += r ? " " + (valor > 1 ? plural[t] : singular[t]) : "";

        if(valor == '000') {

            zero++;
        }else if(zero > 0) {

            zero--;
        }

        if ((t == 1) && (zero > 0) && (inteiro[0] > 0)) {

            r += ( (zero > 1) ? " de " : "") + plural[t];
        }

        if(r) {

            resto = resto + (((i > 0) && (i <= fim) && (inteiro[0] > 0) && (zero < 1)) ? ( (i < fim) ? ", " : " e ") : " ") + r;
        }
    }

    if(!uppercase) {

        return (resto ? resto : "zero").trim();
    }else if(uppercase == 2) {

        return (resto.toUpperCase() ? resto.toUpperCase() : "Zero").trim();
    }else {

        resto = resto.toLocaleLowerCase().replace(/(?:^|\s)\S/g, (a) => {

            return a.toUpperCase();
        });

        return (resto ? resto : "Zero").trim();
    }
}
