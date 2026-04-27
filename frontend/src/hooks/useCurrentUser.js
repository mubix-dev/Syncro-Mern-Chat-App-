import axios from "axios";
import { useEffect } from "react";
import { serverURL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useCurrentUser = () => { // Renamed to follow hook conventions
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userData) return; 

            try {
                const result = await axios.get(`${serverURL}/api/user/current`, { 
                    withCredentials: true 
                });
                dispatch(setUserData(result.data));
            } catch (error) {
                console.error("Session check failed:", error.response?.data?.message || error.message);
            }
        };

        fetchUserData();
    }, [dispatch]); // Only depend on dispatch (which is stable)
};

export default useCurrentUser;