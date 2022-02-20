const konsonantit = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
const diftongit = ['ei', 'öi', 'äi', 'oi', 'ai', 'yi', 'ui', 'iy', 'iu', 'ey', 'öy', 'äy', 'eu', 'ou', 'au', 'ie', 'yö', 'uo']


function testi() {
    let testiSanat = ['suomenhevonen', 'newforestinponi', 'lapinkeltaperhonen',

        'lapinlehmä', 'ayrshirelehmä', 'ylämaankarja', 'kainuunlammas',

        'itämerennorppa', 'bengalintiikeri', 'aasiannorsu', 'kuubankrokotiili',

        'tasmaniankaija', 'meksikonkaklattaja', 'panamansmaragdikolibri', 'pohjoisenkalliotöyhtöpingviini',

        'madagaskarinpäivägekko', 'puertoriconboa', 'kaliforniankuningaskäärme', 'australianpallohai',

        'ruusuruohomaamehiläinen', 'töpökääpiötypäkkö', 'lapinlehmä', 'suomenpystykorva', 'Hakaniementori', 'sika-nautajauheliha', 'lentokonesuihkuturbiinimoottoriapumekaanikkoaliupseerioppilas', 'aasia', 'Idiootti', 'Booli', 'Rakkaus', 'Majakka', 'Kirsikka', 'Nauraa', 'Gladiaattori', 'Pallonpuoliskon', 'Espanja', 'Kriittinen', 'asia', 'raapia', 'Sementti', 'Banaani', 'Ohjelmistot', 'Kausi', 'Tehdas', 'Persilja', 'Vastaava', 'Periskooppi', 'Vastaanottaa', 'Klaustrofobia', 'Meteoriitti'];

    for (let i = 0; i < testiSanat.length; i++) {
        tavuta(testiSanat[i]);
    }
}

function tavutaInput(input) {
    let display = document.getElementById('display');

    let regex = /^[a-zA-Z0-9]+$/;
    
    

    display.innerHTML = tavuta(document.getElementById('input-box').value);
}

function tavuta(sana) {
    let output = "";

    sana = sana.toLowerCase();
    sana = sana.normalize();

    for (let i = 0; i < diftongit.length; i++) {
        diftongit[i] = diftongit[i].normalize();
    }
    for (let i = 0; i < konsonantit.length; i++) {
        konsonantit[i] = konsonantit[i].normalize();
    }


    // konsonantti => vokaali = tavu

    function konsonanttiSaanto(index) {

        // TODO: toimii mutta onko oikein? tavuttaa esim 'aliupseeri' oikein.
        if (konsonantit.includes(sana[index - 1]) && !konsonantit.includes(sana[index - 2]) && konsonantit.includes(sana[index + 2]) && konsonantit.includes(sana[index + 3]) && index - 1 != 0) {
            if (sana[index] !== sana[index + 1]) {
                if (diftongit.includes(sana[index] + sana[index + 1])) {
                    if (index + 1 != sana.length) {
                        return true;
                    }
                }
            }
        }

        if (index == 0) {
            if (!konsonantit.includes(sana[index]) && konsonantit.includes(sana[index + 1]) && !konsonantit.includes(sana[index + 2])) {
                return true;
            }
        }

        if (konsonantit.includes(sana[index + 1]) && !konsonantit.includes(sana[index + 2]) && index != 0 && index != sana.length - 2) {
            return true;
        }

        return false;
    }

    // vokaali => vokaali = tavu
    function vokaaliSaanto(index) {

        if (!konsonantit.includes(sana[[index]]) && !konsonantit.includes(sana[index + 1])) {
            // ei ole pitkävokaali
            if (sana[index] !== sana[index + 1]) {
                if (!diftongit.includes(sana[index] + sana[index + 1])) {
                    if (index + 1 != sana.length) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    // special case : esim. 'sika-nautajauheliha'
    function tavu(index) {
        return sana[index] === '-' || sana[index + 1] === '-';
    }

    for (let i = 0; i < sana.length; i++) {
        output += sana[i];

        if (tavu(i))
            continue;

        if (konsonanttiSaanto(i) || vokaaliSaanto(i)) {
            output += '-';
        }
    }

    let outputCapitalized = output.charAt(0).toUpperCase() + output.slice(1);

    console.log(outputCapitalized);
    return outputCapitalized;
}