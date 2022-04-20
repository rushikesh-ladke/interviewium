import styles from './styles.module.scss';
import Error from '../../images/missing.svg';

export const Missing = () => {
  return (<>

    <div className={styles.MainbPage}>
     <img src={Error} alt="Error Image" />
     <h1>Oops! <br /><span>URL Missing</span></h1>
    </div>

  </>);
};
