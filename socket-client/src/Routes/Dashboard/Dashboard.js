import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        async function fetchUsers() {
            // update users here ...
        }
        fetchUsers();
    },[])
    return (
        <div class="">

        </div>
    );
};

export default Dashboard;