import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CgProfile as ProfileIcon } from "react-icons/cg";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import FollowerModal from "@/components/follow/FollowerModal";
import FollowingModal from "@/components/follow/FollowingModal";
import { getUserInfo } from "@/api/member";
import { checkFollow, addFollow, deleteFollow,  } from "@/api/follow";
import { ProfileImg } from "@/components";
import profileInfoFollowHook from "@/hooks/profile/profileInfoFollowHook";

function ProfileInfo() {


  const { memberId } = useParams();

  //To-Do: memberId 입력하지 않았을 시 리디렉션 또는 에러처리.
  // 그 후 memberId! 전부 수정.

  const {
    userData,
    checkFollowData,
    handleAddFollow,
    handleDeleteFollow,
    followInfoVisibility,
    toggleFollowInfoMenu,
  } = profileInfoFollowHook(memberId!);


  return (
    <>
      <S.Wrap>
        <S.Card>
          <S.CardBody>
              <S.LeftSection>
                <ProfileImg nickname={userData.nickname} size="128" />
              </S.LeftSection>
              <S.Spacer></S.Spacer>
              <S.Spacer></S.Spacer>
              <S.RightSection>
                {/* 사용자 이름 */}
                <S.Description>
                  <S.Nickname>
                    <b>{userData.nickname || ""}</b>
                  </S.Nickname>
                </S.Description>
                <br />

                {/* 자기소개 문구 */}
                <S.Description>
                  <p>{userData.description || ""}</p>
                </S.Description>

                <S.DescriptionWrap>
                  <S.Description onClick={() => toggleFollowInfoMenu()}>
                    <FollowerModal
                      followInfoVisibility={followInfoVisibility}
                      memberId={memberId}
                    />
                  </S.Description>
                  <S.Spacer></S.Spacer>
                  <S.Description onClick={() => toggleFollowInfoMenu()}>
                    <FollowingModal
                      followInfoVisibility={followInfoVisibility}
                      memberId={memberId}
                    />
                  </S.Description>
                </S.DescriptionWrap>
                <br />

                {checkFollowData === 1 ? (
                  <Button
                    variant="outline-danger"
                    onClick={() => handleAddFollow(memberId!)}
                  >
                    언팔로우
                  </Button>
                ) : checkFollowData === 0 ? (
                  <Button
                    variant="outline-primary"
                    onClick={() => handleDeleteFollow(memberId!)}
                  >
                    팔로우
                  </Button>
                ) : (
                  <></>
                )}
              </S.RightSection>
          </S.CardBody>
        </S.Card>
      </S.Wrap>
    </>
  );
}

const S = {
  Wrap: styled.div``,

  Card: styled.div`
    width: 80vw;
    z-index: 1;
    border: none;
    padding: 0px;
  `,

  CardTopText: styled.div``,

  CardBody: styled.div`
    background: rgba(13, 13, 13);
    height: 240px;
    color: white;
    margin-top: 20px;
    border-radius: 20px;

    display: flex;
    padding-left: 80px;
    justify-content: start;

    flex-direction: row;
    align-items: center;
  `,

  LeftSection: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  RightSection: styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    margin-right: 80px;
  `,

  DarkOverlay: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  `,

  ProfileIconWrap: styled.div`
    display: flex;
    align-items: center;
    justify-conent: center;
  `,

  Description: styled.div`
    text-align: start;
    color: #d7d7d7;
  `,

  DescriptionWrap: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Nickname: styled.div`
    color: orange;
    font-size: 1.2rem;
  `,

  Spacer: styled.div`
    margin-left: 10px;
    margin-right: 10px;
  `,
};

export default ProfileInfo;
