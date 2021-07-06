import s from './loader.module.css'

const Loader = (className = "") => {
    return (
        <div className={`${s.ldsEllipsis} ${className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default Loader;