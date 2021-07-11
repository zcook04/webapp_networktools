import {React, useState, useEffect} from 'react'
import axios from 'axios'

//Needs to be a protected page.

function MyDevices() {
    const [myDevices, setMyDevices] = useState([])

    useEffect(() => {
        const getData = async () => {
            try{
                const result = await axios(
                    '/api/v1/zack/mydevices'
                  );
                  setMyDevices(result.data)    
            } catch (err) {
                return err
            }
        }
        getData()
      },[]);


        return (
        <div className="page-wrapper">
            {myDevices && myDevices.map((device) => {
                return <p key={Object.keys(device)}>{Object.keys(device)}</p>
            })}
        </div>
    )
}

export default MyDevices
