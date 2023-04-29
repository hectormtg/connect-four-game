import { useEffect, useCallback } from 'react'

const EVENT_NAME = 'keydown'

export function useEscapeKey(handleClose: () => void) {
    const handleEscKey = useCallback((e: KeyboardEvent) => {
        if (e.code.toLowerCase() === 'escape') {
            handleClose()
        }
    }, [handleClose])

    useEffect(() => {
        document.addEventListener(EVENT_NAME, handleEscKey, false)

        return () => {
            document.removeEventListener(EVENT_NAME, handleEscKey, false);
        }
    }, [handleEscKey])
}