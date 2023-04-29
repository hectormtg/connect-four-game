export enum Players {
    PLAYER_1 = 'player1',
    GUEST = 'guest',
}

export interface CellData {
    index: number
    isGuest: boolean
    isSelected: boolean
}

export type Columns = Record<string, Array<CellData>>

export type Score = Record<Players, number>