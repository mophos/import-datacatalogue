require('dotenv').config()
node_ssh = require('node-ssh')
ssh = new node_ssh()
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

var thaiIdCard = require('thai-id-card');
var findIndex = require('lodash').findIndex;
var uuidv4 = require('uuid/v4');

var url = `mongodb://${process.env.USER_MONGO}:${process.env.PASSWORD}@${process.env.IP_MONGFO}:${process.env.PORT}/${process.env.DATABASE}`;

main();

async function groupInsert(db) {
    var data = [];
    db.collection('new_person').aggregate([
        {
            "$group": {
                "_id": "$cid",
                "health_id": {
                    "$first": "$health_id"
                },
                "type_id": {
                    "$first": "$type_id"
                },
                "sex": {
                    "$first": "$sex"
                },
                "birth_date": {
                    "$first": "$birth_date"
                },
                "father_id": {
                    "$first": "$father_id"
                },
                "mother_id": {
                    "$first": "$mother_id"
                },
                "abo_group": {
                    "$first": "$abo_group"
                },
                "rh_group": {
                    "$first": "$rh_group"
                },
                "d_update": {
                    "$first": "$d_update"
                },
                "prename": {
                    "$first": "$prename"
                },
                "fname": {
                    "$first": "$fname"
                },
                "lname": {
                    "$first": "$lname"
                },
                "profile": {
                    "$push": {
                        "hospcode": "$hospcode",
                        "hn": "$hn",
                        "prename": "$prename",
                        "fname": "$fname",
                        "lname": "$lname",
                        "abo_group": "$abo_group",
                        "rh_group": "$rh_group",
                        "race": "$race",
                        "nation": "$nation",
                        "couple": "$couple",
                        "telephone": "$telephone"
                    },
                },
                //
            }
        },
        { "$limit": 100 }
    ], { allowDiskUse: true }, function (err, results) {
        for (var v of results) {
            data.push(v);
        }
    });
    return data;
}

async function main() {
    MongoClient.connect(url, async function (err, db) {
        var rs = await groupInsert(db);
        console.log(rs);
        // console.log(rs)
        // console.log(rs)
        // if (detail.length === 34) {
        //     var date = new Date().getFullYear();
        //     var _date = detail[9].substring(0, 4);

        //     if (thaiIdCard.verify(detail[1]) ? true : false && moment(detail[9], 'YYYY-MM-DD').isValid() && +_date < +date && detail[5].trim().charCodeAt() < 250 && detail[6].trim().charCodeAt() < 250) {
        //         const obj = {};
        //         obj.cid = detail[1];
        //         obj.health_id = uuidv4();
        //         obj.type_id = 1;
        //         obj.sex = checkSex(detail[8]);
        //         obj.birth_date = detail[9];
        //         obj.father_id = detail[18];
        //         obj.mother_id = detail[19];

        //         obj.abo_group = checkBloodGroup(detail[25]);
        //         obj.rh_group = checkRhGroup(detail[26]);
        //         obj.d_update = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        //         obj.prename = checkPrename(detail[4]);
        //         obj.fname = detail[5].trim();
        //         obj.lname = detail[6].trim();

        //         const profile = {}
        //         profile.hospcode = detail[0];
        //         profile.hn = detail[7];
        //         profile.prename = checkPrename(detail[4]);
        //         profile.fname = detail[5].trim();
        //         profile.lname = detail[6].trim();
        //         profile.abo_group = checkBloodGroup(detail[25]);
        //         profile.rh_group = checkRhGroup(detail[26]);
        //         profile.race = checkNationReligion(detail[13]);
        //         profile.nation = checkNationReligion(detail[14]);
        //         profile.couple = detail[20];
        //         profile.telephone = detail[31];

        //         obj.profile = [profile];
        // await insert(obj, db);
        // }
        // }
    })
}