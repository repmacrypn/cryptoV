import s from './Button.module.scss'

interface ButtonProps {
    text: string;
    handleButtonClick: () => void;
}

export const Button = ({ handleButtonClick, text }: ButtonProps) => {
    return (
        <button
            className={s.button}
            onClick={handleButtonClick}
        >
            {text}
        </button>
    )
}