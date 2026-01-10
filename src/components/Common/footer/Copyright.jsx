'use client';

import { userBasicInfo } from '@/common/constants/userBasic';

const Copyright = () => {
  return (
    <p className='flex items-center'>
      © {new Date().getFullYear()} {userBasicInfo.fullName}
    </p>
  );
};

export default Copyright;
