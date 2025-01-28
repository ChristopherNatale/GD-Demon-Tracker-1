export default function ComparisonTable({allDemons, user1Demons, user2Demons, user1, user2}) {

   
    const uniqueDemons = allDemons.filter((demon1, i, arr) => 
        arr.findIndex(demon2 => (demon2.levelID === demon1.levelID)) === i
); //Quickly filter out the duplicates from the JOIN query, so we can map the demons in the table.

    const user1levelIDs = [];
    const user2levelIDs = [];

    for (let i = 0; i < user1Demons.length; i++) {
        user1levelIDs.push(user1Demons[i].levelID);
    }

    for (let i = 0; i < user2Demons.length; i++) {
        user2levelIDs.push(user2Demons[i].levelID);
    }

    console.log(uniqueDemons);

   function checkDemonComplete(levelID, user) {
        if (user === user1) {
            if (user1levelIDs.includes(levelID)) {
                const targetDemon = user1Demons.find((demon) => {
                   return +demon.levelID === +levelID;
                })
                if (!targetDemon) {
                    return false;
                }
                else if (targetDemon.status !== "Complete") {
                    return false;
                }
                else if (targetDemon.status === "Complete") {
                    return true;
                }  
            }
            else {
                return false;
            }
        }

        else if (user2levelIDs.includes(levelID)) {
            const targetDemon = user2Demons.find((demon) => {
                return demon.levelID === levelID;
            })

            if (!targetDemon) {
                return false;
            }
            else if (targetDemon.status !== "Complete") {
                return false;
            }
            else if (targetDemon.status === "Complete") {
                return true;
            }    
        }
        else {
            return false;
        }
    }

    return (
    <div className="tableContainer">
    <h1> Completed Demons </h1>
    <table className="comparisonTable">
        <tr>
            <th className="demonInfo"> Demon </th>
            <th className="demonInfo"> Creator </th>
            <th> {user1} </th>
            <th> {user2} </th>
        </tr>
        {(uniqueDemons.map((demon) => {
            return (
        <tr>
            <td> {demon.name} </td>
            <td> {demon.creator} </td>
            <td> {checkDemonComplete(demon.levelID, user1) ? 
                (<input type="checkbox" checked disabled/>) :
                (<input type="checkbox" disabled/>)} </td>
            <td> {checkDemonComplete(demon.levelID, user2) ? 
                (<input type="checkbox" checked disabled/>) :
                (<input type="checkbox" disabled/>)} </td>
        </tr>
            )
        }))}

    </table>
    </div>
    )
}