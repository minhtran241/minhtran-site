import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';

const Loading = ({ fullPage = true }) => {
  return (
    <div
      className={`grid w-full place-items-center overflow-x-scroll lg:overflow-visible ${
        fullPage ? 'h-dvh' : 'p-6'
      }`}
    >
      <FontAwesomeIcon icon='fa-duotone fa-solid fa-spin fa-atom-simple fa-2x text-primary' />
    </div>
  );
};

export default Loading;
