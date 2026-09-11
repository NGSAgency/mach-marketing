// =========================================================
// STOCK PHOTO LIBRARY
//
// Licensed photos that fill image slots a site or concept has no photo for.
// The business's own photos always win; stock only fills gaps.
//
// Every photo here was looked at and tagged by hand (2026-09-11). Nothing is
// matched by guessing at image content: a slot gets a photo only when one of
// its tags matches, so a termite page never shows a mosquito.
//
// Licence: Unsplash License (free for commercial use, no attribution
// required; https://unsplash.com/license). Served from Unsplash's CDN. Credit
// is kept for our records.
//
// people: true means the photo shows people at work or a client. Those are
// used on concepts only, where every stock photo carries a "Sample photo"
// label. Live sites get only people: false photos (a house, a room, a
// product), never anyone who could be taken for the client's team.
// =========================================================

const CDN = 'https://images.unsplash.com/'

export const PHOTOS = [
  {"id": "UjGSnzfDUl8", "photo": "photo-1670989292166-8b20b9530438", "people": true, "tags": ["pest", "general-pest"], "alt": "Pest control technician with a backpack sprayer treating the foundation of a house", "credit": "Pro Pest Control Canberra"},
  {"id": "UovTD1dG-lA", "photo": "photo-1646640381839-02748ae8ddf0", "people": true, "tags": ["pest", "general-pest"], "alt": "Technician spraying the exterior wall of a home", "credit": "Jimmy Nilsson Masth"},
  {"id": "0MNaCPGsnvI", "photo": "photo-1601394065692-a12883c73656", "people": false, "tags": ["pest", "termite"], "alt": "Termite galleries tunnelled through wood", "credit": "Immo Wegmann"},
  {"id": "vkYaDZK60VU", "photo": "photo-1680518135743-f241e43d12b6", "people": false, "tags": ["pest", "termite"], "alt": "Wood eaten through by termites", "credit": "Bill Fairs"},
  {"id": "XiYo6XE0Cvg", "photo": "photo-1635496471665-4e67e0e87399", "people": false, "tags": ["pest", "mosquito"], "alt": "Mosquito on a green leaf", "credit": "Erik Karits"},
  {"id": "iTDCtgM9KwU", "photo": "photo-1698566445612-b6e552371334", "people": false, "tags": ["pest", "mosquito"], "alt": "Close-up of a mosquito", "credit": "Rapha Wilde"},
  {"id": "Ru3IMko0KNg", "photo": "photo-1591735115730-4bf3a351cfe8", "people": false, "tags": ["pest", "wasp", "stinging-insects"], "alt": "Paper wasp nest under a roof eave", "credit": "Ante Hamersmit"},
  {"id": "GkknyQzyK98", "photo": "photo-1602173051717-26e91ecf7a77", "people": false, "tags": ["pest", "wasp", "stinging-insects"], "alt": "Wasp nest attached under a ledge", "credit": "Bee Safe"},
  {"id": "yg8pLPTAY8M", "photo": "photo-1584034516663-ed3798816de4", "people": false, "tags": ["pest", "spider"], "alt": "Dew-covered spider web", "credit": "George Rosema"},
  {"id": "MwRMo8yx250", "photo": "photo-1784489528557-e1c3a3d227ea", "people": false, "tags": ["home"], "alt": "Wood-sided house behind a garden in soft morning light", "credit": "malwina nogaj"},
  {"id": "PhdfnA3Qtjc", "photo": "photo-1766777324084-3ef1ff093f6d", "people": false, "tags": ["home"], "alt": "Brick family home with a front garden", "credit": "T"},
  {"id": "6QKEwq2mltc", "photo": "photo-1504579524716-7eeaa8704f14", "people": false, "tags": ["home"], "alt": "Pale yellow house siding with shrubs along the foundation", "credit": "Alex Grodkiewicz"},
  {"id": "zYsYZTnghR8", "photo": "photo-1586501599247-bdd24253c5a8", "people": false, "tags": ["home"], "alt": "Brick house with a lawn and front hedges", "credit": "Dan Burton"},
  {"id": "QxW15BmJxOQ", "photo": "photo-1624116518496-993146f67f4a", "people": false, "tags": ["pest", "rodent"], "alt": "Rat on a wooden ledge", "credit": "Joshua J. Cotten"},
  {"id": "KKPV5hGmQkA", "photo": "photo-1575378064390-5a323bbac5d7", "people": false, "tags": ["pest", "rodent"], "alt": "Rat squeezing through a gap in a wall", "credit": "Svetozar Cenisev"},
  {"id": "V-QbDB5zyMY", "photo": "photo-1565618953310-18439a7d4609", "people": false, "tags": ["pest", "rodent"], "alt": "Close-up of a brown rat", "credit": "Brett Jordan"},
  {"id": "GjpvaL4-Sh8", "photo": "photo-1727198634627-645ef5356455", "people": false, "tags": ["pest", "bed-bug"], "alt": "Close-up of a bed bug", "credit": "matheus ferreira"},
  {"id": "pB08LQvYNQQ", "photo": "photo-1773466045020-387b4f6a6867", "people": false, "tags": ["pest", "ant"], "alt": "Ants on a log", "credit": "Péter Sebestyén"},
  {"id": "C1BjxQCqba0", "photo": "photo-1601247387326-f8bcb5a234d4", "people": false, "tags": ["pest", "wildlife"], "alt": "Raccoon standing among trees", "credit": "Joshua J. Cotten"},
  {"id": "5lq_93YTP4s", "photo": "photo-1682627101090-323012f3b832", "people": false, "tags": ["pest", "wildlife"], "alt": "Raccoon climbing a fence post", "credit": "fr0ggy5"},
  {"id": "tFvLJMHczCY", "photo": "photo-1788640113174-49a802818521", "people": false, "tags": ["pest", "wildlife", "attic", "insulation"], "alt": "Attic with loose insulation between the rafters", "credit": "Antje Winkler"},
  {"id": "ML-ewsNtsZo", "photo": "photo-1553969536-e9b839932f42", "people": false, "tags": ["pest", "wildlife", "attic", "roofing"], "alt": "Empty attic with exposed wooden rafters", "credit": "Sebastian Herrmann"},
  {"id": "xvMYnYBHKF4", "photo": "photo-1611773236700-a0592aeaf8fc", "people": false, "tags": ["pest", "cockroach"], "alt": "Close-up of a cockroach", "credit": "Erik Karits"},
  {"id": "_aSFmmvS62I", "photo": "photo-1660330589827-da8ab7dd3c02", "people": true, "tags": ["electrical", "panel"], "alt": "Electrician working at a home electric meter and panel", "credit": "Raze Solar"},
  {"id": "S5uFiFBeq4s", "photo": "photo-1660330590022-9f4ff56b63f6", "people": true, "tags": ["electrical", "panel", "wiring"], "alt": "Electrician working inside a breaker panel", "credit": "Raze Solar"},
  {"id": "_2AlIm-F6pw", "photo": "photo-1621905251189-08b45d6a269e", "people": true, "tags": ["electrical"], "alt": "Electrician in a hard hat testing a wall fixture", "credit": "Emmanuel Ikwuegbu"},
  {"id": "6LW2zctJ8TU", "photo": "photo-1659205212610-b941b3048b68", "people": false, "tags": ["hvac", "cooling", "ac"], "alt": "Air conditioner condenser beside a wooden fence and ferns", "credit": "Meg Jenson"},
  {"id": "TDtycnfiDa8", "photo": "photo-1776860150272-653efc74193c", "people": false, "tags": ["hvac", "heat-pump", "heating", "cooling"], "alt": "Heat pump unit outside a modern building", "credit": "alpha innotec"},
  {"id": "RAliDqgJKbE", "photo": "photo-1574334292321-4844f63aefef", "people": false, "tags": ["hvac", "duct", "ventilation"], "alt": "Sheet metal ductwork running along a ceiling", "credit": "Mitchell Luo"},
  {"id": "gSvCiyLnCeU", "photo": "photo-1651474738521-efacfb201039", "people": false, "tags": ["hvac", "cooling", "ac"], "alt": "Central air conditioner condenser in a garden", "credit": "Sam Jotham Sutharson"},
  {"id": "-nbWCvUiFJA", "photo": "photo-1700124113583-81aa99ea2aa2", "people": false, "tags": ["hvac", "heat-pump", "heating", "cooling"], "alt": "Heat pump unit beside a house with shrubs", "credit": "alpha innotec"},
  {"id": "UcPEiRiKxuk", "photo": "photo-1665826254141-bfa10685e002", "people": false, "tags": ["hvac", "cooling", "ac", "mini-split"], "alt": "Ductless mini-split outdoor unit on a wall", "credit": "Prasopchok"},
  {"id": "SJnak9YYFWU", "photo": "photo-1759772238012-9d5ad59ae637", "people": false, "tags": ["hvac", "cooling", "ac", "mini-split"], "alt": "Wall-mounted ductless air conditioner indoors", "credit": "Illia Horokhovsky"},
  {"id": "RFAHj4tI37Y", "photo": "photo-1545259741-2ea3ebf61fa3", "people": false, "tags": ["hvac", "thermostat", "heating", "cooling"], "alt": "Smart thermostat on a white wall", "credit": "Dan LeFebvre"},
  {"id": "NohN3BIkAZM", "photo": "photo-1655194827229-a1d3192b533e", "people": false, "tags": ["hvac", "thermostat", "heating", "cooling"], "alt": "Hand adjusting a wall thermostat", "credit": "HUUM"},
  {"id": "bATo1e3Q0zU", "photo": "photo-1755717146866-983df8fd2208", "people": false, "tags": ["hvac", "heating", "water-heater", "plumbing"], "alt": "Finished basement utility area with a water heater", "credit": "Alex Pavor"},
  {"id": "C-oYJoIfgCs", "photo": "photo-1620653713380-7a34b773fef8", "people": true, "tags": ["plumbing", "water-heater"], "alt": "Hands fitting a valve on a water heater", "credit": "Marian Florinel Condruz"},
  {"id": "c314Gh8dXAo", "photo": "photo-1676210134188-4c05dd172f89", "people": true, "tags": ["plumbing", "drain", "sink", "repair"], "alt": "Plumber working on the pipes under a sink", "credit": "Timur Shakerzianov"},
  {"id": "kxuz4YrLxSc", "photo": "photo-1676210134190-3f2c0d5cf58d", "people": true, "tags": ["plumbing", "sink", "repair"], "alt": "Plumber tightening a fitting under a sink", "credit": "Timur Shakerzianov"},
  {"id": "U0jpGKtMtWE", "photo": "photo-1650551182991-b07558247564", "people": false, "tags": ["plumbing", "pipes", "repiping"], "alt": "Copper pipes and valves on a wall", "credit": "Immo Wegmann"},
  {"id": "-Xmg4o3bBHw", "photo": "photo-1627752711469-d98b8acfc05c", "people": false, "tags": ["plumbing", "pipes"], "alt": "Copper water lines with shut-off valves", "credit": "夜 咔罗"},
  {"id": "HutGSBkIrzs", "photo": "photo-1669920282730-ab422e592f97", "people": false, "tags": ["plumbing", "leak", "repair"], "alt": "Leaking outdoor tap", "credit": "Ian Talmacs"},
  {"id": "AdA6DeV659Q", "photo": "photo-1669920282671-e2f03e99513f", "people": false, "tags": ["plumbing", "leak", "faucet"], "alt": "Dripping faucet", "credit": "Ian Talmacs"},
  {"id": "lIgRLbfp0VA", "photo": "photo-1757787697646-e84d5490add1", "people": false, "tags": ["plumbing", "faucet", "sink", "kitchen", "home-interior"], "alt": "Modern kitchen with a black faucet over the sink", "credit": "Franco Debartolo"},
  {"id": "9vFTBI69Udo", "photo": "photo-1661044437435-8f6b5ed0d777", "people": false, "tags": ["plumbing", "sink", "drain", "kitchen"], "alt": "Stainless steel kitchen sink under a window", "credit": "Henry Kobutra"},
  {"id": "WbmX0pw_AuI", "photo": "photo-1630699376443-a79cea41ed80", "people": false, "tags": ["plumbing", "bathroom", "toilet", "home-interior"], "alt": "Bright bathroom with a vanity and toilet", "credit": "Point3D Commercial Imaging Ltd."},
  {"id": "876NP3npUMc", "photo": "photo-1589824783837-6169889fa20f", "people": false, "tags": ["plumbing", "toilet", "bathroom"], "alt": "White toilet in a clean bathroom", "credit": "Giorgio Trovato"},
  {"id": "DqC8-L5oNlo", "photo": "photo-1654440122140-f1fc995ddb34", "people": false, "tags": ["plumbing", "drain"], "alt": "Chrome sink drain strainer", "credit": "Daniel Dan"},
  {"id": "47jO5Y8nsYo", "photo": "photo-1635335874521-7987db781153", "people": false, "tags": ["electrical", "panel", "wiring"], "alt": "Breaker panel with neatly run wiring", "credit": "mostafa mahmoudi"},
  {"id": "exfrR9KkzlE", "photo": "photo-1565049981953-379c9c2a5d48", "people": false, "tags": ["electrical", "outlet"], "alt": "US wall outlet with a plug", "credit": "Clint Patterson"},
  {"id": "AwTX47fOBgU", "photo": "photo-1767514536575-82aaf8b0afc4", "people": false, "tags": ["electrical", "wiring", "outlet", "lighting"], "alt": "Open electrical box with wires ready for a fixture", "credit": "Valentin Zickner"},
  {"id": "39Npb2siceI", "photo": "photo-1687819280272-95f9d2a3cdab", "people": true, "tags": ["electrical", "switch", "outlet", "lighting"], "alt": "Electrician fitting a light switch", "credit": "Michael Kahn"},
  {"id": "LP9D8zD4Xmw", "photo": "photo-1766507680004-1c71007aefe5", "people": false, "tags": ["electrical", "ev", "charger"], "alt": "Home EV charger mounted on a wood-clad wall", "credit": "dcbel"},
  {"id": "9RZlFXzrANI", "photo": "photo-1600490819528-42405785433a", "people": false, "tags": ["electrical", "ev", "charger"], "alt": "EV charger on a house wall with a white car parked beside it", "credit": "Evnex Ltd"},
  {"id": "BImvVKl-AaU", "photo": "photo-1764961576606-ffb05ace4062", "people": false, "tags": ["electrical", "lighting"], "alt": "Ceiling light fixture", "credit": "Tsuyoshi Kozu"},
  {"id": "MyBBMM317A4", "photo": "photo-1635424709845-3a85ad5e1f5e", "people": true, "tags": ["roofing", "roof-replacement", "installation"], "alt": "Two roofers working on an asphalt shingle roof with safety lines", "credit": "Raze Solar"},
  {"id": "RGkNFjRPyO0", "photo": "photo-1635424709961-f3a150459ad4", "people": true, "tags": ["roofing", "roof-replacement", "installation"], "alt": "Roofer nailing shingles on a pitched roof", "credit": "Raze Solar"},
  {"id": "umJz4M-iCOw", "photo": "photo-1635424709870-cdc6e64f0e20", "people": true, "tags": ["roofing", "roof-replacement"], "alt": "Roofing crew laying shingles", "credit": "Raze Solar"},
  {"id": "9u5r1XbtMJg", "photo": "photo-1573876384005-dabc14a8ccbd", "people": false, "tags": ["roofing", "shingles"], "alt": "Rows of asphalt shingles", "credit": "Hal Gatewood"},
  {"id": "jUiyOUQMHeE", "photo": "photo-1782274951165-b88199bde548", "people": false, "tags": ["roofing", "repair", "shingles"], "alt": "Shingle roof with a patched section", "credit": "blue soda"},
  {"id": "1poqbZY8PmM", "photo": "photo-1788457717357-706b8b123a1e", "people": false, "tags": ["roofing", "repair", "inspection", "cleaning"], "alt": "Moss growing on worn asphalt shingles", "credit": "Pro Wash"},
  {"id": "fYwPrfAQcMo", "photo": "photo-1665442348932-6e16d72fe163", "people": false, "tags": ["roofing", "gutter", "cleaning"], "alt": "Gutter filled with fallen leaves", "credit": "Jon Sailer"},
  {"id": "ccJ_tLTYvpE", "photo": "photo-1677945451878-de79f98149c9", "people": false, "tags": ["roofing", "gutter"], "alt": "Close-up of a metal gutter along a roofline", "credit": "Ian Talmacs"},
  {"id": "mrSuM73pmsw", "photo": "photo-1586982599726-11708daaceca", "people": false, "tags": ["home", "roofing"], "alt": "White two-storey house with a pitched roof behind trees", "credit": "Aubrey Odom"},
  {"id": "IBJAFSXmBhw", "photo": "photo-1738193830098-2d92352a1856", "people": false, "tags": ["landscaping", "lawn", "home"], "alt": "Green lawn and planted beds in front of a brick house", "credit": "MowCow Lawn & Landscape"},
  {"id": "1MNJ9y1Wr50", "photo": "photo-1734303023481-7508b5c9f1ff", "people": true, "tags": ["landscaping", "lawn", "mowing"], "alt": "Landscaper on a riding mower in front of a house", "credit": "Michael Smith"},
  {"id": "ZmcOLTGdMbQ", "photo": "photo-1748893790747-fc2646924cbe", "people": true, "tags": ["landscaping", "lawn", "mowing"], "alt": "Mowing a lawn with a push mower", "credit": "Marc Pell"},
  {"id": "zXH4Y7bRu3Y", "photo": "photo-1764969370921-7c8df49171cd", "people": false, "tags": ["landscaping", "lawn"], "alt": "Freshly mown striped lawn with trees", "credit": "MV Vacation"},
  {"id": "MJwb8dEQmr0", "photo": "photo-1632161293871-cf2083474e34", "people": false, "tags": ["landscaping", "design", "hardscape"], "alt": "Garden with brick paths and planted beds", "credit": "Annie Tray-Gavin"},
  {"id": "yP02OVtq-Ig", "photo": "photo-1633330948542-0b3bdeefcdb3", "people": false, "tags": ["landscaping", "hardscape", "patio", "design"], "alt": "Modern patio with outdoor dining and planting", "credit": "Tile Merchant Ireland"},
  {"id": "ZG-1o1R2YQ0", "photo": "photo-1754321860056-ca7254d5e7ac", "people": true, "tags": ["landscaping", "tree"], "alt": "Arborist cutting a tree with a chainsaw", "credit": "Zack Masters"},
  {"id": "LqfO4ieSPLQ", "photo": "photo-1657730391002-bf55ff069a80", "people": true, "tags": ["landscaping", "tree"], "alt": "Arborist climbing a tree in a harness", "credit": "Thomas Kinto"},
  {"id": "-zbcx0Lvsfw", "photo": "photo-1622122123829-e0490a288d04", "people": false, "tags": ["landscaping", "irrigation", "lawn"], "alt": "Sprinkler watering a lawn", "credit": "Paul Moody"},
  {"id": "AymI2mt9wRY", "photo": "photo-1541955193702-9ca03b1bb11a", "people": false, "tags": ["landscaping", "irrigation"], "alt": "Sprinkler spraying water in sunlight", "credit": "Methi SOMÇAĞ"},
  {"id": "A5IILTdd-WI", "photo": "photo-1657045898661-1a56bc5a8fd2", "people": false, "tags": ["landscaping", "hardscape", "patio", "pavers"], "alt": "Interlocking paver patio", "credit": "Philipp Torres"},
  {"id": "QgttfNe-dIE", "photo": "photo-1551394846-d03c5a4bc4bc", "people": false, "tags": ["landscaping", "hardscape", "pavers"], "alt": "Square pavers set in grass", "credit": "toinane"},
  {"id": "xSk8BLliYho", "photo": "photo-1786550028419-2f6696405f60", "people": false, "tags": ["landscaping", "beds", "mulch", "design"], "alt": "Planted bed edged with stone", "credit": "David Billington"},
  {"id": "rBY5Ek86oOI", "photo": "photo-1734079692079-172d8243ebd3", "people": true, "tags": ["landscaping", "hedge", "trimming"], "alt": "Trimming a hedge with a hedge trimmer", "credit": "FRAEM GmbH"},
  {"id": "aEcF58jG1n4", "photo": "photo-1599151893427-e09096e38d6d", "people": false, "tags": ["landscaping", "hedge", "trimming"], "alt": "Neatly trimmed hedge", "credit": "Osman Rana"},
  {"id": "iVEQ-zHveJU", "photo": "photo-1732381519643-fa3ad2937773", "people": true, "tags": ["landscaping", "cleanup", "leaves"], "alt": "Clearing autumn leaves with a leaf blower", "credit": "Yuriy Vertikov"},
  {"id": "PqyzuzFiQfY", "photo": "photo-1552693673-1bf958298935", "people": true, "tags": ["medspa", "facial", "hydrafacial"], "alt": "Gloved hands giving a client a facial treatment", "credit": "karelys Ruiz"},
  {"id": "HtXyytr9304", "photo": "photo-1713085085470-fba013d67e65", "people": true, "tags": ["medspa", "facial", "device", "microcurrent"], "alt": "Facial treatment with a handheld device", "credit": "Look Studio"},
  {"id": "6xlyKFFvufg", "photo": "photo-1595871151608-bc7abd1caca3", "people": false, "tags": ["medspa", "room"], "alt": "Clean, bright treatment room with a treatment bed", "credit": "Atikah Akhtar"},
  {"id": "3r2VpxyiZ88", "photo": "photo-1677945863250-be9b01f732b1", "people": true, "tags": ["medspa", "facial", "device"], "alt": "Treatment device held against a client's cheek", "credit": "Masum Rahimi"},
  {"id": "5IhxmNLK9dE", "photo": "photo-1598300195951-8667fec6f769", "people": false, "tags": ["medspa", "laser", "hair-removal"], "alt": "Laser handpiece against skin", "credit": "Sam Moghadam"},
  {"id": "nmN0MAHoFjQ", "photo": "photo-1746806942799-b4db209e9a6b", "people": true, "tags": ["medspa", "laser", "hair-removal"], "alt": "Gloved hand holding a laser handpiece", "credit": "Judy Beth Morris"},
  {"id": "2dIvsGzzMLk", "photo": "photo-1761819921052-2c34973e012c", "people": true, "tags": ["medspa", "injectables", "filler", "botox"], "alt": "Injection being given near the mouth by a gloved practitioner", "credit": "Patient Perfect"},
  {"id": "SH4pZQtTdOs", "photo": "photo-1761819922656-d1b77eef49c0", "people": true, "tags": ["medspa", "injectables", "filler", "botox"], "alt": "Cosmetic injection on the cheek", "credit": "Patient Perfect"},
  {"id": "ZbzYDboN7fg", "photo": "photo-1600334089648-b0d9d3028eb2", "people": true, "tags": ["medspa", "massage", "wellness"], "alt": "Hot stone massage on a client's back", "credit": "engin akyurt"},
  {"id": "VxAwTeiqDao", "photo": "photo-1540555700478-4be289fbecef", "people": false, "tags": ["medspa", "skincare", "products"], "alt": "Skincare bottle and folded towels", "credit": "Camille Brodard"},
  {"id": "npE_I2GzpHY", "photo": "photo-1693578538512-fc66f318c833", "people": false, "tags": ["medspa", "room", "reception"], "alt": "Calm spa lounge interior", "credit": "Sherzod Gulomov"},
  {"id": "g-m8EDc4X6Q", "photo": "photo-1616394584738-fc6e612e71b9", "people": true, "tags": ["medspa", "facial", "peel"], "alt": "Client with a facial mask being applied", "credit": "engin akyurt"},
  {"id": "p7_ZUPA2iHE", "photo": "photo-1603423942656-3130154623f8", "people": false, "tags": ["medspa", "reception", "room"], "alt": "Warm wood spa reception desk", "credit": "Pesce Huang"},
  {"id": "FaH3dpSlyaM", "photo": "photo-1781967654423-c68058a3f8d2", "people": false, "tags": ["medspa", "room", "reception"], "alt": "Softly lit spa lounge", "credit": "Declan Sun"},
  {"id": "V2Ks2FTkdEk", "photo": "photo-1739980213756-753aea153bb8", "people": false, "tags": ["medspa", "skincare", "products"], "alt": "Skincare serums arranged with dried flowers", "credit": "Aleksandrs Karevs"},
  {"id": "cTmJbqysgV8", "photo": "photo-1739980104488-408eff709fff", "people": false, "tags": ["medspa", "skincare", "products"], "alt": "Skincare bottles on a tray", "credit": "Aleksandrs Karevs"},
  {"id": "w4Dj3MshHQ0", "photo": "photo-1581182800629-7d90925ad072", "people": true, "tags": ["medspa", "portrait", "skin"], "alt": "Portrait of a woman with natural, clear skin in soft light", "credit": "Fleur Kaan"},
  {"id": "AYdqXiJ_MBM", "photo": "photo-1728727187824-85f1c610a671", "people": true, "tags": ["medspa", "portrait", "skin"], "alt": "Woman touching her face against a white background", "credit": "Look Studio"},
  {"id": "VcWqA204WWY", "photo": "photo-1751050743813-03d46859896c", "people": false, "tags": ["home"], "alt": "Tudor-style house with a front lawn", "credit": "Avi Werde"},
  {"id": "1EXlEKjiNuo", "photo": "photo-1783197677947-12060a1405fe", "people": false, "tags": ["home", "lawn"], "alt": "Two-storey home with a wide green lawn", "credit": "Roger Starnes Sr"},
  {"id": "-dcznEJPmsk", "photo": "photo-1625602812206-5ec545ca1231", "people": false, "tags": ["home"], "alt": "House with a white wraparound porch", "credit": "Ian MacDonald"},
  {"id": "dsu9V4MsRVw", "photo": "photo-1714836982299-7a3b6930e2f5", "people": false, "tags": ["home"], "alt": "Craftsman house with a covered front porch", "credit": "Clay Banks"},
  {"id": "gQVOj48jFuI", "photo": "photo-1787094517400-ee58a5decd95", "people": false, "tags": ["home", "roofing"], "alt": "Gambrel-roof house with a front porch", "credit": "Roger Starnes Sr"},
  {"id": "8kwMIeVhH94", "photo": "photo-1787094529169-5c27be24caac", "people": false, "tags": ["home"], "alt": "Blue-grey house with a front porch and garden", "credit": "Roger Starnes Sr"},
  {"id": "o-uPDNNSsDA", "photo": "photo-1682888813913-e13f18692019", "people": false, "tags": ["home-interior", "kitchen"], "alt": "Bright white kitchen with an island", "credit": "Zac Gudakov"},
  {"id": "ZtQBm7Q1XWg", "photo": "photo-1613545564235-db7af30081bf", "people": false, "tags": ["home-interior", "kitchen", "lighting"], "alt": "White kitchen with pendant lights", "credit": "Zac Gudakov"},
  {"id": "9M66C_w_ToM", "photo": "photo-1618221195710-dd6b41faaea6", "people": false, "tags": ["home-interior"], "alt": "Warm living room with large windows", "credit": "Spacejoy"}
]

export const url = (p, w = 1600) => `${CDN}${p.photo}?w=${w}&q=80&auto=format&fit=crop`
