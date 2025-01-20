"use client";

import Link from "next/link";
import { useEffect } from "react";
import KakaoIcon from "@/assets/images/icons/kakao.svg";
import IconButton from "@/components/common/buttons/IconButton";
import SolidButton from "@/components/common/buttons/SolidButton";
import useCookie from "@/hooks/auths/useTokenState";

const SignInPage = () => {
  const token = useCookie("accessToken");

  useEffect(() => {
    if (token !== null) {
      console.log("Token:", token);
    }
  }, [token]);

  return (
    <div className='relative flex grow flex-col gap-[24px]'>
      <video
        className='absolute inset-0 h-[100vh] w-full object-cover pb-0'
        src='/videos/background.mp4'
        loop
        autoPlay
        muted
        preload='auto'
        playsInline
      />
      <div className='flex h-screen flex-col items-center justify-center'>
        <div className='relative z-10 flex h-full w-full flex-col items-center justify-end justify-center gap-[24px] p-4 tablet:justify-end tablet:p-20 desktop:w-[40%]'>
          <div className='flex w-full flex-col gap-[16px] p-6'>
            <div className='flex w-full flex-col gap-[10px]'>
              <IconButton className='mt-2 w-full gap-[12px]'>
                <KakaoIcon className='mr-[12px] size-6 text-yellow-400' />
                <Link
                  href='#'
                  className='text-body-2-normal font-medium text-gray-200'
                >
                  <p>카카오로 시작하기</p>
                </Link>
              </IconButton>
              <SolidButton className='mt-2 w-full gap-[12px]'>
                <Link
                  href='/sign-up'
                  className='text-body-2-normal font-medium text-gray-200'
                >
                  <p>이메일로 시작하기</p>
                </Link>
              </SolidButton>
            </div>

            <div className='flex flex-row items-center justify-center gap-[4px]'>
              <p className='select-none text-label-normal font-regular text-gray-400'>
                이미 계정이 있으신가요?
              </p>
              <Link
                href='/sign-in/basic'
                className='flex text-label-normal font-medium text-orange-200 underline'
              >
                로그인하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
