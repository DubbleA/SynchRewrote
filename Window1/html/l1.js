var sufx = ["Alley", "Ally", "Aly", "Anex", "Annex", "Annx", "Anx", "Arc", "Arcade", "Av", "Ave", "Aven", "Avenu", "Avenue", "Avn", "Avnue", "Bayoo", "Bayou", "Bch", "Beach", "Bend", "Bnd", "Blf", "Bluf", "Bluff", "Bluffs", "Bot", "Btm", "Bottm", "Bottom", "Blvd", "Boul", "Boulevard", "Boulv", "Br", "Brnch", "Branch", "Brdge", "Brg", "Bridge", "Brk", "Brook", "Brooks", "Burg", "Burgs", "Byp", "Bypa", "Bypas", "Bypass", "Byps", "Camp", "Cp", "Cmp", "Canyn", "Canyon", "Cnyn", "Cape", "Cpe", "Causeway", "Causwa", "Cswy", "Cen", "Cent", "Center", "Centr", "Centre", "Cnter", "Cntr", "Ctr", "Centers", "Cir", "Circ", "Circl", "Circle", "Crcl", "Crcle", "Circles", "Clf", "Cliff", "Clfs", "Cliffs", "Clb", "Club", "Common", "Commons", "Cor", "Corner", "Corners", "Cors", "Course", "Crse", "Court", "Ct", "Courts", "Cts", "Cove", "Cv", "Coves", "Creek", "Crk", "Crescent", "Cres", "Crsent", "Crsnt", "Crest", "Crossing", "Crssng", "Xing", "Crossroad", "Crossroads", "Curve", "Dale", "Dl", "Dam", "Dm", "Div", "Divide", "Dv", "Dvd", "Dr", "Driv", "Drive", "Drv", "Drives", "Est", "Estate", "Estates", "Ests", "Exp", "Expr", "Express", "Expressway", "Expw", "Expy", "Ext", "Extension", "Extn", "Extnsn", "Exts", "Fall", "Falls", "Fls", "Ferry", "Frry", "Fry", "Field", "Fld", "Fields", "Flds", "Flat", "Flt", "Flats", "Flts", "Ford", "Frd", "Fords", "Forest", "Forests", "Frst", "Forg", "Forge", "Frg", "Forges", "Fork", "Frk", "Forks", "Frks", "Fort", "Frt", "Ft", "Freeway", "Freewy", "Frway", "Frwy", "Fwy", "Garden", "Gardn", "Grden", "Grdn", "Gardens", "Gdns", "Grdns", "Gateway", "Gatewy", "Gatway", "Gtway", "Gtwy", "Glen", "Gln", "Glens", "Green", "Grn", "Greens", "Grov", "Grove", "Grv", "Groves", "Harb", "Harbor", "Harbr", "Hbr", "Hrbor", "Harbors", "Haven", "Hvn", "Ht", "Hts", "Highway", "Highwy", "Hiway", "Hiwy", "Hway", "Hwy", "Hill", "Hl", "Hills", "Hls", "Hllw", "Hollow", "Hollows", "Holw", "Holws", "Inlt", "Is", "Island", "Islnd", "Islands", "Islnds", "Iss", "Isle", "Isles", "Jct", "Jction", "Jctn", "Junction", "Junctn", "Juncton", "Jctns", "Jcts", "Junctions", "Key", "Ky", "Keys", "Kys", "Knl", "Knol", "Knoll", "Knls", "Knolls", "Lk", "Lake", "Lks", "Lakes", "Land", "Landing", "Lndg", "Lndng", "Lane", "Ln", "Lgt", "Light", "Lights", "Lf", "Loaf", "Lck", "Lock", "Lcks", "Locks", "Ldg", "Ldge", "Lodg", "Lodge", "Loop", "Loops", "Mall", "Mnr", "Manor", "Manors", "Mnrs", "Meadow", "Mdw", "Mdws", "Meadows", "Medows", "Mews", "Mill", "Mills", "Missn", "Mssn", "Motorway", "Mnt", "Mt", "Mount", "Mntain", "Mntn", "Mountain", "Mountin", "Mtin", "Mtn", "Mntns", "Mountains", "Nck", "Neck", "Orch", "Orchard", "Orchrd", "Oval", "Ovl", "Overpass", "Park", "Prk", "Parks", "Parkway", "Parkwy", "Pkway", "Pkwy", "Pky", "Parkways", "Pkwys", "Pass", "Passage", "Path", "Paths", "Pike", "Pikes", "Pine", "Pines", "Pnes", "Pl", "Plain", "Pln", "Plains", "Plns", "Plaza", "Plz", "Plza", "Point", "Pt", "Points", "Pts", "Port", "Prt", "Ports", "Prts", "Pr", "Prairie", "Prr", "Rad", "Radial", "Radiel", "Radl", "Ramp", "Ranch", "Ranches", "Rnch", "Rnchs", "Rapid", "Rpd", "Rapids", "Rpds", "Rest", "Rst", "Rdg", "Rdge", "Ridge", "Rdgs", "Ridges", "Riv", "River", "Rvr", "Rivr", "Rd", "Road", "Roads", "Rds", "Route", "Row", "Rue", "Run", "Shl", "Shoal", "Shls", "Shoals", "Shoar", "Shore", "Shr", "Shoars", "Shores", "Shrs", "Skyway", "Spg", "Spng", "Spring", "Sprng", "Spgs", "Spngs", "Springs", "Sprngs", "Spur", "Spurs", "Sq", "Sqr", "Sqre", "Squ", "Square", "Sqrs", "Squares", "Sta", "Station", "Statn", "Stn", "Stra", "Strav", "Straven", "Stravenue", "Stravn", "Strvn", "Strvnue", "Stream", "Streme", "Strm", "Street", "Strt", "St", "Str", "Streets", "Smt", "Sumit", "Sumitt", "Summit", "Ter", "Terr", "Terrace", "Throughway", "Trace", "Traces", "Trce", "Track", "Tracks", "Trak", "Trk", "Trks", "Trafficway", "Trail", "Trails", "Trl", "Trls", "Trailer", "Trlr", "Trlrs", "Tunel", "Tunl", "Tunls", "Tunnel", "Tunnels", "Tunnl", "Trnpk", "Turnpike", "Turnpk", "Underpass", "Un", "Union", "Unions", "Valley", "Vally", "Vlly", "Vly", "Valleys", "Vlys", "Vdct", "Via", "Viadct", "Viaduct", "View", "Vw", "Views", "Vws", "Vill", "Villag", "Village", "Villg", "Villiage", "Vlg", "Villages", "Vlgs", "Ville", "Vl", "Vis", "Vist", "Vista", "Vst", "Vsta", "Walk", "Walks", "Wall", "Wy", "Way", "Ways", "Well", "Wells", "Wls"];
const prompt = require('prompt');
var adi1 = [];

// Gets addy and # jigged l1s
prompt.start();
console.log('input everything in your line 1 address except the last element');
console.log('YOU MUST INPUT A NUMBER 1-501');
prompt.get(['addy1', 'number'], (err, result) => {
    if (err) return console.log(err.message);

    // Log the results.
    console.log('Command-line input received:');
    console.log('  addy1: ' + result.addy1);
    console.log('  number: ' + result.number);

    const addy1 = (result.addy1).trim();
    let num = (result.number);

    if (num > 501) {
        num = 501;
    } else {
        const num = (result.number);
    }

    for (let i = 0; i < num; i++) {
        //chops off first element and puts it into temp var
        var tem = sufx.shift();
        // gets random suffix's and imports them onto the end of the address
        let l1s = `${addy1} ${tem}`;
        adi1.push(l1s)
        console.log(l1s);
    }

});