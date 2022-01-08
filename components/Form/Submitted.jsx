import Image from 'next/image';
import styles from './UserForm.module.css';
import tickAnimation from '../../public/gif/tick.webp';
export default function Submitted() {
  return (
    <section className='h-screen ${styles.subb} body-font'>
      <div className='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
        <Image
          className='lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded'
          alt='Submitted GIFs'
          src={tickAnimation}
        />
        <div className='text-center lg:w-2/3 w-full'>
          <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
            You created your account successfully!
          </h1>
        </div>
      </div>
    </section>
  );
}
