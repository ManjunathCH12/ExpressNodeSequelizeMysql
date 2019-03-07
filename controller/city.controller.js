const db = require('../sequelize');
const City = db.city;
const Country = db.country;

// fetches all cities
exports.findAll = (req, res) => {
    City.findAll().then(cities => {
        // console.log('response == ', cities);
        res.send(cities);
    }).catch(err => {
        console.log('Err while fetching data', err);
    })
}

// fetching cities with pagination
exports.findByPage = (req, res) => {
    console.log(req.params.page);
    let limit = 50;
    City.findAndCountAll().then((data) => {
        //  console.log('count == ', data.count);
        let page = req.params.page;
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        // console.log(`pages == ${pages} and offset == ${offset}`);
        City.findAll({
            limit: limit,
            offset: offset
        }).then((cities) => {
            // console.log('Cities == ', cities);
            res.status(200).json({'count': data.count, 'pages': pages, 'result': cities});
        }).catch(err => {
            console.log('Err while fetching data');
            res.status(400).send('Err while fetching data');
        });

    })
}

// fetching cities according to country
exports.cityBelongtoCountry = (req,res) => {
    
    Country.findAll({
        include :[
            {
                model: db.city,
                where : {
                    population: {
                        $gte : 200000
                    }
                }
            },
        ],
        where : {
            code: ['AFG', 'ALB']
            
        }
        
    }).then(countries => {
        res.status(200).json({result: countries});
    }).catch(err => {
        console.log('Err while fetching data');
        res.status(400).send('Err while fetching data');
    });
}

exports.selectAll = (req,res) => {
    db.dbCon.query("SELECT * FROM city WHERE countrycode = $code", 
    {bind: {code: req.params.code}, type: db.dbCon.QueryTypes.SELECT})
    .then(cities => {
        res.status(200).json({results: cities});
    }).catch(err => {
        res.status(400).send('Err while retrieving data');
    });

}

exports.findCountry = (req,res) => {
    db.dbCon.query("SELECT code, name FROM country" +
    " WHERE code in (select countrycode FROM city" +
    " group by countrycode" +
    " having sum(Population) > 4000000)", {type: db.dbCon.QueryTypes.SELECT})
    .then(countries => {
        res.status(200).json({results: countries});
    }).catch(err => {
        res.status(400).send('Err while retrieving data');
    });
}