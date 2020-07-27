function Licz()
{
    const data = GetData();
    console.log(data);
    let result = Calculate(data);
    $("#wynik0").text(result.Rata);
    $("#wynik1").text(result.Koszt);
    $("#wynik2").text(result.RRSO);
}

function Calculate(data)
{
    // obliczenie raty
    let p = (data.Oprocentowanie /12) / 100;
    let licznik = p * Math.pow(1 + p, data.Miesiac);
    let mianownik = Math.pow(1 + p, data.Miesiac) - 1;
    let rata = data.Kwota * (licznik / mianownik);

    // kwota z odsetkami + prowizja
    let tmp_kwota = rata * data.Miesiac + (data.Kwota * (data.Prowizja/100));

    // calkowity koszt kredytu
    let ckk = Math.round(tmp_kwota - data.Kwota);
    
    // RRSO
    //let Kwota_Splaty_Kredytu = tmp_kwota + (tmp_kwota-data.Kwota) + (data.Dodatkowe/data.Miesiac);
   // let RRSO = (((1 + tmp_kwota + data.Dodatkowe)/data.Kwota) - 1 ) * 100;
    let Kwota_Splaty_Kredytu = ((rata * (1+(data.Prowizja/100))) * data.Miesiac) + data.Dodatkowe;

    let RRSO = (Math.pow(Kwota_Splaty_Kredytu/data.Kwota,24/data.Miesiac) - 1) * 100;
    RRSO = Math.round((RRSO + Number.EPSILON) * 100) / 100

    return {"Rata":Math.round(rata), "Koszt" : ckk, "RRSO" : RRSO};
}


function GetData()
{

    let kwota = $("#kwota").val();
    let miesiac = $("#miesiac").val();
    let oprocentowanie = $("#oprocentowanie").val();
    let prowizja = $("#prowizja").val();
    let dodatkowe = $("#premium").val();
    return  {'Kwota' : parseFloat(kwota), 'Miesiac': parseFloat(miesiac), 'Oprocentowanie': parseFloat(oprocentowanie), 'Prowizja' : parseFloat(prowizja), 'Dodatkowe': parseFloat(dodatkowe)};
}