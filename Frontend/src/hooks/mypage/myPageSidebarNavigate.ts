import { useNavigate, useLocation } from "react-router-dom";

const myPageSidebarNavigate = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const pagePaths = {
        profile: "/profile",
        mypageinformation: "/mypage/information",
        mypagelike: "/mypage/like",
        mypagehistory: "/mypage/history",
        mypagework: "/mypage/work",
    };

    return { navigate, location, pagePaths };
}

export default myPageSidebarNavigate;