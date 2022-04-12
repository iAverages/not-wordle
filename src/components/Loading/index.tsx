import style from "./style.module.css";

// https://loading.io/css/

const Loading: React.FC = () => {
    return (
        <div className={style["lds-ellipsis"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loading;
