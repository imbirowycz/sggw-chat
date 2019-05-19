const degressList = [
  {value: null, text: 'Wybirz jedno'},
  {value: 'LICEŃCIAT', text: 'LICEŃCIAT'},
  {value: 'IŻYNIER', text: 'IŻYNIER'},
  {value: 'MAGISTER', text: 'IŻYNIER'},
  {value: 'DOKTOR', text: 'DOKTOR'},
  {value: 'DOKTOR HAB', text: 'DOKTOR HAB'},
  {value: 'PROFESOR', text: 'PROFESOR'},
];
const scientificsList = [
  {value: 'kdjfkdfjk', text: 'Język obcy'},
  {
    value: 'Ochrona własności intelektualnej',
    text: 'Ochrona własności intelektualnej',
  },
  {
    value: 'Wychowanie fizyczne (tylko studia stacjonarne',
    text: 'Wychowanie fizyczne (tylko studia stacjonarne',
  },
  {value: 'Szkolenie BHP', text: 'Szkolenie BHP'},
  {value: 'Proseminarium', text: 'Proseminarium'},
  {value: 'Podstawy ekonomii', text: 'Podstawy ekonomii'},
  {value: 'Filozofia', text: 'Filozofia'},
  {value: 'Logika z retoryką', text: 'Logika z retoryką'},
  {
    value: 'Komunikacja międzykulturowa',
    text: 'Komunikacja międzykulturowa',
  },
  {value: 'Technologia informacyjna', text: 'Technologia informacyjna'},
  {
    value: 'Myślenie projektowe (tylko studia stacjonarne',
    text: 'Myślenie projektowe (tylko studia stacjonarne',
  },
  {
    value: 'Komunikacja w biznesie (tylko studia stacjonarne',
    text: 'Komunikacja w biznesie (tylko studia stacjonarne',
  },
  {
    value: 'Przedsiębiorczość innowacyjna (tylko studia stacjonarne',
    text: 'Przedsiębiorczość innowacyjna (tylko studia stacjonarne',
  },
  {value: 'Matematyka', text: 'Matematyka'},
  {value: 'Matematyka dyskretna', text: 'Matematyka dyskretna'},
  {value: 'Fizyka', text: 'Fizyka'},
  {
    value: 'Podstawy elektrotechniki i elektroniki',
    text: 'Podstawy elektrotechniki i elektroniki',
  },
  {
    value: 'Algorytmy i struktury danych',
    text: 'Algorytmy i struktury danych',
  },
  {value: 'Podstawy programowania', text: 'Podstawy programowania'},
  {value: 'Programowanie', text: 'Programowanie'},
  {
    value: 'Architektura systemów komputerowych',
    text: 'Architektura systemów komputerowych',
  },
  {value: 'Systemy operacyjne', text: 'Systemy operacyjne'},
  {
    value: 'Technologie sieciowe (CCNA)',
    text: 'Technologie sieciowe (CCNA)',
  },
  {
    value: 'Języki i paradygmaty programowania',
    text: 'Języki i paradygmaty programowania',
  },
  {
    value: 'Języki i paradygmaty programowania',
    text: 'Języki i paradygmaty programowania',
  },
  {
    value: 'Komunikacja człowiek-komputer',
    text: 'Komunikacja człowiek-komputer',
  },
  {value: 'Grafika komputerowa', text: 'Grafika komputerowa'},
  {value: 'Sztuczna inteligencja', text: 'Sztuczna inteligencja'},
  {value: 'Bazy danych', text: 'Bazy danych'},
  {
    value: 'Inżynieria oprogramowania',
    text: 'Inżynieria oprogramowania',
  },
];
const facultysList = [
  {value: null, text: 'Wybirz jedno'},
  {
    value: 'WYDZIAŁ ROLNICTWA I BIOLOGII',
    text: 'WYDZIAŁ ROLNICTWA I BIOLOGII',
  },
  {
    value: 'WYDZIAŁ MEDYCYNY WETERYNARYJNEJ',
    text: 'WYDZIAŁ MEDYCYNY WETERYNARYJNEJ',
  },
  {value: 'WYDZIAŁ LEŚNY', text: 'WYDZIAŁ LEŚNY'},
  {
    value: 'WYDZIAŁ OGRODNICTWA, BIOTECHNOLOGII I ARCHITEKTURY KRAJOBRAZU',
    text: 'WYDZIAŁ OGRODNICTWA, BIOTECHNOLOGII I ARCHITEKTURY KRAJOBRAZU',
  },
  {
    value: 'WYDZIAŁ BUDOWNICTWA I INŻYNIERII ŚRODOWISKA',
    text: 'WYDZIAŁ BUDOWNICTWA I INŻYNIERII ŚRODOWISKA',
  },
  {
    value: 'WYDZIAŁ TECHNOLOGII DREWNA',
    text: 'WYDZIAŁ TECHNOLOGII DREWNA',
  },
  {
    value: 'WYDZIAŁ NAUK O ZWIERZĘTACH',
    text: 'WYDZIAŁ NAUK O ZWIERZĘTACH',
  },
  {value: 'WYDZIAŁ NAUK O ŻYWNOŚCI', text: 'WYDZIAŁ NAUK O ŻYWNOŚCI'},
  {
    value: 'WYDZIAŁ NAUK O ŻYWIENIU CZŁOWIEKA I KONSUMPCJI',
    text: 'WYDZIAŁ NAUK O ŻYWIENIU CZŁOWIEKA I KONSUMPCJI',
  },
  {
    value: 'WYDZIAŁ INŻYNIERII PRODUKCJI',
    text: 'WYDZIAŁ INŻYNIERII PRODUKCJI',
  },
  {
    value: 'WYDZIAŁ NAUK EKONOMICZNYCH',
    text: 'WYDZIAŁ NAUK EKONOMICZNYCH',
  },
  {value: 'WYDZIAŁ NAUK SPOŁECZNYCH', text: 'WYDZIAŁ NAUK SPOŁECZNYCH'},
  {
    value: 'WYDZIAŁ ZASTOSOWAŃ INFORMATYKI I MATEMATYKI',
    text: 'WYDZIAŁ ZASTOSOWAŃ INFORMATYKI I MATEMATYKI',
  },
];
// ***************************************************************

