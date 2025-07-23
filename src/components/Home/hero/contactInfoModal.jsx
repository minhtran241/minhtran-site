'use client';

import Link from 'next/link';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { SOCIAL_MEDIA } from '@/common/constants/menu';

const ContactInfoModal = () => (
  <dialog id='contact_info_modal' className='modal'>
    <div className='modal-box max-w-md'>
      <form method='dialog'>
        <button className='btn btn-sm btn-circle btn-ghost hover:bg-base-200 absolute top-3 right-3 transition-colors'>
          <FontAwesomeIcon icon='fa-solid fa-times' />
        </button>
      </form>

      <div className='mb-6'>
        <h3 className='flex items-center gap-3 text-xl font-bold'>
          <FontAwesomeIcon icon='fa-solid fa-info-circle' />
          Contact Information
        </h3>
        <p className='text-base-content/60 mt-2 text-sm'>
          Get in touch through any of these channels
        </p>
      </div>

      <div className='space-y-4'>
        {SOCIAL_MEDIA.slice(1).map((item, index) => (
          <div
            key={index}
            className='bg-base-200/50 hover:bg-base-200 flex items-center gap-4 rounded-lg p-3 transition-colors'
          >
            <div className='text-primary text-lg'>{item.icon}</div>
            <div className='flex-1'>
              <p className='text-base-content/80 text-sm font-medium'>
                {item.name}
              </p>
              <Link
                href={item.href}
                target='_blank'
                className='link link-primary link-hover font-semibold'
              >
                {item.title}
              </Link>
            </div>
            <FontAwesomeIcon
              icon='fa-solid fa-external-link'
              className='text-base-content/40 text-xs'
            />
          </div>
        ))}
      </div>
    </div>
    <form method='dialog' className='modal-backdrop'>
      <button>close</button>
    </form>
  </dialog>
);

const ShowContactInfoButton = () => {
  const handleShowModal = () => {
    document.getElementById('contact_info_modal')?.showModal();
  };
  return (
    <button
      onClick={handleShowModal}
      className='link link-primary link-hover font-medium transition-colors'
    >
      More contact info
    </button>
  );
};

// export those components
export { ContactInfoModal, ShowContactInfoButton };
