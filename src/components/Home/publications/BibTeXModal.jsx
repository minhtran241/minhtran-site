'use client';

import { useState } from 'react';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const BibTeXModal = ({ bibtex, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        className='btn btn-outline btn-sm gap-2'
        onClick={() =>
          document.getElementById(`bibtex-modal-${title}`).showModal()
        }
      >
        <FontAwesomeIcon icon='fa-duotone fa-copy' />
        BibTeX
      </button>

      {/* Modal */}
      <dialog id={`bibtex-modal-${title}`} className='modal'>
        <div className='modal-box max-w-2xl'>
          {/* Header */}
          <div className='mb-4 flex items-start justify-between'>
            <div>
              <h3 className='text-base-content text-lg font-bold'>
                BibTeX Citation
              </h3>
              <p className='text-base-content/70 mt-1 text-sm'>{title}</p>
            </div>
            <button
              className='btn btn-circle btn-ghost btn-sm'
              onClick={() =>
                document.getElementById(`bibtex-modal-${title}`).close()
              }
            >
              <FontAwesomeIcon icon='fa-solid fa-xmark' className='text-lg' />
            </button>
          </div>

          {/* BibTeX Content */}
          <div className='relative'>
            <pre className='bg-base-200 text-base-content rounded-box overflow-x-auto p-4 text-sm'>
              <code className='whitespace-pre-wrap'>{bibtex}</code>
            </pre>

            {/* Copy Button */}
            <button
              className={`btn btn-sm absolute top-2 right-2 gap-2 ${
                copied ? 'btn-success' : 'btn-primary'
              }`}
              onClick={handleCopy}
            >
              <FontAwesomeIcon
                icon={copied ? 'fa-solid fa-check' : 'fa-solid fa-copy'}
              />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Footer */}
          <div className='modal-action'>
            <button
              className='btn btn-ghost'
              onClick={() =>
                document.getElementById(`bibtex-modal-${title}`).close()
              }
            >
              Close
            </button>
          </div>
        </div>

        {/* Backdrop */}
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default BibTeXModal;