const fieldsOfStudy = [
  {value: null, text: 'Wybirz jedno'},
  {
    value: 'WYDZIAŁ ROLNICTWA I BIOLOGII',
    text: 'WYDZIAŁ ROLNICTWA I BIOLOGII',
  },
  {
    value: 'WYDZIAŁ MEDYCYNY WETERYNARYJNEJ',
    text: 'WYDZIAŁ MEDYCYNY WETERYNARYJNEJ',
  },
  {value: 'WYDZIAŁ LEŚNY', text: 'WYDZIAŁ LEŚNY'},
  {
    value: 'WYDZIAŁ OGRODNICTWA, BIOTECHNOLOGII I ARCHITEKTURY KRAJOBRAZU',
    text: 'WYDZIAŁ OGRODNICTWA, BIOTECHNOLOGII I ARCHITEKTURY KRAJOBRAZU',
  },
  {
    value: 'WYDZIAŁ BUDOWNICTWA I INŻYNIERII ŚRODOWISKA',
    text: 'WYDZIAŁ BUDOWNICTWA I INŻYNIERII ŚRODOWISKA',
  },
  {
    value: 'WYDZIAŁ TECHNOLOGII DREWNA',
    text: 'WYDZIAŁ TECHNOLOGII DREWNA',
  },
  {
    value: 'WYDZIAŁ NAUK O ZWIERZĘTACH',
    text: 'WYDZIAŁ NAUK O ZWIERZĘTACH',
  },
  {value: 'WYDZIAŁ NAUK O ŻYWNOŚCI', text: 'WYDZIAŁ NAUK O ŻYWNOŚCI'},
  {
    value: 'WYDZIAŁ NAUK O ŻYWIENIU CZŁOWIEKA I KONSUMPCJI',
    text: 'WYDZIAŁ NAUK O ŻYWIENIU CZŁOWIEKA I KONSUMPCJI',
  },
  {
    value: 'WYDZIAŁ INŻYNIERII PRODUKCJI',
    text: 'WYDZIAŁ INŻYNIERII PRODUKCJI',
  },
  {
    value: 'WYDZIAŁ NAUK EKONOMICZNYCH',
    text: 'WYDZIAŁ NAUK EKONOMICZNYCH',
  },
  {value: 'WYDZIAŁ NAUK SPOŁECZNYCH', text: 'WYDZIAŁ NAUK SPOŁECZNYCH'},
  {
    value: 'WYDZIAŁ ZASTOSOWAŃ INFORMATYKI I MATEMATYKI',
    text: 'WYDZIAŁ ZASTOSOWAŃ INFORMATYKI I MATEMATYKI',
  },
];
const years = [
  {value: null, text: 'Wybirz jedno'},
  {value: '2014', text: '2014'},
  {value: '2015', text: '2015'},
  {value: '2016', text: '2016'},
  {value: '2017', text: '2017'},
  {value: '2018', text: '2018'},
  {value: '2019', text: '2019'},
];

export {degressList, scientificsList, facultysList, fieldsOfStudy, years};
