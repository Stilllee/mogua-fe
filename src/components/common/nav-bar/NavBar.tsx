import NavMenuItem from "./NavMenuItem";
import BookmarkFillIcon from "@/assets/images/icons/bookmark_fill.svg";
import PlanetIcon from "@/assets/images/icons/planet.svg";
import UserIcon from "@/assets/images/icons/user.svg";

const NAV_ITEMS = [
  { href: "/", icon: <PlanetIcon />, label: "모임 찾기" },
  { href: "/wishlist", icon: <BookmarkFillIcon />, label: "북마크" },
  {
    href: `/user/${process.env.NEXT_PUBLIC_USER_ID}`, // TODO: 임시 로그인유저 ID 사용(스토어로 관리 예정)
    icon: <UserIcon />,
    label: "마이 페이지",
  },
];

export default function NavBar() {
  return (
    <nav className='fixed bottom-0 left-0 right-0 z-10 bg-normal px-6 py-[9px] tablet:px-20 desktop:hidden'>
      <ul className='flex w-full justify-between'>
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <NavMenuItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
