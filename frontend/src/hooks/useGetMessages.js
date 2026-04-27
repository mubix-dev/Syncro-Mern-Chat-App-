import axios from "axios";
import { useEffect } from "react";
import { serverURL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => { 
    const dispatch = useDispatch();
    const { userData, selectedUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchMessages = async () => {
            // 1. Safety check: Don't fetch if no user is selected
            if (!userData || !selectedUser?._id) {
                // If no user is selected (e.g. going back to welcome screen), clear messages
                dispatch(setMessages([]));
                return;
            }

            try {
                // 2. Clear messages IMMEDIATELY when switching users
                // This prevents seeing User A's messages while User B's are loading
                dispatch(setMessages([]));

                const result = await axios.get(`${serverURL}/api/message/get/${selectedUser._id}`, { 
                    withCredentials: true 
                });
                
                dispatch(setMessages(result.data));
            } catch (error) {
                // If 404 (No conversation yet), set to empty array instead of keeping old ones
                dispatch(setMessages([]));
                console.error("Fetch messages failed:", error.response?.data?.message || error.message);
            }
        };

        fetchMessages();
        
        // 3. Optional: Cleanup function when component unmounts
        return () => {
            // If the user navigates away, we don't want the last chat stuck in memory
            // dispatch(setMessages([])); 
        };
    }, [selectedUser?._id, userData?._id, dispatch]); // Use IDs for stable dependencies
};

export default useGetMessages;