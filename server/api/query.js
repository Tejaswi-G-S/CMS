// Datebase connection
const { Client } = require('pg');
client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'CMS',
    password: 'postgres@7',
    port: 5432
})
client.connect();

// Queries start ****************************************************
const retrieveData = (request, response) => {
    console.log(request.params)
    let info = request.params.id;
    let queryType = info.split("|")[0]
    
    switch(queryType) {
        case "login":
            //Fetching login details 
            let username = info.split("|")[1];
            let password = info.split("|")[2];
            queryRun = `SELECT adminid, levelid FROM admin WHERE adminid = '${username}' and password = crypt('${password}', password)`
            break;
        case "fetchAdminDetails":
            //Fetching admin details 
            queryRun = `SELECT id, adminid, levelid FROM admin ORDER BY round(levelid::double precision) ASC`
            break;
        case "fetchAdminDetailsSelected":
            //Fetching selected admin details 
            let id = info.split("|")[1];
            queryRun = `SELECT id, adminid, levelid, levelonemid, leveltwomid, levelthreemid, levelfourmid, levelfivemid FROM admin WHERE id = '${id}'`
            break;
        case "fetchLevelOneDetails":
            //Fetch Level One Details 
            queryRun = `SELECT levelid, levelname FROM levelone ORDER BY round(levelid::double precision) ASC`
            break;
        case "fetchLevelTwoDetails":
            //Fetch Level Two Details 
            let mappingIdTwo = info.split("|")[1];
            queryRun = `SELECT levelid, levelname, mappingid FROM leveltwo WHERE mappingid = '${mappingIdTwo}' ORDER BY levelid ASC`
            break;
        case "fetchLevelThreeDetails":
            //Fetch Level Three Details 
            let mappingIdThree = info.split("|")[1];
            queryRun = `SELECT levelid, levelname, mappingid FROM levelthree WHERE mappingid = '${mappingIdThree}' ORDER BY levelid ASC`
            break;
        case "fetchLevelFourDetails":
            //Fetch Level Four Details 
            let mappingIdFour = info.split("|")[1];
            queryRun = `SELECT levelid, levelname, mappingid FROM levelfour WHERE mappingid = '${mappingIdFour}' ORDER BY levelid ASC`
            break;
        case "fetchLevelFiveDetails":
            //Fetch Level Five Details 
            let mappingIdFive = info.split("|")[1];
            queryRun = `SELECT levelid, levelname, mappingid FROM levelfive WHERE mappingid = '${mappingIdFive}' ORDER BY levelid ASC`
            break;
        default:
            console.log("Doesnot match with any of get queries")
            break;
    } 
    
    //Run get data query ************************ 
    client.query(queryRun, (error, results) => {
        console.log(queryRun)
        if (error) {
          console.log(error)
          response.status(500).send({
              result:false,
              message: error
          });
        }else{
            console.log(results)
            if(results.rowCount > 0){
                response.status(200).json({
                    success: true,
                    result: results.rows,
                    message: "Data fetched successfully"
                })
            }else{
                response.status(200).json({
                    success: false,
                    message: "No records found"
                })
            }
        }
    })
}

const storeData = (request, response) => {
    console.log(request.params)
    let date = new Date();
    date = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    let info = request.params.id;
    let queryType = info.split("|")[0]
    switch(queryType) {
        case "createUser":
            let levelid = info.split("|")[1];
            let {userName, levelOne, levelTwo, levelThree, levelFour, levelFive} = JSON.parse(info.split("|")[2]);
            console.log(userName, levelOne, levelTwo, levelThree, levelFour, levelFive)
            queryRun = `INSERT INTO admin (adminid, password, levelid, levelonemid, leveltwomid, levelthreemid, levelfourmid, levelfivemid, dateadded) VALUES ('${userName}', crypt('1234567', gen_salt('md5')), '${levelid}', '${levelOne}', '${levelTwo}', '${levelThree}', '${levelFour}', '${levelFive}', '${date}')`
            console.log(queryRun)
            break;
        default:  
            console.log("Doesnot match with any of set queries")  
    }

    //Run set data query ************************ 
    client.query(queryRun, (error, results) => {
        if (error) {
          console.log(error)
          response.status(500).send({
              result:false,
              message: error
          });
        }else{
            console.log(results)
            response.status(200).json({
                success: true,
                message: "Data inserted successfully"
            })
        }
    })
}
// Queries end ****************************************************

//Module export ***************************************************
module.exports = {
    retrieveData,
    storeData
}
//Module export ***************************************************

