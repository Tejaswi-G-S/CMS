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
    
    if(queryType === "login"){
        //Fetching login details 
        let username = info.split("|")[1];
        let password = info.split("|")[2];
        queryRun = `SELECT adminid, levelid FROM admin WHERE adminid = '${username}' and password = crypt('${password}', password)`
    }else if(queryType === "fetchAdminDetails"){
        //Fetching admin details 
        queryRun = `SELECT id, adminid, levelid FROM admin ORDER BY round(levelid::double precision) ASC`
    }else if(queryType === "fetchAdminDetailsSelected"){
        //Fetching selected admin details 
        let id = info.split("|")[1];
        queryRun = `SELECT id, adminid, levelid, levelonemid, leveltwomid, levelthreemid, levelfourmid, levelfivemid FROM admin WHERE id = '${id}'`
    }else if(queryType === "fetchLevelOneDetails"){
        //Fetch Level One Details 
        queryRun = `SELECT levelid, levelname FROM levelone ORDER BY round(levelid::double precision) ASC`
    }else if(queryType === "fetchLevelTwoDetails"){
        //Fetch Level Two Details 
        let mappingIdTwo = info.split("|")[1];
        queryRun = `SELECT levelid, levelname, mappingid FROM leveltwo WHERE mappingid = '${mappingIdTwo}' ORDER BY levelid ASC`
    }else if(queryType === "fetchLevelThreeDetails"){
        //Fetch Level Three Details 
        let mappingIdThree = info.split("|")[1];
        queryRun = `SELECT levelid, levelname, mappingid FROM levelthree WHERE mappingid = '${mappingIdThree}' ORDER BY levelid ASC`
    }else if(queryType === "fetchLevelFourDetails"){
        //Fetch Level Four Details 
        let mappingIdFour = info.split("|")[1];
        queryRun = `SELECT levelid, levelname, mappingid FROM levelfour WHERE mappingid = '${mappingIdFour}' ORDER BY levelid ASC`
    }else if(queryType === "fetchLevelFiveDetails"){
        //Fetch Level Five Details 
        let mappingIdFive = info.split("|")[1];
        queryRun = `SELECT levelid, levelname, mappingid FROM levelfive WHERE mappingid = '${mappingIdFive}' ORDER BY levelid ASC`
    }else if(queryType === "fetchComplaints"){
        //Fetch Complaints
        queryRun = `SELECT complaintid, complaintgivenby, uid, address, contactnumber, subject from complaints ORDER BY dateadded ASC`
    }else if(queryType === "fetchComplaintDetails"){
        let complaintId = info.split("|")[1];
        queryRun = `SELECT * from complaints WHERE complaintid = '${complaintId}'`
    }else if(queryType === "levelOneName"){
        let levelId = info.split("|")[1];
        queryRun = `SELECT levelname FROM levelone WHERE levelid = '${levelId}'`
    }else if(queryType === "levelTwoName"){
        let levelId = info.split("|")[1];
        queryRun = `SELECT levelname FROM leveltwo WHERE levelid = '${levelId}'`
    }else if(queryType === "levelThreeName"){
        let levelId = info.split("|")[1];
        queryRun = `SELECT levelname FROM levelthree WHERE levelid = '${levelId}'`
    }else if(queryType === "levelFourName"){
        let levelId = info.split("|")[1];
        queryRun = `SELECT levelname FROM levelfour WHERE levelid = '${levelId}'`
    }else if(queryType === "levelFiveName"){
        let levelId = info.split("|")[1];
        queryRun = `SELECT levelname FROM levelfive WHERE levelid = '${levelId}'`
    }else if(queryType === "fetchAdminByLevels"){
        let columnName = info.split("|")[1];
        columnName = `${columnName.toLowerCase()}mid`;
        let levelId = info.split("|")[2];
        queryRun = `SELECT id, adminid, levelid FROM admin WHERE ${columnName} = '${levelId}' ORDER BY round(levelid::double precision) ASC`
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
    if(queryType === "createAdmin"){
        let levelid = info.split("|")[1];
        let {adminName, levelOne, levelTwo, levelThree, levelFour, levelFive} = JSON.parse(info.split("|")[2]);
        queryRun = `INSERT INTO admin (adminid, password, levelid, levelonemid, leveltwomid, levelthreemid, levelfourmid, levelfivemid, dateadded) VALUES ('${adminName}', crypt('1234567', gen_salt('md5')), '${levelid}', '${levelOne}', '${levelTwo}', '${levelThree}', '${levelFour}', '${levelFive}', '${date}')`
    }else if(queryType === "submitComplaint"){
        console.log("-------------------------------------SUBmit------------------------")
        function makeid() {
            var complaintId = 'CMS-';
            var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (var i = 0; i < 10; i++)
                complaintId += pattern.charAt(Math.floor(Math.random() * pattern.length));
            return complaintId;
        }
        let complaintId = makeid();
        let {nameOfCP, uid, address, phoneNumber, email, subject, description, underAdminId, levelId, levelOne, levelTwo, levelThree, levelFour, levelFive} = JSON.parse(info.split("|")[1]);
        queryRun = `INSERT INTO complaints (complaintid, complaintgivenby, uid, address, contactnumber, emailid, subject, description, complaintunder, levelid, levelonemid, leveltwomid, levelthreemid, levelfourmid, levelfivemid, dateadded) VALUES ('${complaintId}', '${nameOfCP}', '${uid}', '${address}', '${phoneNumber}', '${email}', '${subject}', '${description}', '${underAdminId}', '${levelId}', '${levelOne}', '${levelTwo}', '${levelThree}', '${levelFour}', '${levelFive}', '${date}')`
    }

    //Run set data query ************************ 
    console.log("Query ********", queryRun)
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

