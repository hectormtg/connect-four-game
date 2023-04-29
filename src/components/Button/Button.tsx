import { FC, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'filled' | 'icon'
}

const Button: FC<Props> = ({ children, variant, ...props }) => {

    const {className, ...rest} = props

    if (variant === 'icon') return (
        <button
            className={clsx(styles.icon, className)}
            {...rest}
        >
            {children}
        </button>
    )

    return (
        <button
            className={clsx(styles.filled, className)}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button