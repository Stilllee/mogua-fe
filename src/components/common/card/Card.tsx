"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Content from "./Content";
import StatusBadge from "./StatusBadge";
import Bookmark from "@/assets/images/icons/bookmark.svg";
import BookmarkActive from "@/assets/images/icons/bookmark_active.svg";
import SolidButton from "@/components/common/buttons/SolidButton";
import useChangeWishlist from "@/hooks/useChangeWishlist";
import useUserStore from "@/store/auth/useUserStore";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type CardInfo } from "@/types/card";

export default function Card({ card }: CardInfo) {
  const { user } = useUserStore();
  const router = useRouter();
  const { userAllWishlist } = useUserWishlist();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { loggedInWishlist, nonLoggedInWishlist } = useChangeWishlist();
  const [isComplete, setIsComplete] = useState(true);

  const contentData = {
    title: card.title,
    location: card.location,
    participants: card.participants,
    recruitmentStartDate: card.recruitmentStartDate,
    recruitmentEndDate: card.recruitmentEndDate,
    meetingStartDate: card.meetingStartDate,
    meetingEndDate: card.meetingEndDate,
    thumbnail: card.thumbnail,
  };

  const handleClickWishlist = (e: React.MouseEvent) => {
    // 부모로 이벤트 전달 막기
    e.stopPropagation();

    // 이미 요청 중이라면 함수 종료
    if (!isComplete) return;

    // 로딩 상태로 전환
    setIsComplete(false);

    if (user != null) {
      // 로그인 상태 처리
      loggedInWishlist(card.meetupId, card.meetupStatus);
    } else {
      // 비로그인 상태 처리
      nonLoggedInWishlist(card.meetupId, card.meetupStatus, setWishlist);
    }

    setIsComplete(true);
  };

  const handleClickDetail = (type: string, id: number): void => {
    const lowerCase = type.toLowerCase();
    router.push(`/${lowerCase}/${id}`);
  };

  const handleClickReview = (e: React.MouseEvent, meetUpId: number) => {
    e.stopPropagation();

    alert(`${meetUpId} 리뷰 작성`);
  };

  useEffect(() => {
    if (user === null) {
      // user가 null일 경우, localStorage에서 wishlist를 가져와서 상태를 설정
      const myWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(myWishlist);
    } else {
      // user가 있을 경우, 전역 상태관리에 저장된 userWishlist 상태를 그대로 사용
      setWishlist(userAllWishlist);
    }
  }, [user, userAllWishlist]);

  return (
    <div
      className='flex cursor-pointer flex-col rounded-[16px] bg-gray-950 p-3'
      onClick={() => handleClickDetail(card.meetingType, card.meetupId)}
    >
      <div className='flex justify-between'>
        <div className='flex gap-1.5'>
          <StatusBadge
            badge={{
              meetupStatus: card.meetupStatus,
              recruitmentEndDate: card.recruitmentEndDate,
              confirm: card.minParticipants <= card.participants.length,
              isMypage: card.isMypage,
            }}
          />
        </div>

        {!card.isMypage && (
          <button onClick={(e) => handleClickWishlist(e)}>
            {card.meetupStatus === "RECRUITING" ? (
              user != null ? (
                userAllWishlist.includes(card.meetupId) ? (
                  <BookmarkActive className='size-6 text-orange-200' />
                ) : (
                  <Bookmark className='size-6' />
                )
              ) : wishlist.includes(card.meetupId) ? (
                <BookmarkActive className='size-6 text-orange-200' />
              ) : (
                <Bookmark className='size-6' />
              )
            ) : (
              <Bookmark className='size-6' />
            )}
          </button>
        )}
      </div>

      <Content content={contentData} />

      {/* 버튼 컴포넌트 머지 후 추가 작업필요 */}
      {card.isMypage && card.isReview && card.meetupStatus === "COMPLETED" && (
        <SolidButton
          className='mt-6'
          onClick={(e) => handleClickReview(e, card.meetupId as number)}
        >
          리뷰 작성
        </SolidButton>
      )}
    </div>
  );
}
