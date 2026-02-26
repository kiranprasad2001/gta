/**
 * TTC Subway station data — static infrastructure, rarely changes.
 * Extracted from https://www.ttc.ca/ttcapi/routedetail/get?id=<lineId>
 * Line 1: Yonge-University (yellow)
 * Line 2: Bloor-Danforth (green)
 * Line 3: Scarborough RT (blue) — CLOSED, kept for reference
 * Line 4: Sheppard (purple)
 */

export interface SubwayStation {
    name: string;
    lat: number;
    lon: number;
    code: string;
    isAccessible?: boolean;
}

export interface SubwayLine {
    id: number;
    name: string;
    color: string;
    stations: SubwayStation[];
}

export const SUBWAY_LINES: SubwayLine[] = [
    {
        id: 1,
        name: "Line 1 Yonge-University",
        color: "#FFCE00",
        stations: [
            // Yonge branch (south from Finch)
            { name: "Finch", lat: 43.7801, lon: -79.4157, code: "14111" },
            { name: "North York Centre", lat: 43.7673, lon: -79.4125, code: "13789" },
            { name: "Sheppard-Yonge", lat: 43.7603, lon: -79.4107, code: "13860" },
            { name: "York Mills", lat: 43.7432, lon: -79.4060, code: "13792" },
            { name: "Lawrence", lat: 43.7253, lon: -79.4023, code: "13793" },
            { name: "Eglinton", lat: 43.7046, lon: -79.3989, code: "13795" },
            { name: "Davisville", lat: 43.6970, lon: -79.3969, code: "13798" },
            { name: "St Clair", lat: 43.6874, lon: -79.3931, code: "13799" },
            { name: "Summerhill", lat: 43.6820, lon: -79.3908, code: "13802", isAccessible: false },
            { name: "Rosedale", lat: 43.6760, lon: -79.3881, code: "13803", isAccessible: false },
            { name: "Bloor-Yonge", lat: 43.6700, lon: -79.3854, code: "13864" },
            { name: "Wellesley", lat: 43.6649, lon: -79.3835, code: "13806" },
            { name: "College", lat: 43.6601, lon: -79.3827, code: "13807", isAccessible: false },
            { name: "TMU", lat: 43.6559, lon: -79.3808, code: "13810" },
            { name: "Queen", lat: 43.6521, lon: -79.3792, code: "13811" },
            { name: "King", lat: 43.6484, lon: -79.3777, code: "13814", isAccessible: false },
            { name: "Union", lat: 43.6456, lon: -79.3815, code: "13815" },
            // University branch (north from Union)
            { name: "St Andrew", lat: 43.6482, lon: -79.3851, code: "13817" },
            { name: "Osgoode", lat: 43.6517, lon: -79.3869, code: "13820" },
            { name: "St Patrick", lat: 43.6552, lon: -79.3884, code: "13821" },
            { name: "Queen's Park", lat: 43.6605, lon: -79.3907, code: "13824" },
            { name: "Museum", lat: 43.6672, lon: -79.3934, code: "13825", isAccessible: false },
            { name: "St George", lat: 43.6682, lon: -79.3997, code: "13858" },
            { name: "Spadina", lat: 43.6702, lon: -79.4052, code: "13853" },
            { name: "Dupont", lat: 43.6749, lon: -79.4071, code: "13828" },
            { name: "St Clair West", lat: 43.6851, lon: -79.4159, code: "13829" },
            { name: "Cedarvale", lat: 43.7006, lon: -79.4367, code: "13832" },
            { name: "Glencairn", lat: 43.7091, lon: -79.4409, code: "13833" },
            { name: "Lawrence West", lat: 43.7158, lon: -79.4440, code: "13836" },
            { name: "Yorkdale", lat: 43.7252, lon: -79.4477, code: "13837" },
            { name: "Wilson", lat: 43.7350, lon: -79.4502, code: "13840" },
            { name: "Sheppard West", lat: 43.7502, lon: -79.4628, code: "14945" },
            { name: "Downsview Park", lat: 43.7533, lon: -79.4787, code: "15664" },
            { name: "Finch West", lat: 43.7649, lon: -79.4911, code: "15659" },
            { name: "York University", lat: 43.7741, lon: -79.4999, code: "15666" },
            { name: "Pioneer Village", lat: 43.7767, lon: -79.5093, code: "15656" },
            { name: "Highway 407", lat: 43.7834, lon: -79.5235, code: "15661" },
            { name: "Vaughan MC", lat: 43.7940, lon: -79.5279, code: "15662" },
        ],
    },
    {
        id: 2,
        name: "Line 2 Bloor-Danforth",
        color: "#00A94F",
        stations: [
            { name: "Kipling", lat: 43.6372, lon: -79.5361, code: "13868" },
            { name: "Islington", lat: 43.6453, lon: -79.5242, code: "13869", isAccessible: false },
            { name: "Royal York", lat: 43.6484, lon: -79.5107, code: "13870" },
            { name: "Old Mill", lat: 43.6500, lon: -79.4954, code: "13871", isAccessible: false },
            { name: "Jane", lat: 43.6497, lon: -79.4842, code: "13872" },
            { name: "Runnymede", lat: 43.6512, lon: -79.4756, code: "13873" },
            { name: "High Park", lat: 43.6541, lon: -79.4668, code: "13874", isAccessible: false },
            { name: "Keele", lat: 43.6556, lon: -79.4586, code: "13875" },
            { name: "Dundas West", lat: 43.6567, lon: -79.4528, code: "13876" },
            { name: "Lansdowne", lat: 43.6592, lon: -79.4424, code: "13877" },
            { name: "Dufferin", lat: 43.6601, lon: -79.4357, code: "13878" },
            { name: "Ossington", lat: 43.6623, lon: -79.4265, code: "13879" },
            { name: "Christie", lat: 43.6641, lon: -79.4184, code: "13880" },
            { name: "Bathurst", lat: 43.6660, lon: -79.4112, code: "13881" },
            { name: "Spadina", lat: 43.6672, lon: -79.4038, code: "13855" },
            { name: "St George", lat: 43.6683, lon: -79.3997, code: "13856" },
            { name: "Bay", lat: 43.6700, lon: -79.3903, code: "13882" },
            { name: "Bloor-Yonge", lat: 43.6710, lon: -79.3859, code: "13865" },
            { name: "Sherbourne", lat: 43.6723, lon: -79.3766, code: "13883" },
            { name: "Castle Frank", lat: 43.6738, lon: -79.3686, code: "13884" },
            { name: "Broadview", lat: 43.6769, lon: -79.3587, code: "13885" },
            { name: "Chester", lat: 43.6784, lon: -79.3524, code: "13886" },
            { name: "Pape", lat: 43.6801, lon: -79.3448, code: "13887" },
            { name: "Donlands", lat: 43.6808, lon: -79.3370, code: "13888" },
            { name: "Greenwood", lat: 43.6820, lon: -79.3302, code: "13889" },
            { name: "Coxwell", lat: 43.6839, lon: -79.3234, code: "13890" },
            { name: "Woodbine", lat: 43.6862, lon: -79.3128, code: "13891" },
            { name: "Main Street", lat: 43.6890, lon: -79.3016, code: "13892" },
            { name: "Victoria Park", lat: 43.6922, lon: -79.2898, code: "13893" },
            { name: "Warden", lat: 43.6937, lon: -79.2796, code: "13894", isAccessible: false },
            { name: "Kennedy", lat: 43.7327, lon: -79.2638, code: "13895" },
        ],
    },
    {
        id: 4,
        name: "Line 4 Sheppard",
        color: "#B10DC9",
        stations: [
            { name: "Sheppard-Yonge", lat: 43.7613, lon: -79.4107, code: "13860" },
            { name: "Bayview", lat: 43.7670, lon: -79.3864, code: "13896" },
            { name: "Bessarion", lat: 43.7693, lon: -79.3764, code: "13897" },
            { name: "Leslie", lat: 43.7710, lon: -79.3659, code: "13898" },
            { name: "Don Mills", lat: 43.7757, lon: -79.3462, code: "13899" },
        ],
    },
    {
        id: 5,
        name: "Line 5 Eglinton",
        color: "#F8631F", // Eglinton Crosstown orange
        stations: [
            { name: "Mount Dennis", lat: 43.6880, lon: -79.4857, code: "16067" },
            { name: "Keelesdale", lat: 43.6904, lon: -79.4745, code: "16202" },
            { name: "Caledonia", lat: 43.6923, lon: -79.4650, code: "16083" },
            { name: "Fairbank", lat: 43.6957, lon: -79.4492, code: "16204" },
            { name: "Oakwood", lat: 43.6974, lon: -79.4427, code: "16206" },
            { name: "Cedarvale", lat: 43.6989, lon: -79.4356, code: "16069" },
            { name: "Forest Hill", lat: 43.7011, lon: -79.4250, code: "16208" },
            { name: "Chaplin", lat: 43.7029, lon: -79.4170, code: "16210" },
            { name: "Avenue", lat: 43.7047, lon: -79.4087, code: "16071" },
            { name: "Eglinton", lat: 43.7063, lon: -79.3987, code: "16073" },
            { name: "Mount Pleasant", lat: 43.7085, lon: -79.3903, code: "16212" },
            { name: "Leaside", lat: 43.7107, lon: -79.3764, code: "16214" },
            { name: "Laird", lat: 43.7132, lon: -79.3647, code: "16075" },
            { name: "Sunnybrook Park", lat: 43.7173, lon: -79.3487, code: "16216" },
            { name: "Don Valley", lat: 43.7200, lon: -79.3389, code: "16077" },
            { name: "Aga Khan Park & Museum", lat: 43.7224, lon: -79.3322, code: "16218" },
            { name: "Wynford", lat: 43.7241, lon: -79.3262, code: "16220" },
            { name: "Sloane", lat: 43.7258, lon: -79.3122, code: "16079" },
            { name: "O'Connor", lat: 43.7248, lon: -79.3013, code: "16222" },
            { name: "Pharmacy", lat: 43.7258, lon: -79.2963, code: "16224" },
            { name: "Hakimi Lebovic", lat: 43.7272, lon: -79.2902, code: "16226" },
            { name: "Golden Mile", lat: 43.7281, lon: -79.2863, code: "16085" },
            { name: "Birchmount", lat: 43.7302, lon: -79.2766, code: "16228" },
            { name: "Ionview", lat: 43.7313, lon: -79.2716, code: "16230" },
            { name: "Kennedy", lat: 43.7327, lon: -79.2638, code: "16081" },
        ],
    },
    {
        id: 6,
        name: "Line 6 Finch West",
        color: "#B2B2B2", // Finch West grey
        stations: [
            { name: "Humber College", lat: 43.7291, lon: -79.6033, code: "FW18" },
            { name: "Westmore", lat: 43.7335, lon: -79.6001, code: "FW17" },
            { name: "Martin Grove", lat: 43.7371, lon: -79.5898, code: "FW16" },
            { name: "Albion", lat: 43.7380, lon: -79.5873, code: "FW15" },
            { name: "Stevenson", lat: 43.7397, lon: -79.5828, code: "FW14" },
            { name: "Mount Olive", lat: 43.7410, lon: -79.5786, code: "FW13" },
            { name: "Rowntree Wood", lat: 43.7432, lon: -79.5721, code: "FW12" },
            { name: "Pearldale", lat: 43.7447, lon: -79.5670, code: "FW11" },
            { name: "Duncanwoods", lat: 43.7460, lon: -79.5620, code: "FW10" },
            { name: "Milvan Rumike", lat: 43.7483, lon: -79.5532, code: "FW09" },
            { name: "Emery", lat: 43.7505, lon: -79.5445, code: "FW08" },
            { name: "Signet Arrow", lat: 43.7533, lon: -79.5332, code: "FW07" },
            { name: "Norfinch Oakdale", lat: 43.7547, lon: -79.5280, code: "FW06" },
            { name: "Jane and Finch", lat: 43.7565, lon: -79.5204, code: "FW05" },
            { name: "Driftwood", lat: 43.7592, lon: -79.5085, code: "FW04" },
            { name: "Tobermory", lat: 43.7611, lon: -79.5028, code: "FW03" },
            { name: "Sentinel", lat: 43.7618, lon: -79.4998, code: "FW02" },
            { name: "Finch West", lat: 43.7649, lon: -79.4911, code: "FW01" },
        ],
    },
];
