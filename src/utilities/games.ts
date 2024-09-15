import { GAME_MODES } from '@/config/constants/games'
import type { GameMode } from '@/types/Game'

export const twoPlayerGames = [GAME_MODES.CHESS, GAME_MODES.DRAUGHTS]

export const is2PlayerGame = (mode: GameMode): boolean => twoPlayerGames.includes(mode)
