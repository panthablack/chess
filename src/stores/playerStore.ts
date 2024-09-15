import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getNextFreeNumericalKey } from '@/utilities/objects'
import type { Player, PlayerID, PlayerOptions } from '@/types/Player'
import { usePiecesStore } from './piecesStore'
import type { GameMode } from '@/types/Game'
import { PIECE_COLOURS } from '@/config/constants/pieces'
import { is2PlayerGame } from '@/utilities/games'

export const usePlayerStore = defineStore('playerStore', () => {
  // store dependencies
  const piecesStore = usePiecesStore()

  const players: Record<PlayerID, Player> = reactive({})

  const getPlayerColour = (mode: GameMode, playerNumber: number) => {
    if (is2PlayerGame(mode) && playerNumber === 0) return PIECE_COLOURS.WHITE
    else if (is2PlayerGame(mode) && playerNumber === 1) return PIECE_COLOURS.BLACK
    else return PIECE_COLOURS.UNKNOWN
  }

  const makeNewPlayer = (options: PlayerOptions): PlayerID => {
    const player: Player = {
      ...options,
      // keep id last to prevent id being set manually
      id: getNextFreeNumericalKey(players),
    }
    players[player.id] = player
    return player.id
  }

  const generatePlayers = (mode: GameMode, numPlayers: number): PlayerID[] => {
    const players = []
    for (let i = 0; i < numPlayers; i++)
      players.push(
        makeNewPlayer({
          name: `Player ${i + 1}`,
          colour: getPlayerColour(mode, i),
          pieces: piecesStore.generateNewSetFromGameMode(mode, getPlayerColour(mode, i)),
        })
      )
    return players
  }

  return { players, generatePlayers, makeNewPlayer }
})
