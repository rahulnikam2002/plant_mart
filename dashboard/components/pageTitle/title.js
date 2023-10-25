import styles from '@/styles/pageTitle.module.css'
import { IconButton } from '../buttons/buttons';

const PageTitle = ({title})=>{
    return(
        <div className={styles.pageTitle}>
        <div className={styles.headerGrp}>
          <IconButton
            bgColor={"#f5f7f9"}
            padding={"0px 10px"}
            leftIcon={
              <i
                style={{ color: "#000" }}
                class="fi fi-rr-arrow-small-left"></i>
            }
            width={"fit-content"}
          />
          <div className={styles.textGrp}>
            <div className={styles.topTxt}>
              <p>Back to dashboard</p>
            </div>
            <div className={styles.bottomTxt}>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default PageTitle;