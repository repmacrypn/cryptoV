import s from './Modal.module.scss'

interface ModalProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

export const Modal = ({ isActive, setIsActive, children }: ModalProps) => {
    return (
        <div
            className={isActive ? `${s['modal']} ${s['active']}` : s.modal}
            onClick={() => setIsActive(false)}
        >
            <div
                className={isActive ? `${s['modalContent']} ${s['active']}` : s.modalContent}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}