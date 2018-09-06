const unitClasses = [
    {
        "id": "C51B98DC5787885C",
        "name": "Villager (M)"
    },
    {
        "id": "831A98DC2786885C",
        "name": "Villager (F)"
    },
    {
        "id": "4AC058885C6D1EBF",
        "name": "Cavalier (M)"
    },
    {
        "id": "08BF58882C6C1EBF",
        "name": "Cavalier (F)"
    },
    {
        "id": "89A60099B78ACB0C",
        "name": "Paladin (M)"
    },
    {
        "id": "47A500998789CB0C",
        "name": "Paladin (F)"
    },
    {
        "id": "BD41DF7E3385F1C6",
        "name": "Gold Knight (M)"
    },
    {
        "id": "7B40DF7E0384F1C6",
        "name": "Gold Knight (F)"
    },
    {
        "id": "0FFE1B4AA175776F",
        "name": "Soldier"
    },
    {
        "id": "A612F3C21E68886D",
        "name": "Knight"
    },
    {
        "id": "F6DB920958FF7BF2",
        "name": "Baron"
    },
    {
        "id": "5A40290862B10470",
        "name": "Mercenary"
    },
    {
        "id": "66F4C9C39A01F651",
        "name": "Myrmidon"
    },
    {
        "id": "52CF17AB9A7B8DCA",
        "name": "Dread Fighter"
    },
    {
        "id": "E3E9012321FF7726",
        "name": "Archer"
    },
    {
        "id": "B28F72B8D40E4C9A",
        "name": "Sniper"
    },
    {
        "id": "38B628F2D6A2A4F3",
        "name": "Bow Knight"
    },
    {
        "id": "92F226DE6E78A15D",
        "name": "Fighter"
    },
    {
        "id": "5A04E7044433696E",
        "name": "Hero"
    },
    {
        "id": "DD0EAFB1433FCFCC",
        "name": "Mage (M)"
    },
    {
        "id": "9B0DAFB1133ECFCC",
        "name": "Mage (F)"
    },
    {
        "id": "39DC3BC6D5C02953",
        "name": "Sage"
    },
    {
        "id": "9C62D71350DE579C",
        "name": "Pegasus Knight"
    },
    {
        "id": "D74265C1A194D89A",
        "name": "Falcon Knight"
    },
    {
        "id": "69705A3B5F5180C6",
        "name": "Cleric"
    },
    {
        "id": "F903575FEB1ECE95",
        "name": "Saint"
    },
    {
        "id": "20FDDBEAF653E363",
        "name": "Priestess (Mage F)"
    },
    {
        "id": "27FCDBEA4553E363",
        "name": "Priestess (Celica)"
    },
    {
        "id": "E8A51124186AFE85",
        "name": "Princess"
    },
    {
        "id": "F7F99AE449837761",
        "name": "Boy"
    },
    {
        "id": "B5F89AE419827761",
        "name": "Girl"
    },
    {
        "id": "9742C34037AEFAD2",
        "name": "Lord (Marth)"
    },
    {
        "id": "0942133AA9DEAFCF",
        "name": "Hero (Ike)"
    },
    {
        "id": "EFB6BE25D74AABC5",
        "name": "Lord (Lucina)"
    },
    {
        "id": "FA8BBF2522E0ABC5",
        "name": "Tactician (Robin)"
    },
    {
        "id": "185A06A44A912675",
        "name": "Lord (Roy)"
    },
    {
        "id": "503F90DB3CD08E74",
        "name": "Lord (CorrinM)"
    },
    {
        "id": "0E3E90DB0CCF8E74",
        "name": "Lord (CorrinF)"
    },
    {
        "id": "D964005DA93AA3A3",
        "name": "Conqueror (DLC)"
    },
    {
        "id": "81F6224C9BE113CE",
        "name": "Rigain (DLC)"
    },
    {
        "id": "7460F8D7AC561E25",
        "name": "Spartan (DLC)"
    },
    {
        "id": "D6402D042A30E3D3",
        "name": "Oliphantier (DLC)"
    },
    {
        "id": "572032FD3F4049A8",
        "name": "Exemplar (DLC)"
    },
    {
        "id": "E78EF6EE29DD61B3",
        "name": "Guru (DLC)"
    },
    {
        "id": "E5588604F5D2C4FE",
        "name": "Harrier (DLC)"
    },
    {
        "id": "398FBB505747C11F",
        "name": "Skogul (DLC)"
    },
    {
        "id": "D0537D79EED22FFD",
        "name": "Yasha (DLC)"
    },
    {
        "id": "CEAF96134A701BC4",
        "name": "Enchantress (DLC)"
    },
    {
        "id": "02825A5FA20BD095",
        "name": "Fiend"
    },
    {
        "id": "0D0D28E04D0CA05D",
        "name": "Brigand"
    },
    {
        "id": "BE0BFAD1864030EB",
        "name": "Arcanist"
    },
    {
        "id": "9037EFA118C296D4",
        "name": "Cantor"
    },
    {
        "id": "08815A5FAE0AD095",
        "name": "Witch"
    },
    {
        "id": "C56EE1B4938C944D",
        "name": "Revenant"
    },
    {
        "id": "377579B889EE5A4F",
        "name": "Entombed"
    },
    {
        "id": "664B89FC580A3B3C",
        "name": "Bonewalker"
    },
    {
        "id": "6F4E9854F78B45AC",
        "name": "Lich"
    },
    {
        "id": "3EC029DFF46EE535",
        "name": "Gargoyle"
    },
    {
        "id": "B8875909E4B75FF2",
        "name": "Deathgoyle"
    },
    {
        "id": "D81A5502DE4A9974",
        "name": "Necrodragon"
    },
    {
        "id": "224C595F145FCF95",
        "name": "White Dragon"
    },
    {
        "id": "FFE63DB7FD3ABF4E",
        "name": "Mogall"
    },
    {
        "id": "9A19565FB2A7CD95",
        "name": "Fell God"
    },
    {
        "id": "23D51B8BCB5E75ED",
        "name": "Mila's Servant"
    },
    {
        "id": "C68A3E760EE2B9D5",
        "name": "Duma's Apostle"
    },
    {
        "id": "AC37A3DAD8BDFA7F",
        "name": "Dracul"
    },
    {
        "id": "84E41FF620BD3979",
        "name": "Titan"
    },
    {
        "id": "83E832D5176CE059",
        "name": "Guardian"
    },
    {
        "id": "68ADE887607F0182",
        "name": "Garuda"
    },
    {
        "id": "6B9C3A078F24E84E",
        "name": "Vestal"
    },
    {
        "id": "FB8D384AD9E62632",
        "name": "Fafnir"
    },
    {
        "id": "88A21EB5768BB34D",
        "name": "Dagon"
    },
    {
        "id": "BA7A9509B2027EF2",
        "name": "Balor"
    },
    {
        "id": "15538ABD115E6820",
        "name": "Deimos"
    },
    {
        "id": "7F0C525F3B40CB95",
        "name": "Fire Dragon"
    },
    {
        "id": "F119565FDFA7CD95",
        "name": "Fell Dragon"
    }
];

export default unitClasses;
 