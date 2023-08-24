import { useState } from 'react'
import s from './Control.module.scss'
import { CryptoCoin } from 'src/types/cryptocoin.interface'
import { Modal } from 'src/components/modal/Modal'
import { SubmitField } from 'src/components/submit field/SubmitField'

export const ControlWrapper = ({ asset }: { asset: CryptoCoin }) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <div data-th='Add Coin:'>
            <Control
                setIsActive={setIsActive}
            />
            <Modal
                isActive={isActive}
                setIsActive={setIsActive}
            >
                <SubmitField portfolioAsset={asset} />
            </Modal>
        </div>
    )
}

interface ControlProps {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Control = ({ setIsActive }: ControlProps) => {
    return (
        <div
            onClick={() => setIsActive(true)}
            className={s.control}>
            +
        </div>
    )
}