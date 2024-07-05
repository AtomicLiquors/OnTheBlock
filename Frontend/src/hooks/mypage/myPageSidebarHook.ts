import { getMyUserInfo } from "@/api/member";
import { useState, useEffect } from "react";

const myPageSidebarHook = () => {
    const [userData, setUserData] = useState({
        id: null,
        nickname: "",
        description: "",
    });

    useEffect(() => {
        getMyUserInfo().then((response) => {
        setUserData(response.data);
        });
    }, []);

    const [followInfoVisibility, setFollowInfoVisibility] = useState(false);
    const toggleFollowInfoMenu = () => {
        setFollowInfoVisibility(!followInfoVisibility);
    };

    return { userData, followInfoVisibility, toggleFollowInfoMenu };
};

export default myPageSidebarHook;
