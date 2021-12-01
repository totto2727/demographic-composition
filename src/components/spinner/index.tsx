import styles from './index.module.css'

const Spinner: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return isLoading ? (
    <div className={styles['loader-wrap']}>
      <div className={styles.loader}>Loading...</div>
    </div>
  ) : (
    <></>
  )
}
export default Spinner
