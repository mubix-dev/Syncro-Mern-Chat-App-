import axios from "axios";
import { useEffect } from "react";
import { serverURL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsersData, setUserData } from "../redux/userSlice";

const useOtherUserData = () => { 
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const fetchUserData = async () => {
            if(!userData) return

            try {
                const result = await axios.get(`${serverURL}/api/user/others`, { 
                    withCredentials: true 
                });
                dispatch(setOtherUsersData(result.data));
            } catch (error) {
                console.error("Session check failed:", error.response?.data?.message || error.message);
            }
        };

        fetchUserData();
    }, [dispatch,userData]); 
};

export default useOtherUserData;