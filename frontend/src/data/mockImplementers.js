const mockImplementers = [
  {
    "id": 1,
    "fkkoCode": "3 10 112 01 42 4",
    "wasteName": "Отходы бумаги и картона, загрязнённые",
    "technology": "Переработка бумаги",
    "organization": "РосУтилизация",
    "region": "Новосибирская область",
    "volume": "100 тонн/месяц",
    "contact": "info1@company.ru, +7 (900) 609-11-68"
  },
  {
    "id": 2,
    "fkkoCode": "4 61 131 01 41 4",
    "wasteName": "Отходы полиэтилена низкого давления",
    "technology": "Переработка пластика",
    "organization": "ГринРесайкл",
    "region": "Республика Татарстан",
    "volume": "100 тонн/месяц",
    "contact": "info2@company.ru, +7 (900) 678-81-42"
  },
  {
    "id": 3,
    "fkkoCode": "4 61 132 01 41 4",
    "wasteName": "Отходы полиэтилена высокого давления",
    "technology": "Переработка пластика",
    "organization": "ГринРесайкл",
    "region": "Санкт-Петербург",
    "volume": "100 тонн/месяц",
    "contact": "info3@company.ru, +7 (900) 806-97-34"
  },
  {
    "id": 4,
    "fkkoCode": "4 61 133 01 41 4",
    "wasteName": "Отходы полипропилена",
    "technology": "Переработка пластика",
    "organization": "ГринРесайкл",
    "region": "Москва",
    "volume": "10 тонн/месяц",
    "contact": "info4@company.ru, +7 (900) 946-17-85"
  },
  {
    "id": 5,
    "fkkoCode": "4 61 135 01 41 4",
    "wasteName": "Отходы ПЭТФ (полиэтилентерефталата)",
    "technology": "Переработка пластика",
    "organization": "ЭкоПром",
    "region": "Республика Татарстан",
    "volume": "75 тонн/месяц",
    "contact": "info5@company.ru, +7 (900) 956-85-71"
  },
  {
    "id": 6,
    "fkkoCode": "4 61 136 01 41 4",
    "wasteName": "Отходы ПВХ (поливинилхлорида)",
    "technology": "Общая переработка",
    "organization": "ЭкоТех",
    "region": "Москва",
    "volume": "10 тонн/месяц",
    "contact": "info6@company.ru, +7 (900) 450-50-23"
  },
  {
    "id": 7,
    "fkkoCode": "4 81 201 01 52 4",
    "wasteName": "Отходы отработанных автомобильных шин",
    "technology": "Общая переработка",
    "organization": "ЭкоТех",
    "region": "Республика Татарстан",
    "volume": "50 тонн/месяц",
    "contact": "info7@company.ru, +7 (900) 695-30-84"
  },
  {
    "id": 8,
    "fkkoCode": "4 81 251 01 51 4",
    "wasteName": "Отходы резинотехнических изделий",
    "technology": "Переработка резины",
    "organization": "БиоРесурс",
    "region": "Москва",
    "volume": "75 тонн/месяц",
    "contact": "info8@company.ru, +7 (900) 270-98-66"
  },
  {
    "id": 9,
    "fkkoCode": "4 81 301 01 51 4",
    "wasteName": "Отходы текстильные из натуральных волокон",
    "technology": "Переработка текстиля",
    "organization": "ЭкоТех",
    "region": "Москва",
    "volume": "75 тонн/месяц",
    "contact": "info9@company.ru, +7 (900) 111-44-22"
  },
  {
    "id": 10,
    "fkkoCode": "7 31 110 01 21 5",
    "wasteName": "Отработанные свинцово-кислотные аккумуляторы",
    "technology": "Переработка аккумуляторов",
    "organization": "ГринРесайкл",
    "region": "Москва",
    "volume": "50 тонн/месяц",
    "contact": "info10@company.ru, +7 (900) 424-56-81"
  },
  {
    "id": 11,
    "fkkoCode": "7 31 210 01 22 5",
    "wasteName": "Отработанные щелочные аккумуляторы",
    "technology": "Переработка аккумуляторов",
    "organization": "РосУтилизация",
    "region": "Республика Татарстан",
    "volume": "10 тонн/месяц",
    "contact": "info11@company.ru, +7 (900) 205-85-33"
  },
  {
    "id": 12,
    "fkkoCode": "9 41 130 01 42 4",
    "wasteName": "Стеклянная тара",
    "technology": "Переработка стекла",
    "organization": "БиоРесурс",
    "region": "Новосибирская область",
    "volume": "10 тонн/месяц",
    "contact": "info12@company.ru, +7 (900) 232-31-70"
  },
  {
    "id": 13,
    "fkkoCode": "9 41 230 01 41 4",
    "wasteName": "Стеклобой",
    "technology": "Переработка стекла",
    "organization": "БиоРесурс",
    "region": "Республика Татарстан",
    "volume": "100 тонн/месяц",
    "contact": "info13@company.ru, +7 (900) 402-55-37"
  },
  {
    "id": 14,
    "fkkoCode": "9 41 310 01 41 4",
    "wasteName": "Отходы стекла от осветительных приборов",
    "technology": "Общая переработка",
    "organization": "ЭкоТех",
    "region": "Новосибирская область",
    "volume": "75 тонн/месяц",
    "contact": "info14@company.ru, +7 (900) 323-74-42"
  },
  {
    "id": 15,
    "fkkoCode": "3 10 111 01 41 4",
    "wasteName": "Отходы бумаги и картона, не загрязнённые",
    "technology": "Переработка бумаги",
    "organization": "ГринРесайкл",
    "region": "Санкт-Петербург",
    "volume": "75 тонн/месяц",
    "contact": "info15@company.ru, +7 (900) 522-21-66"
  },
  {
    "id": 16,
    "fkkoCode": "3 10 112 01 42 4",
    "wasteName": "Отходы бумаги и картона, загрязнённые",
    "technology": "Переработка бумаги",
    "organization": "ГринРесайкл",
    "region": "Санкт-Петербург",
    "volume": "75 тонн/месяц",
    "contact": "info16@company.ru, +7 (900) 124-88-58"
  },
  {
    "id": 17,
    "fkkoCode": "4 61 131 01 41 4",
    "wasteName": "Отходы полиэтилена низкого давления",
    "technology": "Переработка пластика",
    "organization": "БиоРесурс",
    "region": "Республика Татарстан",
    "volume": "10 тонн/месяц",
    "contact": "info17@company.ru, +7 (900) 947-46-74"
  },
  {
    "id": 18,
    "fkkoCode": "4 61 132 01 41 4",
    "wasteName": "Отходы полиэтилена высокого давления",
    "technology": "Переработка пластика",
    "organization": "БиоРесурс",
    "region": "Москва",
    "volume": "75 тонн/месяц",
    "contact": "info18@company.ru, +7 (900) 688-19-99"
  },
  {
    "id": 19,
    "fkkoCode": "4 61 133 01 41 4",
    "wasteName": "Отходы полипропилена",
    "technology": "Переработка пластика",
    "organization": "РосУтилизация",
    "region": "Республика Татарстан",
    "volume": "10 тонн/месяц",
    "contact": "info19@company.ru, +7 (900) 652-90-25"
  },
  {
    "id": 20,
    "fkkoCode": "4 61 135 01 41 4",
    "wasteName": "Отходы ПЭТФ (полиэтилентерефталата)",
    "technology": "Переработка пластика",
    "organization": "ЭкоПром",
    "region": "Москва",
    "volume": "50 тонн/месяц",
    "contact": "info20@company.ru, +7 (900) 789-49-92"
  },
  {
    "id": 21,
    "fkkoCode": "4 61 136 01 41 4",
    "wasteName": "Отходы ПВХ (поливинилхлорида)",
    "technology": "Общая переработка",
    "organization": "БиоРесурс",
    "region": "Республика Татарстан",
    "volume": "50 тонн/месяц",
    "contact": "info21@company.ru, +7 (900) 680-27-23"
  },
  {
    "id": 22,
    "fkkoCode": "4 81 201 01 52 4",
    "wasteName": "Отходы отработанных автомобильных шин",
    "technology": "Общая переработка",
    "organization": "ЭкоПром",
    "region": "Москва",
    "volume": "50 тонн/месяц",
    "contact": "info22@company.ru, +7 (900) 369-39-13"
  },
  {
    "id": 23,
    "fkkoCode": "4 81 251 01 51 4",
    "wasteName": "Отходы резинотехнических изделий",
    "technology": "Переработка резины",
    "organization": "РосУтилизация",
    "region": "Краснодарский край",
    "volume": "100 тонн/месяц",
    "contact": "info23@company.ru, +7 (900) 355-32-94"
  },
  {
    "id": 24,
    "fkkoCode": "4 81 301 01 51 4",
    "wasteName": "Отходы текстильные из натуральных волокон",
    "technology": "Переработка текстиля",
    "organization": "ЭкоПром",
    "region": "Краснодарский край",
    "volume": "100 тонн/месяц",
    "contact": "info24@company.ru, +7 (900) 325-96-52"
  },
  {
    "id": 25,
    "fkkoCode": "7 31 110 01 21 5",
    "wasteName": "Отработанные свинцово-кислотные аккумуляторы",
    "technology": "Переработка аккумуляторов",
    "organization": "ГринРесайкл",
    "region": "Москва",
    "volume": "25 тонн/месяц",
    "contact": "info25@company.ru, +7 (900) 788-11-30"
  },
  {
    "id": 26,
    "fkkoCode": "7 31 210 01 22 5",
    "wasteName": "Отработанные щелочные аккумуляторы",
    "technology": "Переработка аккумуляторов",
    "organization": "ГринРесайкл",
    "region": "Москва",
    "volume": "10 тонн/месяц",
    "contact": "info26@company.ru, +7 (900) 586-66-83"
  },
  {
    "id": 27,
    "fkkoCode": "9 41 130 01 42 4",
    "wasteName": "Стеклянная тара",
    "technology": "Переработка стекла",
    "organization": "РосУтилизация",
    "region": "Санкт-Петербург",
    "volume": "100 тонн/месяц",
    "contact": "info27@company.ru, +7 (900) 375-75-26"
  },
  {
    "id": 28,
    "fkkoCode": "9 41 230 01 41 4",
    "wasteName": "Стеклобой",
    "technology": "Переработка стекла",
    "organization": "ЭкоПром",
    "region": "Республика Татарстан",
    "volume": "50 тонн/месяц",
    "contact": "info28@company.ru, +7 (900) 962-71-96"
  },
  {
    "id": 29,
    "fkkoCode": "9 41 310 01 41 4",
    "wasteName": "Отходы стекла от осветительных приборов",
    "technology": "Общая переработка",
    "organization": "БиоРесурс",
    "region": "Краснодарский край",
    "volume": "75 тонн/месяц",
    "contact": "info29@company.ru, +7 (900) 535-80-36"
  },
  {
    "id": 30,
    "fkkoCode": "3 10 111 01 41 4",
    "wasteName": "Отходы бумаги и картона, не загрязнённые",
    "technology": "Переработка бумаги",
    "organization": "ГринРесайкл",
    "region": "Республика Татарстан",
    "volume": "75 тонн/месяц",
    "contact": "info30@company.ru, +7 (900) 923-27-46"
  },
  {
    "id": 31,
    "fkkoCode": "3 10 112 01 42 4",
    "wasteName": "Отходы бумаги и картона, загрязнённые",
    "technology": "Переработка бумаги",
    "organization": "БиоРесурс",
    "region": "Санкт-Петербург",
    "volume": "50 тонн/месяц",
    "contact": "info31@company.ru, +7 (900) 636-19-86"
  },
  {
    "id": 32,
    "fkkoCode": "4 61 131 01 41 4",
    "wasteName": "Отходы полиэтилена низкого давления",
    "technology": "Переработка пластика",
    "organization": "РосУтилизация",
    "region": "Краснодарский край",
    "volume": "25 тонн/месяц",
    "contact": "info32@company.ru, +7 (900) 502-73-12"
  },
  {
    "id": 33,
    "fkkoCode": "4 61 132 01 41 4",
    "wasteName": "Отходы полиэтилена высокого давления",
    "technology": "Переработка пластика",
    "organization": "РосУтилизация",
    "region": "Республика Татарстан",
    "volume": "10 тонн/месяц",
    "contact": "info33@company.ru, +7 (900) 549-22-98"
  },
  {
    "id": 34,
    "fkkoCode": "4 61 133 01 41 4",
    "wasteName": "Отходы полипропилена",
    "technology": "Переработка пластика",
    "organization": "ГринРесайкл",
    "region": "Краснодарский край",
    "volume": "50 тонн/месяц",
    "contact": "info34@company.ru, +7 (900) 248-38-45"
  },
  {
    "id": 35,
    "fkkoCode": "4 61 135 01 41 4",
    "wasteName": "Отходы ПЭТФ (полиэтилентерефталата)",
    "technology": "Переработка пластика",
    "organization": "ЭкоТех",
    "region": "Новосибирская область",
    "volume": "10 тонн/месяц",
    "contact": "info35@company.ru, +7 (900) 594-73-58"
  },
  {
    "id": 36,
    "fkkoCode": "4 61 136 01 41 4",
    "wasteName": "Отходы ПВХ (поливинилхлорида)",
    "technology": "Общая переработка",
    "organization": "ГринРесайкл",
    "region": "Республика Татарстан",
    "volume": "50 тонн/месяц",
    "contact": "info36@company.ru, +7 (900) 841-41-53"
  },
  {
    "id": 37,
    "fkkoCode": "4 81 201 01 52 4",
    "wasteName": "Отходы отработанных автомобильных шин",
    "technology": "Общая переработка",
    "organization": "ГринРесайкл",
    "region": "Республика Татарстан",
    "volume": "75 тонн/месяц",
    "contact": "info37@company.ru, +7 (900) 570-82-52"
  },
  {
    "id": 38,
    "fkkoCode": "4 81 251 01 51 4",
    "wasteName": "Отходы резинотехнических изделий",
    "technology": "Переработка резины",
    "organization": "ЭкоТех",
    "region": "Краснодарский край",
    "volume": "25 тонн/месяц",
    "contact": "info38@company.ru, +7 (900) 548-78-13"
  },
  {
    "id": 39,
    "fkkoCode": "4 81 301 01 51 4",
    "wasteName": "Отходы текстильные из натуральных волокон",
    "technology": "Переработка текстиля",
    "organization": "РосУтилизация",
    "region": "Санкт-Петербург",
    "volume": "50 тонн/месяц",
    "contact": "info39@company.ru, +7 (900) 423-32-94"
  },
  {
    "id": 40,
    "fkkoCode": "7 31 110 01 21 5",
    "wasteName": "Отработанные свинцово-кислотные аккумуляторы",
    "technology": "Переработка аккумуляторов",
    "organization": "ЭкоПром",
    "region": "Москва",
    "volume": "25 тонн/месяц",
    "contact": "info40@company.ru, +7 (900) 220-19-66"
  },
  {
    "id": 41,
    "fkkoCode": "7 31 210 01 22 5",
    "wasteName": "Отработанные щелочные аккумуляторы",
    "technology": "Переработка аккумуляторов",
    "organization": "РосУтилизация",
    "region": "Москва",
    "volume": "75 тонн/месяц",
    "contact": "info41@company.ru, +7 (900) 509-78-56"
  },
  {
    "id": 42,
    "fkkoCode": "9 41 130 01 42 4",
    "wasteName": "Стеклянная тара",
    "technology": "Переработка стекла",
    "organization": "ЭкоТех",
    "region": "Москва",
    "volume": "75 тонн/месяц",
    "contact": "info42@company.ru, +7 (900) 752-57-24"
  },
  {
    "id": 43,
    "fkkoCode": "9 41 230 01 41 4",
    "wasteName": "Стеклобой",
    "technology": "Переработка стекла",
    "organization": "ГринРесайкл",
    "region": "Новосибирская область",
    "volume": "25 тонн/месяц",
    "contact": "info43@company.ru, +7 (900) 728-51-90"
  },
  {
    "id": 44,
    "fkkoCode": "9 41 310 01 41 4",
    "wasteName": "Отходы стекла от осветительных приборов",
    "technology": "Общая переработка",
    "organization": "ЭкоПром",
    "region": "Новосибирская область",
    "volume": "50 тонн/месяц",
    "contact": "info44@company.ru, +7 (900) 695-41-51"
  },
  {
    "id": 45,
    "fkkoCode": "3 10 111 01 41 4",
    "wasteName": "Отходы бумаги и картона, не загрязнённые",
    "technology": "Переработка бумаги",
    "organization": "ЭкоПром",
    "region": "Республика Татарстан",
    "volume": "25 тонн/месяц",
    "contact": "info45@company.ru, +7 (900) 471-41-68"
  },
  {
    "id": 46,
    "fkkoCode": "3 10 112 01 42 4",
    "wasteName": "Отходы бумаги и картона, загрязнённые",
    "technology": "Переработка бумаги",
    "organization": "ГринРесайкл",
    "region": "Краснодарский край",
    "volume": "75 тонн/месяц",
    "contact": "info46@company.ru, +7 (900) 188-40-81"
  },
  {
    "id": 47,
    "fkkoCode": "4 61 131 01 41 4",
    "wasteName": "Отходы полиэтилена низкого давления",
    "technology": "Переработка пластика",
    "organization": "ЭкоПром",
    "region": "Краснодарский край",
    "volume": "50 тонн/месяц",
    "contact": "info47@company.ru, +7 (900) 557-63-65"
  },
  {
    "id": 48,
    "fkkoCode": "4 61 132 01 41 4",
    "wasteName": "Отходы полиэтилена высокого давления",
    "technology": "Переработка пластика",
    "organization": "ЭкоПром",
    "region": "Краснодарский край",
    "volume": "25 тонн/месяц",
    "contact": "info48@company.ru, +7 (900) 800-70-70"
  },
  {
    "id": 49,
    "fkkoCode": "4 61 133 01 41 4",
    "wasteName": "Отходы полипропилена",
    "technology": "Переработка пластика",
    "organization": "РосУтилизация",
    "region": "Новосибирская область",
    "volume": "50 тонн/месяц",
    "contact": "info49@company.ru, +7 (900) 633-97-98"
  },
  {
    "id": 50,
    "fkkoCode": "4 61 135 01 41 4",
    "wasteName": "Отходы ПЭТФ (полиэтилентерефталата)",
    "technology": "Переработка пластика",
    "organization": "РосУтилизация",
    "region": "Краснодарский край",
    "volume": "100 тонн/месяц",
    "contact": "info50@company.ru, +7 (900) 595-57-35"
  }
];

export default mockImplementers;