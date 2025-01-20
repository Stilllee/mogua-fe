"use client";

import { type UserPageSection } from "@/types/user-page";

interface TabListProps {
  currentTab: UserPageSection;
  onChange: (tab: UserPageSection) => void;
  isInstructor?: boolean;
}

const TABS: { id: UserPageSection; label: string }[] = [
  { id: "myMeeting", label: "내 모임" },
  { id: "myReview", label: "내 리뷰" },
  { id: "createdMeeting", label: "만든 모임" },
];

const INSTRUCTOR_TAB = { id: "classReview" as const, label: "수강평" };

export default function TabList({
  currentTab,
  onChange,
  isInstructor = false,
}: TabListProps) {
  const tabs = isInstructor ? [...TABS, INSTRUCTOR_TAB] : TABS;

  return (
    <div
      className='my-6 flex w-full desktop:mb-8 desktop:mt-10 desktop:max-w-[343px]'
      role='tablist'
    >
      {tabs.map(({ id, label }) => {
        const activeStyle =
          currentTab === id
            ? "text-gray-100 border-b-2 border-gray-200"
            : "text-gray-500";
        return (
          <button
            className={`flex-1 text-nowrap px-4 py-3.5 text-body-2-normal font-semibold ${activeStyle}`}
            type='button'
            key={`${id}-tab`}
            role='tab'
            aria-selected={currentTab === id}
            aria-controls={`${id}-panel`}
            onClick={() => onChange(id)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
