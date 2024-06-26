import React, { useEffect, useState } from 'react'
import Combining from './charts/BarsChart'
import PieActiveArc from './charts/PieChart'
import toast from "react-hot-toast";
import createAxiosInstance from '../../features/AxiosInstance';
import { Messages } from './Messages';
const AdminAnna = () => {
    const instance = createAxiosInstance();
    const [data, setData] = useState([]);
    const [Achv, setAchv] = useState([]);

    const getAllUser = () => {
        instance
            .get("/all-users")
            .then((res) => {
                setData(Array.isArray(res.data) ? res.data : []);
            })
            .catch((error) => {
                toast.error("Server error");
            });
    };
    const AllAchivements = () => {
        instance
            .get("/achievement-data")
            .then((res) => {
                res.data.map((data, index) => {
                    setAchv(prevAchv => [...prevAchv, { "achivement": data.name, "total": data.num_of_users }]);
                });

            })
            .catch((error) => {
                toast.error("Server error");
            });
    };
    useEffect(() => {
        getAllUser();
        AllAchivements();
    }, []);
    const getUserCountsByRole = () => {
        return data.reduce((acc, user) => {
            acc[user.user_role] = (acc[user.user_role] || 0) + 1;
            return acc;
        }, {});
    };
    const getUserCountsByRoleToday = () => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const result = data.reduce((acc, user) => {
            const userDate = user.created_at.split('T')[0]; // Extract date part from created_at
            // console.log(userDate)
            if (userDate === today) {
                acc[user.user_role] = (acc[user.user_role] || 0) + 1;
            }

            return acc;
        }, {});

        // console.log('Result:', result);
        return result;
    };

    const userCountsToday = getUserCountsByRoleToday();
    const userCounts = getUserCountsByRole();

    //---------------pie chart data
    const Newdata = [
        { id: 0, value: userCountsToday["Waste Collector"], label: `New Waste Collector ` },
        { id: 1, value: userCountsToday["Household User"], label: `New Household ` },
        { id: 2, value: userCountsToday["admin"], label: `New Adimins ` },
    ];
    const Olddata = [
        { id: 0, value: userCounts["Waste Collector"], label: `Waste Collectors ` },
        { id: 1, value: userCounts["Household User"], label: `Householders ` },
        { id: 2, value: userCounts["admin"], label: `Adimins ` },
    ];
    const primaryPalette = ['#FF6384', '#36A2EB', '#FFCE56'];
    const secondaryPalette = ['#87CEEB', '#ADD8E6', '#90EE90'];

    //--------------------------bar chart
    console.log(Achv)
    return (
        <>

            <div className="flex gap-2 max-xl:flex-wrap max-xl:text-xs">
                <div className="w-full">
                    <Combining dataset={Achv} title={"Total User Achievements"}></Combining>
                </div>
                <div className="w-full">
                    <PieActiveArc data={Newdata} palette={primaryPalette} title={"Today Eco-Track Users Analysis"}></PieActiveArc>
                    <PieActiveArc data={Olddata} palette={secondaryPalette} title={"All Eco-Track Users Analysis"}></PieActiveArc>
                </div>
            </div>
            <h2 className="text-xl text-primary">New chats</h2>
            <div className="flex gap-2 max-xl:flex-wrap max-xl:text-xs">
                <Messages/>
            </div>
        </>
    )
}
export default AdminAnna
