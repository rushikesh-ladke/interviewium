import styles from './styles.module.scss';
import Error from '../../images/404.svg';

export const Unauthorized = () => {
  return (
    <>
      <div className={styles.MainbPage}>
        <img src={Error} alt='Error' />
        <h1>
          404! <br />
          <span>Page Not Found</span>
        </h1>
      </div>
    </>
  );
};
