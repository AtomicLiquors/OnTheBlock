import { checkFollow, addFollow, deleteFollow } from "@/api/follow";
import { getUserInfo } from "@/api/member";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const profileInfoFollowHook = (memberId: string) => {
  // To-Do : userData와 Follow 로직이 엮여 있다. (handleAddFollow, handleDeleteFollow)
  // 분리할 방법은?

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: null,
    nickname: "",
    description: "",
  });

  const [checkFollowData, setCheckFollowData] = useState(2);


  useEffect(() => {
    if (!memberId) return;
    getUserInfo(memberId).then((response) => {
      setUserData(response.data);
    });
    checkFollow(memberId).then((response) => {
      setCheckFollowData(response.data);
    });
  }, [memberId]);

  const handleAddFollow = async (memberId: string) => {
    try {
      const response = await addFollow(memberId);
      setUserData((prevData) => ({
        ...prevData,
        followers: response.data.followers,
      }));
      const isFollowing = await checkFollow(memberId);
      setCheckFollowData(isFollowing.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFollow = async (memberId: string) => {
    try {
      const response = await deleteFollow(memberId);
      setUserData((prevData) => ({
        ...prevData,
        followers: response.data.followers,
      }));
      const isFollowing = await checkFollow(memberId);
      setCheckFollowData(isFollowing.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [followInfoVisibility, setFollowInfoVisibility] = useState(false);
  const toggleFollowInfoMenu = () => {
    setFollowInfoVisibility(!followInfoVisibility);
  };

  return {
    userData,
    checkFollowData,
    handleAddFollow,
    handleDeleteFollow,
    followInfoVisibility,
    toggleFollowInfoMenu,
  };
};

export default profileInfoFollowHook;
